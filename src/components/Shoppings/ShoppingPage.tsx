"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchIcon, PlusIcon } from "lucide-react"
import ModalCreateShopping from "./Modal/ModalCreateShopping";
import ShoppingCard from "@/src/components/Shoppings/ShoppingCards";
import type { Shopping as ShoppingType } from "@/src/types/Shoppings/Shoppings";

export default function ShoppingPage() {

    const [searchInput, setSearchInput] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [shoppings, setShoppings] = useState<ShoppingType[]>([
        {
            id: 1,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
        {
            id: 2,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
        {
            id: 3,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
        {
            id: 4,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
                {
            id: 5,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
                {
            id: 6,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        },
                {
            id: 7,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        }
    ])

    const reloadShoppings = () => {

    }

    return (
        <>
            <ModalCreateShopping isOpen={modalIsOpen} onClose={()=> {setModalIsOpen(false)}}/>
            <div className="w-full py-3 px-4 mt-14 xl:mt-1 flex flex-col gap-5">
                <h1 className="w-full text-center text-4xl xl:text-left">Shoppings Cadastrados</h1>
                <div className="flex gap-1 justify-between">
                    <div className="flex items-center gap-3 bg-white rounded-[10px] w-[85%] xl:w-[70%] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                        <SearchIcon className="h-8 w-8 text-[#a9b1bf]" />
                        <input type="text" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Shoppings..." className="w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                    </div>
                    <button onClick={()=>{setModalIsOpen(!modalIsOpen)}}
                        className="w-[13%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                        <span className="hidden xl:block text-2xl">Cadastrar</span><PlusIcon />
                    </button>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {shoppings.length == 0 ?
                        (
                            <div className="flex w-80% flex-col item-center justify-center">
                                <h1 className="text-2xl">Nenhum shopping cadastrado!</h1>
                                <h2 className="text-2xl w-full text-center">:/</h2>
                            </div>
                        )
                        :
                        (
                            <>
                                {
                                    shoppings.map((s) => (
                                        <ShoppingCard shoppingObj={s} key={s.id} isHome={false} reloadCards={reloadShoppings} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}