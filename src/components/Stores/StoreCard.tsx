"use client"

import { useState } from "react";
import { Store } from "@/src/types/Stores/Stores";
import { capitalizeWords } from "@/src/lib/utils";
import Swal from "sweetalert2";
import { deleteStore } from "@/src/services/store.service";

export default function StoreCard(
    { storeObj, reloadCards, setIdToEdit, openEditModal }: 
    { storeObj: Store, reloadCards: () => void, setIdToEdit: (id: number) => void, openEditModal: (isOpen: boolean) => void }) 
{

    const handleEdit = (id: number) => {
        setIdToEdit(id);
        openEditModal(true);
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            icon: 'question', title: 'Confirmar exclusão de loja!', text: 'Tem certeza que deseja apagar a loja selecionada?',
            confirmButtonText: 'Sim', cancelButtonText: 'Não', showCancelButton: true,
            confirmButtonColor: 'red', showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const res = await deleteStore(id);
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
                    text: "Loja apagada com sucesso!",
                    icon: "success",
                    confirmButtonText: "Entendido!"
                }).then(() => {
                    reloadCards?.();
                });
            }
        });
    }

    return (
        <>
            <div className={`
                flex gap-4 flex-col border border-gray-200 p-4 rounded-[10px] bg-white  
                w-full xl:w-full transition-all duration-200 hover:border-gray-500 cursor-pointer
            `}>
                <span><h1 className="text-center text-2xl">{storeObj.name}</h1></span>
                <span><h1 className="text-gray-500">Classificação</h1><p>{capitalizeWords(storeObj.classification)}</p></span>
                <span><h1 className="text-gray-500">Segmento</h1><p>{capitalizeWords(storeObj.segment)}</p></span>
                <span><h1 className="text-gray-500">Atividade</h1><p>{storeObj.activity == null ? "-" : capitalizeWords(storeObj.activity)}</p></span>
                <div className="flex justify-around w-full">
                    <button onClick={() => handleEdit(storeObj.id)} className="bg-[#6DA7FF] w-[35%] p-2 text-[20px] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#448fff]">
                        Editar
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(storeObj.id) }} className="bg-[#FF6767] w-[35%] p-2 text-[20px] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#fd4848]">Excluir</button>
                </div>
            </div>
        </>
    )
}