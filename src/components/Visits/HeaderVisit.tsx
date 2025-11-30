"use client"

import { SearchIcon } from "lucide-react"
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Select from "react-select";
import VisitsCard from "./VisitsCard";
import type { VisitCard } from "@/src/types/Visits/Visits";
import Link from "next/link";

export default function HeaderVisit() {
    const [searchInput, setSearchInput] = useState<string>('');
    const shoppingNames = [
        {
            id: 1,
            name: "Via Shopping"
        },
        {
            id: 2,
            name: "BH Shopping"
        },
        {
            id: 3,
            name: "Diamond Mall"
        },
        {
            id: 4,
            name: "Pátio Savassi"
        },
        {
            id: 5,
            name: "Del Rey"
        },
        {
            id: 6,
            name: "Minas Shopping"
        },
        {
            id: 7,
            name: "Paragem"
        }
    ]
    const [visits, setVisits] = useState<VisitCard[]>([
        {
            id: 1,
            shopping_name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            date: '11/10/2025'
        },
        {
            id: 2,
            shopping_name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            date: '11/10/2025'
        },
        {
            id: 3,
            shopping_name: 'Via Shopping',
            description: 'Shopping da região do barreiro, com grande area de gastronomia, possui diversas lojas legais para um passeio em familia!',
            date: '11/10/2025'
        },
    ])

    const options = shoppingNames.map(item => ({
        value: item.id,
        label: item.name
    }));

    const handleFilter = (id: number) => {
        console.log(id);
    }

    return (
        <>
            <div className="w-full mt-16 py-3 px-4 flex flex-col gap-3">
                <div className="w-full flex flex-col gap-3">
                    <div className="flex justify-between w-full">
                        <h1 className="w-[80%] text-3xl flex items-center">Listagem de Visitas</h1>
                        <div className="w-[20%] xl:w-[20%] xl:hidden flex justify-center">
                            <button className=" p-2 w-[65%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                                <span className="hidden text-2xl">Adicionar Usuário</span><PlusIcon height={28} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col xl:justify-between xl:flex-row xl:w-full">
                        <div className="flex flex-col xl:flex-row xl:w-[70%] gap-4">
                            <div className="flex items-center gap-3 bg-white rounded-[10px] w-full xl:w-[60%] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                                <SearchIcon className="h-6 w-6 text-[#a9b1bf]" />
                                <input type="text" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Shoppings..." className="w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf] " />
                            </div>
                            <div className="rounded-[10px] w-full xl:w-[30%] flex">
                                <Select
                                    className="w-full text-2xl"
                                    styles={{
                                        container: (base) => ({ ...base, flex: 1 }),
                                        control: (base) => ({
                                            ...base,
                                            height: "100%",
                                            minHeight: "2.75rem",
                                            boxShadow: "none",
                                            borderRadius: "10px"
                                        })
                                    }}
                                    placeholder="Selecione um Shopping"
                                    options={options}
                                    onChange={(v) => handleFilter(v!.value)}
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="hidden w-full xl:w-[20%] xl:flex justify-center">
                            <button className=" p-2 w-[10%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                                <span className="xl:block text-2xl">Adicionar Visita</span><PlusIcon height={28} />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {visits.length == 0 ?
                            (
                                <div className="w-full flex item-center justify-center p-8">
                                    <h1 className="text-2xl">Nenhuma visita recente! :/</h1>
                                </div>
                            )
                            :
                            (
                                <>
                                    {
                                        visits.map((v) => (
                                            <VisitsCard visitObj={v} key={v.id} isHome={false}/>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}