'use client';

import { useState, useEffect } from "react";
import { ShoppingRequest } from "@/src/types/Shoppings/Shoppings";
import { formatCep, getById, getAddress } from "@/src/services/shopping.service";
import { toast } from "react-toastify";

export default function ShoppingDetails({ id }: { id: number }) {

    const [shopping, setShopping] = useState<ShoppingRequest>()
    const [address, setAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        try {
            setIsLoading(true);
            fetchData();
        }
        catch (err: any) {
            toast.error(err.message ?? 'Erro ao carregar detalhes do shopping!')
        }
    }, [])

    const fetchData = async () => {
        const shoppingData = await getById(Number(id) ?? 0);
        setShopping(shoppingData);
        setAddress(await getAddress(shoppingData.zip_code, shoppingData.zip_number, false))
        setIsLoading(false)
    }

    return (
        <div className="flex w-full flex-col gap-5 xl:flex-row xl:flex-wrap">
            {isLoading ?
                (
                    <>
                        <div className="flex flex-col w-full xl:w-[35%]">
                            <label className="text-[#7E7E7E] text-2xl">Nome:</label>
                            <h1 className="text-2xl skeleton h-8 rounded-[10px]">{' '}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[45%]">
                            <label className="text-[#7E7E7E] text-2xl">Endereço:</label>
                            <h1 className="text-2xl skeleton h-8 rounded-[10px]">{' '}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[15%]">
                            <label className="text-[#7E7E7E] text-2xl">CEP:</label>
                            <h1 className="text-2xl skeleton h-8 rounded-[10px]">{' '}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[60%]">
                            <label className="text-[#7E7E7E] text-2xl">Descrição:</label>
                            <h1 className="text-2xl skeleton h-16 rounded-[10px]">{' '}</h1>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className="flex flex-col w-full xl:w-[35%]">
                            <label className="text-[#7E7E7E] text-2xl">Nome:</label>
                            <h1 className="text-2xl" >{shopping?.name}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[45%]">
                            <label className="text-[#7E7E7E] text-2xl">Endereço:</label>
                            <h1 className="text-2xl" >{address}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[15%]">
                            <label className="text-[#7E7E7E] text-2xl">CEP:</label>
                            <h1 className="text-2xl" >{formatCep(shopping!.zip_code.toString())}</h1>
                        </div>
                        <div className="flex flex-col w-full xl:w-[60%]">
                            <label className="text-[#7E7E7E] text-2xl">Descrição:</label>
                            <h1 className="text-2xl" >{shopping?.observation}</h1>
                        </div>
                    </>
                )}
        </div>
    );
}