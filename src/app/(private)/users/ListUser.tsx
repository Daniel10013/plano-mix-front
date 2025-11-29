"use client"
import { useState } from "react"
import type { User } from "@/src/types/Users/Users";
import { PencilSquareIcon, EnvelopeIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function ListUser() {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: "Usuario da silva",
            email: "UsuarioDaSilva@gmail.com",
            type: "Comum"
        },
        {
            
            id: 2,
            name: "Usuario da silva",
            email: "UsuarioDaSilva@gmail.com",
            type: "Comum"
        },
        {
            
            id: 3,
            name: "Usuario da silva",
            email: "UsuarioDaSilva@gmail.com",
            type: "Comum"
        },
        {
            
            id: 4,
            name: "Usuario da silva",
            email: "UsuarioDaSilva@gmail.com",
            type: "Comum"
        },
        {   
            id: 5,
            name: "Usuario da silva",
            email: "UsuarioDaSilva@gmail.com",
            type: "Comum"
        },

    ]);

    const handleEdit = (id: number) => {
        console.log("oi " + id);
    }

    const handleEmail = (id: number) => {
        console.log("oi " + id);
    }
    
    const handleDelete = (id: number) => {
        console.log("oi " + id);
    }

    return (

        <>
            <div className="w-full p-3 justify-center hidden xl:flex">
                <div className="w-full xl:w-[80%]">
                    <hr className="text-[#D2D2D2] w-full " />
                    <div className="flex justify-around p-2 border-b border-[#D2D2D2]">
                        <h1 className="text-[26px] w-1/4 text-center ">Nome</h1>
                        <h1 className="text-[26px] w-1/4 text-center">E-mail</h1>
                        <h1 className="text-[26px] w-1/4 text-center">Tipo de Conta</h1>
                        <h1 className="text-[26px] w-1/4 text-center">Ações</h1>
                    </div>
                    {users.map(r => (
                        <div key={r.id} className="w-full flex justify-around p-3 border-b border-[#D2D2D2] text-gray-500">
                            <span className="w-1/4 text-center">{r.name}</span>
                            <span className="w-1/4 text-center">{r.email}</span>
                            <span className="w-1/4 text-center">{r.type}</span>
                            <div className="w-1/4 flex justify-center items-center gap-5">
                                <EnvelopeIcon onClick={()=>{handleEmail(r.id)}} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                                <PencilSquareIcon onClick={()=>{handleEdit(r.id)}} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                                <TrashIcon onClick={()=>{handleDelete(r.id)}} height={24} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="border w-full p-4 grid grid-cols-1 sm:grid-cols-2 xl:hidden gap-3">
                    {users.map(r => (
                        <div key={r.id} className="w-full border border-gray-400 flex flex-col p-2 rounded-[10px]">
                            <div className="w-full flex justify-end items-center border-gray-400 gap-2 text-gray-500">
                                <EnvelopeIcon onClick={()=>{handleEmail(r.id)}} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                                <PencilSquareIcon onClick={()=>{handleEdit(r.id)}} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                                <TrashIcon onClick={()=>{handleDelete(r.id)}} height={26} className="transition-all duration-200 hover:text-gray-900 cursor-pointer"/>
                            </div>
                            <span className="w-[90%]">Nome: <span className="text-gray-500">{r.name}</span></span>
                            <span className="w-[90%]">Email: <span className="text-gray-500">{r.email}</span></span>
                            <span className="w-[90%]">Tipo: <span className="text-gray-500">{r.type}</span></span>
                        </div>
                    ))}
            </div>
        </>
    )
}