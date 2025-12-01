'use client';

import { useState, useEffect } from "react";
import { Shopping } from "@/src/types/Shoppings/Shoppings";


export default function ShoppingDetails({ id }: { id: number }) {

    const [shopping, setShopping] = useState<Shopping>()

    useEffect(() => {
        const ShoppingDetails = {
            id: 1,
            name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            address: 'Av. Afonso Vaz de Melo, 640 - Barreiro, Belo Horizonte - MG',
            cep: '30640-070'
        }
        setShopping(ShoppingDetails)
    }, [])

    return (
        <div className="flex w-full flex-col gap-5 xl:flex-row xl:flex-wrap">
            <div className="flex flex-col w-full xl:w-[35%]">
                <label className="text-[#7E7E7E] text-2xl">Nome:</label>
                <h1 className="text-2xl" >{shopping?.name}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-[45%]">
                <label className="text-[#7E7E7E] text-2xl">Endereço:</label>
                <h1 className="text-2xl" >{shopping?.address}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-[15%]">
                <label className="text-[#7E7E7E] text-2xl">CEP:</label>
                <h1 className="text-2xl" >{shopping?.cep}</h1>
            </div>
            <div className="flex flex-col w-full xl:w-[60%]">
                <label className="text-[#7E7E7E] text-2xl">Descrição:</label>
                <h1 className="text-2xl" >{shopping?.description}</h1>
            </div>
        </div>
    );
}