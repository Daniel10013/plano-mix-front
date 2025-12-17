'use client';

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { debounce, formatDate } from "@/src/lib/utils";
import type { Visit } from "@/src/types/Visits/Visits";
import VisitDetailsModal from "./Modal/ModalVisitDetails";
import CompareVisitModal from "./Modal/ModalCompareVisitShopping";
import { getVisitsByShopping } from "@/src/services/visits.service";
import { UserIcon, CalendarIcon, ExclamationCircleIcon, EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";


export default function ShoppingVisits({ id }: { id: number }) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchInput, setSearchInput] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState<boolean>(false);

    const [shoppingVisits, setShoppingVisits] = useState<Visit[]>([]);
    const [fullShoppingVisits, setFullShoppingVisits] = useState<Visit[]>([]);
    
    const [idDetails, setIdDetails] = useState<number>(0);
    const [selectedVisits, setSelectedVisits] = useState<number[]>([]);

    const toggleSelectVisit = (id: number) => {
        setSelectedVisits(prev => {
            if (prev.includes(id)) return prev.filter(v => v !== id);
            if (prev.length < 2) return [...prev, id];
            return prev;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVisitsByShopping(id);
                setFullShoppingVisits(data.data);
                setShoppingVisits(data.data);
            }
            catch (err: any) {
                toast.error(err.message ?? 'Erro ao carregar as visitas do shopping!');
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const filterVisits = (value: string): Visit[] => {
        const normalized = value.trim().toLowerCase();
        if (normalized === '') {
            return fullShoppingVisits;
        }

        return fullShoppingVisits.filter(v => {
            const matchUser = v.username.toLowerCase().includes(normalized);
            const matchObs =
                (v.observation ?? '').toLowerCase().includes(normalized);
            const matchDate =
                formatDate(v.date).toLowerCase().includes(normalized);
            return matchUser || matchObs || matchDate;
        });
    };

    const debouncedFilter = debounce((value: string) => {
        const filtered = filterVisits(value);
        setShoppingVisits(filtered);
        setIsLoading(false);
    }, 500);

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setIsLoading(true);
        debouncedFilter(value);
    };

    const getDetailsVisit = (id: number) => {
        setIdDetails(id);
        setModalDetailsIsOpen(true);
    }

    return (
        <>
            <CompareVisitModal id1={selectedVisits[0]} id2={selectedVisits[1]} isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false) }} />
            <VisitDetailsModal id={idDetails} isOpen={modalDetailsIsOpen} onClose={() => { setModalDetailsIsOpen(false) }} />
            <div className="flex flex-col gap-4 xl:gap-2">
                <div className="flex flex-col xl:flex-row gap-2">
                    <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                        <MagnifyingGlassIcon className="h-9 w-9 text-[#a9b1bf]" />
                        <input type="text" value={searchInput} onChange={(e) => handleSearch(e.target.value)} placeholder="Pesquisar Visita por usuário ou data..."
                            className=" w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                    </div>
                    <button
                        onClick={() => setModalIsOpen(true)}
                        disabled={isLoading || shoppingVisits.length < 2 || selectedVisits.length != 2}
                        className={`
                        w-full xl:w-[30%] text-2xl p-2 xl:p-0 xl:text-[20px] rounded-[10px]
                        transition-all duration-200
                        ${isLoading || shoppingVisits.length < 2 || selectedVisits.length != 2
                            ? 'bg-[#c6ecd0] text-gray-400 cursor-not-allowed'
                            : 'bg-[#6FD98B] hover:bg-[#35c95d] cursor-pointer'}
                    `}
                    >
                        Comparar Visitas
                    </button>
                </div>
                <div className="flex flex-col w-full xl:flex-row max-h-[800px] overflow-x-auto">
                    {isLoading ?
                        (
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className={`w-full rounded-[10px] border border-transparent p-3 skeleton h-[116px]`}>

                                    </div>
                                ))}
                            </div>
                        )
                        :
                        (
                            <>
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
                                                        const isSelected = selectedVisits.includes(s.id);
                                                        return (
                                                            <div key={s.id} onClick={() => {toggleSelectVisit(s.id)} }
                                                                className={`
                                                        w-full rounded-[10px] border p-3 transition-all duration-200 hover:border-[#8173FF]
                                                        cursor-pointer
                                                        
                                                         ${isSelected ? 'border-[#8173FF] bg-[#f5f9ff]' : 'border-gray-300 hover:border-[#8173FF]'}
                                                    `}
                                                            >
                                                                <div className="flex gap-1">
                                                                    <div className="w-[30%] flex gap-1 text-gray-500">
                                                                        <UserIcon height={24} />
                                                                        <span className="text-[20px] h-full">Usuário:</span>
                                                                    </div>
                                                                    <h1 className="w-[60%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        {s.username}
                                                                    </h1>
                                                                    <div className="w-[10%] text-[20px] flex items-center justify-center">
                                                                        <EyeIcon onClick={(e) => { e.stopPropagation(); getDetailsVisit(s.id) }} 
                                                                        height={24} className="cursor-pointer transition-all duration-200 text-gray-400 hover:text-gray-500" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex">
                                                                    <div className="w-[30%] flex gap-1 text-gray-500">
                                                                        <CalendarIcon height={24} />
                                                                        <span className="text-[20px]" >Data:</span>
                                                                    </div>
                                                                    <h1 className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        {formatDate(s.date)}
                                                                    </h1>
                                                                </div>
                                                                <div className="flex">
                                                                    <div className="w-[30%] flex gap-1 text-gray-500">
                                                                        <ExclamationCircleIcon height={24} />
                                                                        <span className="text-[20px]" >Obs:</span>
                                                                    </div>
                                                                    <p title={s.observation} className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                                        {s.observation}
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
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}