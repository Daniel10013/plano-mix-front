'use client';

import { useState, useEffect } from "react";
import type { Visit } from "@/src/types/Visits/Visits";
import CompareVisitModal from "@/src/components/Shoppings/Modal/ModalCompareVisitShopping";
import { UserIcon, CalendarIcon, ExclamationCircleIcon, EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";


export default function ShoppingVisits({ id }: { id: number }) {

    const [searchInput, setSearchInput] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [shoppingVisits, setShoppingVisits] = useState<Visit[]>([
        {
            id: 1,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
        {
            id: 2,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
        {
            id: 3,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
        {
            id: 4,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
        {
            id: 5,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
        {
            id: 6,
            shopping_name: 'Via Shopping',
            description: 'Visita feita de forma rapida olhando superficialmente as lojas de forma rapida',
            user: 'Daniel',
            date: '11/09/2025'
        },
    ]);

    const [selectedId, setSelectedId] = useState<number>(0);
    const [selected2Id, setSelected2Id] = useState<number>(0);



    return (
        <>
            <CompareVisitModal id1={selectedId} id2={selected2Id} isOpen={modalIsOpen} onClose={()=>{setModalIsOpen(false)}}/>
            <div className="flex flex-col gap-4 xl:gap-2">
                <div className="flex flex-col xl:flex-row gap-2">
                    <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                        <MagnifyingGlassIcon className="h-9 w-9 text-[#a9b1bf]" />
                        <input type="password" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Visita por usuário ou data..."
                            className=" w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                    </div>
                    <button onClick={()=>{setModalIsOpen(true)}}
                    className="bg-[#6FD98B] w-full xl:w-[30%] text-2xl p-2 xl:p-0 xl:text-[20px] rounded-[10px] transition-all duration-200 hover:bg-[#35c95d] cursor-pointer">
                        Comparar Visitas
                    </button>
                </div>
                <div className="flex flex-col w-full xl:flex-row max-h-[800px] overflow-x-auto">
                    {shoppingVisits.length == 0 ?
                        (
                            <div className="w-full h-full grid place-items-center">
                                <div className="p-4 border border-gray-300 rounded-[10px] w-full max-w-[400px]">
                                    <h1 className="text-2xl text-center">Nenhuma visita cadastrada!</h1>
                                    <h2 className="text-2xl text-center">:/</h2>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {
                                    shoppingVisits.map(
                                        (s) => {
                                            return (
                                                <div key={s.id}
                                                    className={`
                                                        w-full rounded-[10px] border border-gray-300 p-3 transition-all duration-200 hover:border-[#8173FF]
                                                        cursor-pointer
                                                    `}
                                                >
                                                    <div className="flex gap-1">
                                                        <div className="w-[30%] flex gap-1 text-gray-500">
                                                            <UserIcon height={24} />
                                                            <span className="text-[20px] h-full">Usuário:</span>
                                                        </div>
                                                        <h1 className="w-[60%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {s.user}
                                                        </h1>
                                                        <div className="w-[10%] text-[20px] flex items-center justify-center">
                                                            <EyeIcon height={24} className="cursor-pointer transition-all duration-200 text-gray-400 hover:text-gray-500" />
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-[30%] flex gap-1 text-gray-500">
                                                            <CalendarIcon height={24} />
                                                            <span className="text-[20px]" >Data:</span>
                                                        </div>
                                                        <h1 className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {s.date}
                                                        </h1>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-[30%] flex gap-1 text-gray-500">
                                                            <ExclamationCircleIcon height={24} />
                                                            <span className="text-[20px]" >Obs:</span>
                                                        </div>
                                                        <p title={s.description} className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {s.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}