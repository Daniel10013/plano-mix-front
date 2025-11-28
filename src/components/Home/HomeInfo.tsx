'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HomeStats } from "@/src/types/Home/Home";
import { BuildingOfficeIcon, BuildingStorefrontIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function HomeInfo() {

    const [username, setUsername] = useState<string>('Daniel');
    const [statistics, setStatistics] = useState<HomeStats>({
        shoppings: 10,
        stores: 10,
        shopping_stores: 10,
        visits: 10
    })

    return (
        <div className="py-3 px-4 w-full flex flex-col gap-4 mt-14 xl:mt-1 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-[25%]">
                <div className="mb-3">
                    <h1 className="text-[30px] xl:text-4xl w-full">Bem vindo! <span className="text-[#8173FF]" >{username}</span></h1>
                    <h2 className="text-[26px] w-full text-gray-500">Oque deseja fazer a seguir?</h2>
                </div>
                <Link href={'/shoppings'}
                    className="flex gap-2 w-full border items-center border-[#8173FF] rounded-[10px] px-2 py-2 transition-all duration-200 hover:text-white hover:bg-[#8173FF]">
                    <BuildingOfficeIcon width={29} />
                    <span className="text-[22px] mt-px" >Cadastrar um novo shopping</span>
                </Link>
                <Link href={'/stores'}
                    className="flex gap-2 w-full border items-center border-[#8173FF] rounded-[10px] px-2 py-2 transition-all duration-200 hover:text-white hover:bg-[#8173FF]">
                    <BuildingStorefrontIcon width={29} />
                    <span className="text-[22px] mt-px" >Cadastrar uma nova loja</span>
                </Link>
                <Link href={'/visits'}
                    className="flex gap-2 w-full border items-center border-[#8173FF] rounded-[10px] px-2 py-2 transition-all duration-200 hover:text-white hover:bg-[#8173FF]">
                    <MapPinIcon width={29} />
                    <span className="text-[22px] mt-px" >Realizar uma nova visita</span>
                </Link>
            </div>
            <div className="flex flex-col mt-5 gap-5 xl:w-[50%] xl:justify-center xl:mt-9">
                <h1 className="text-[26px] w-full text-center text-gray-500">Estatísticas</h1>
                <div className="w-full flex flex-col xl:flex-row gap-10 xl:gap-6">
                    <div className="flex items-center flex-col gap-2 w-full xl:w-1/4">
                        <h2 className="text-[22px] w-1/2 xl:w-full text-center">Número de Shoppings:</h2>
                        <div className="w-[35%] xl:w-[70%] rounded-2xl h-[100px] text-4xl bg-[#8173FF] text-white flex items-center justify-center">
                            {statistics.shoppings}
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-2 w-full xl:w-1/4">
                        <h2 className="text-[22px] w-1/2 xl:w-[60%]  text-center">Número de Lojas:</h2>
                        <div className="w-[35%] xl:w-[70%] rounded-2xl h-[100px] text-4xl bg-[#8173FF] text-white flex items-center justify-center">
                            {statistics.stores}
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-2 w-full xl:w-1/4">
                        <h2 className="text-[22px] w-1/2 xl:w-full  text-center">Total Lojas Shoppings:</h2>
                        <div className="w-[35%] xl:w-[70%] rounded-2xl h-[100px] text-4xl bg-[#8173FF] text-white flex items-center justify-center">
                            {statistics.shopping_stores}
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-2 w-full xl:w-1/4">
                        <h2 className="text-[22px] w-1/2 xl:w-[60%] text-center">Visitas Recentes:</h2>
                        <div className="w-[35%] xl:w-[70%] rounded-2xl h-[100px] text-4xl bg-[#8173FF] text-white flex items-center justify-center">
                            {statistics.shoppings}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden xl:flex xl:w-[25%] items-center justify-center">
                <Image 
                    src='/home/home-image.svg' 
                    alt="Imagem home" 
                    width={400} height={400} />
            </div>
        </div>
    )
}