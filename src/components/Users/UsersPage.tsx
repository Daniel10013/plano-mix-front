"use client"
import { useState, useEffect } from "react"
import { PlusIcon } from "lucide-react"
import type { User } from "@/src/types/Users/Users";
import ModalCreateUser from "./Modal/ModalCreateUser";
import ModalEditUser from "./Modal/ModalEditUser";
import { PencilSquareIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline"
import { getAllUsers, deleteUser, sendResetEmail } from "@/src/services/user.service";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
    const [editId, setEditiId] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true);
            const userData = await getAllUsers();
            setUsers(userData);
        } catch (error: any) {
            toast.error("Erro ao listar os usuários");
        }
        finally {
            setLoading(false);
        }
    }
    const handleEdit = (id: number) => {
        setEditIsOpen(true);
        setEditiId(id);
    }

    const handleEmail = (email: string) => {
        if (email == '') {
            toast.error('O email não pode ser vazio!');
            return;
        }

        Swal.fire({
            icon: 'question', title: 'Confirmar ação!',
            text: "Deseja enviar email de troca de senha?", confirmButtonColor: '#8173ff',
            confirmButtonText: "Sim", cancelButtonText: "Não", showLoaderOnConfirm: true, showCancelButton: true,
            preConfirm: async () => {
                try {
                    const response = await sendResetEmail(email);
                    if (response.status == false) {
                        throw new Error(response.message ?? "Não foi possivel enviar o email");
                    }
                    return response;
                } catch (err: any) {
                    return Swal.showValidationMessage(
                        err.message ?? "Erro ao enviar email!"
                    )
                }
            }, allowOutsideClick: () => !Swal.isLoading()
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success", title: "Sucesso!", text: "E-mail enviado com sucesso!", confirmButtonText: "Entendido!"
                    })
                }
            })
    }

    const handleDelete = async (id: number, name: string) => {
        Swal.fire({
            title: "Atenção!",
            html: `Deseja apagar o usuário: ${name}?<br>Todos os dados ligados a ele <b>serão perdidos!</b>`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
            confirmButtonColor: "#de463e",
            showLoaderOnConfirm: true,

            preConfirm: async () => {
                try {
                    const res = await deleteUser(id);

                    if (!res.status) {
                        throw new Error(res.message || "Não foi possível apagar.");
                    }

                    return res;
                } catch (err: any) {
                    return Swal.showValidationMessage(
                        err.message ?? "Erro inesperado ao apagar."
                    );
                }
            },

            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Usuário apagado com sucesso!",
                    icon: "success",
                    confirmButtonText: "Entendido!"
                }).then(() => {
                    fetchData?.();
                });
            }
        });
    };

    return (
        <>
            <ModalCreateUser isOpen={isOpen} onClose={() => { setIsOpen(false) }} reloadUsers={() => { fetchData() }} />
            <ModalEditUser isOpen={editIsOpen} onClose={() => { setEditIsOpen(false) }} reloadUsers={() => { fetchData() }} editId={editId} />
            <div className="w-full p-4 ">
                <div className="flex justify-between">
                    <h1 className="text-3xl flex items-center">Listagem de Usuários</h1>
                    <button onClick={() => { setIsOpen(true) }}
                        className=" p-2 w-[13%] xl:w-[21%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                        <span className="hidden xl:block text-2xl">Adicionar Usuário</span><PlusIcon />
                    </button>
                </div>
            </div>
            <div className="w-full p-3 justify-center hidden xl:flex">
                <div className="w-full xl:w-[80%]">
                    <hr className="text-[#D2D2D2] w-full " />
                    <div className="flex justify-around p-2 border-b border-[#D2D2D2]">
                        <h1 className="text-[26px] w-1/4 text-center ">Nome</h1>
                        <h1 className="text-[26px] w-1/4 text-center">E-mail</h1>
                        <h1 className="text-[26px] w-1/4 text-center">Tipo de Conta</h1>
                        <h1 className="text-[26px] w-1/4 text-center">Ações</h1>
                    </div>
                    {isLoading == true ?
                        (
                            <>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="w-full flex justify-around p-3 text-gray-500 skeleton h-12 mb-px">
                                        <span className="w-1/4 text-center"></span>
                                        <span className="w-1/4 text-center"></span>
                                        <span className="w-1/4 text-center"></span>
                                        <div className="w-1/4 flex justify-center items-center gap-5">

                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                        :
                        (
                            <>
                                {users.map(r => (
                                    <div key={r.id} className="w-full flex justify-around p-3 border-b border-[#D2D2D2] text-gray-500">
                                        <span className="w-1/4 text-center">{r.name}</span>
                                        <span className="w-1/4 text-center">{r.email}</span>
                                        <span className="w-1/4 text-center">{r.type == "admin" ? "Administrador" : "Comum"}</span>
                                        <div className="w-1/4 flex justify-center items-center gap-5">
                                            <EnvelopeIcon onClick={() => { handleEmail(r.email) }} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                            <PencilSquareIcon onClick={() => { handleEdit(r.id) }} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                            <TrashIcon onClick={() => { handleDelete(r.id, r.name) }} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                    }
                </div>
            </div>
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:hidden gap-3">
                {isLoading == true ?
                    (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="w-full flex flex-col p-2 rounded-[10px] skeleton">
                                    <div className="w-full flex justify-end items-center gap-2 text-gray-500 h-25">
                                    </div>
                                    <span className="w-[90%]"><span className="text-gray-500"></span> </span>
                                    <span className="w-[90%]"> <span className="text-gray-500"></span></span>
                                    <span className="w-[90%]"><span className="text-gray-500"></span></span>
                                </div>
                            ))}
                        </>
                    )
                    :
                    (
                        <>
                            {users.map(r => (
                                <div key={r.id} className="w-full border border-gray-400 flex flex-col p-2 rounded-[10px]">
                                    <div className="w-full flex justify-end items-center border-gray-400 gap-2 text-gray-500">
                                        <EnvelopeIcon onClick={() => { handleEmail(r.email) }} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                        <PencilSquareIcon onClick={() => { handleEdit(r.id) }} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                        <TrashIcon onClick={() => { handleDelete(r.id, r.name) }} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer" />
                                    </div>
                                    <span className="w-[90%]">Nome: <span className="text-gray-500">{r.name}</span></span>
                                    <span className="w-[90%]">Email: <span className="text-gray-500">{r.email}</span></span>
                                    <span className="w-[90%]">Tipo: <span className="text-gray-500">{r.type}</span></span>
                                </div>
                            ))}
                        </>
                    )
                }
            </div>
        </>
    )
}