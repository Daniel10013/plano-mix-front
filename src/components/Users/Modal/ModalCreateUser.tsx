'use client';

import Select from "react-select";
import Modal from "../../Layout/Modal/Modal";
import { useState } from "react";
import { UserCreate } from "@/src/types/Users/Users";
import { createUser } from "@/src/services/user.service";
import { toast } from 'react-toastify';
import z from "zod";

type UserType = {
    label: string,
    value: "admin" | "default"
}

export default function ModalCreateUser({ isOpen, onClose, reloadUsers }: { isOpen: boolean, onClose: () => void, reloadUsers: () => void }) {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [typeUser, setTypeUser] = useState<"admin" | "default">("default");
    const [nameUser, setNameUser] = useState<string>("");
    const [emailUser, setEmailUser] = useState<string>("");
    const [passUser, setPassUser] = useState<string>("");

    const validations = z.object({
        nameUser: z.string().min(3, "Insira um nome válido"),
        emailUser: z.string().email("Insira um Email válido"),
        passUser: z.string().min(8, "Insira uma senha com mais de 8 caracteres"),
        typeUser: z.enum(["default", "admin"], "Tipo de conta inexistente")
    })

    const handleUser = async () => {
        const result = validations.safeParse({ nameUser, emailUser, passUser, typeUser })

        if (!result.success) {
            setErrorMessage(result.error?.issues[0].message);
            return;
        }

        try {
            setIsLoading(true);
            const result = await createUser({
                name: nameUser,
                email: emailUser,
                password: passUser,
                type: typeUser
            });

            if (result.status == true) {
                toast.success(result.message);
                onClose();
                reloadUsers();
                cleanForm();
                return;
            }

            setErrorMessage(result.message);
        } catch (err: any) {
            setErrorMessage(err.mesage ?? 'Erro ao cadastrar usuário!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const cleanForm = () => {
        setErrorMessage('');
        setIsLoading(false);
        setNameUser('');
        setEmailUser('');
        setPassUser('');
        setTypeUser('default');
    }

    return (
        <Modal title="Cadastrar Usuário" width={35} widthMobile={95} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full gap-3">
                <div>
                    <label className="text-[#535353] text-[20px]">Tipo de conta:</label>
                    <Select<UserType>
                        onChange={(e) => setTypeUser(e!.value)}
                        className="w-full text-2xl"
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Selecione o tipo de conta"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={[
                            { label: 'Comum', value: 'default' },
                            { label: 'Administrador', value: 'admin' },
                        ]}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Nome:</label>
                    <input onChange={(e) => setNameUser(e.target.value)} type="text" placeholder="Nome da Silva"
                        className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">E-mail:</label>
                    <input onChange={(e) => setEmailUser(e.target.value)} type="text" placeholder="email@email.com"
                        className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Senha:</label>
                    <input onChange={(e) => setPassUser(e.target.value)} type="password" placeholder="Digite uma senha forte"
                        className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <div className="w-full h-10">
                    <h1 className="text-2xl text-red-500 text-center w-full">{errorMessage}</h1>
                </div>
                <button onClick={() => handleUser()} disabled={isLoading} className="w-full bg-[#8173FF] p-2 text-[22px] transition-all duration-200 
                cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                        {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-[33px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Cadastrar Usuário"
                            )}
                </button>
            </div>
        </Modal>
    );
}