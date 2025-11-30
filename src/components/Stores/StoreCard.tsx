"use client"

import { Store } from "@/src/types/Stores/Store";
import { useState } from "react";

export default function StoreCard ({storeObj}: {storeObj: Store}) {
    const handleEdit = (id: number) => {
        console.log(id);
    }
    const handleDelete = (id: number) => {
        console.log(id);
    }

    return (
        <>
            <div className={`
                flex gap-4 flex-col border border-gray-200 p-4 rounded-[10px] bg-white  
                w-full xl:w-full transition-all duration-200 hover:border-gray-500
            `}>
                <span><h1 className="text-center text-2xl">{storeObj.name}</h1></span>
                <span><h1 className="text-gray-500">Classificação</h1><p>{storeObj.classification}</p></span>
                <span><h1 className="text-gray-500">Segmento</h1><p>{storeObj.segment}</p></span>
                <span><h1 className="text-gray-500">Atividade</h1><p>{storeObj.activity == null ? "--" : storeObj.activity }</p></span>
                <div className="flex justify-around w-full">
                    <button onClick={()=>handleEdit(storeObj.id)} className="bg-[#6DA7FF] w-[35%] p-2 text-[20px] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#448fff]">
                        Editar</button>
                    <button onClick={()=>handleDelete(storeObj.id)}className="bg-[#FF6767] w-[35%] p-2 text-[20px] rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-[#fd4848]">Excluir</button>
                </div>
            </div>
        </>
    )
}