"use client"

import Link from "next/link";
import Select from "react-select";
import VisitsCard from "./VisitsCard";
import { toast } from "react-toastify";
import { SearchIcon } from "lucide-react"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { debounce, formatDate } from "@/src/lib/utils";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { Visit } from "@/src/types/Visits/Visits";
import { ShoppingFilter } from "@/src/types/Shoppings/Shoppings";
import { getRecentVisits } from "@/src/services/visits.service";
import { getShoppingFilter } from "@/src/services/shopping.service";
import VisitDetailsModal from "../Shoppings/Modal/ModalVisitDetails";

export default function VisitPage() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // loading
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [filterLoading, setFilterLoading] = useState(false);

    //Filtro
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedShopping, setSelectedShopping] = useState<number>(0);

    // Dados da pagina
    const [shoppingsOptions, setShoppingsOptions] = useState<ShoppingFilter[]>([]);
    const [visits, setVisits] = useState<Visit[]>([])
    const [filteredVisits, setFilteredVisits] = useState<Visit[]>([]);

    //Modal Detalhes Da visita
    const [idDetails, setIdDetails] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        setFilterLoading(true);
        applyFilterDebounced();

        return () => {
            applyFilterDebounced.cancel?.();
        };
    }, [searchInput, selectedShopping]);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const visitsData = await getRecentVisits();
            const shoppingData = await getShoppingFilter();

            setVisits(visitsData);
            setFilteredVisits(visitsData);
            setShoppingsOptions(shoppingData);
        } catch (err: any) {
            toast.error(err.message ?? "Erro ao carregar visitas");
        } finally {
            setIsLoading(false);
            if(id){
                setIdDetails(Number(id));
                setIsOpen(true);
            }
        }
    };

    const filterVisits = (
        value: string,
        shoppingId: number
    ): Visit[] => {
        const normalized = value.trim().toLowerCase();

        return visits.filter(v => {
            const matchText =
                normalized === ''
                    ? true
                    : (
                        v.username.toLowerCase().includes(normalized) ||
                        v.observation.toLowerCase().includes(normalized) ||
                        v.shopping_name.toLowerCase().includes(normalized) ||
                        formatDate(v.date).includes(normalized)
                    );

            const matchShopping =
                shoppingId === 0 || v.shopping_id === shoppingId;

            return matchText && matchShopping;
        });
    };

    const applyFilterDebounced = debounce(() => {
        const result = filterVisits(searchInput, selectedShopping);
        console.log(result);
        setFilteredVisits(result);
        setFilterLoading(false);
    }, 500);

    const openDetails = (id: number): void => {
        setIdDetails(id);
        setIsOpen(true);
    }

    return (
        <>
            <VisitDetailsModal id={idDetails} isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
            <div className="w-full mt-16 py-3 px-4 flex flex-col gap-3">
                <div className="w-full flex flex-col gap-3">
                    <div className="flex justify-between w-full">
                        <h1 className="w-[80%] text-3xl flex items-center">Listagem de Visitas</h1>
                        <div className="w-[20%] xl:w-[20%] xl:hidden flex justify-center">
                            <button className=" p-2 w-[65%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                                <PlusIcon height={28} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col xl:justify-between xl:flex-row xl:w-full">
                        <div className="flex flex-col xl:flex-row xl:w-[70%] gap-4">
                            <div className="flex items-center gap-3 bg-white rounded-[10px] w-full xl:w-[60%] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                                <SearchIcon className="h-6 w-6 text-[#a9b1bf]" />
                                <input type="text" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar por Observação, Usuário, Data..." className="w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf] " />
                            </div>
                            <div className="rounded-[10px] w-full xl:w-[35%] flex">
                                <Select
                                    className="w-full text-2xl"
                                    styles={{
                                        container: (base) => ({ ...base, flex: 1 }),
                                        control: (base, state) => ({
                                            ...base,
                                            height: "100%",
                                            cursor: "pointer",
                                            minHeight: "2.75rem",
                                            boxShadow: "none",
                                            borderRadius: "10px",
                                            borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                            "&:hover": {
                                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                            },
                                        }),
                                    }}
                                    value={
                                        selectedShopping === 0
                                            ? null
                                            : shoppingsOptions.find(o => o.value === selectedShopping) ?? null
                                    }
                                    noOptionsMessage={() => "Nenhum item encontrado!"}
                                    placeholder="Selecione um Shopping"
                                    options={shoppingsOptions}
                                    isDisabled={isLoading}
                                    onChange={(v) => setSelectedShopping(v ? v.value : 0)}
                                    isClearable
                                    isSearchable
                                />
                            </div>
                        </div>
                        <div className="hidden w-full xl:w-[20%] xl:flex justify-center">
                            <Link href={'/create-visit'} className=" p-2 w-[10%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                                <span className="xl:block text-2xl">Adicionar Visita</span><PlusIcon height={28} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={(!isLoading || !filterLoading) && filteredVisits.length == 0 ? 'w-full flex items-center justify-center' : 'w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'}>
                        {isLoading  || filterLoading ?
                            (
                                <>
                                    {
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="skeleton w-full h-[220px] rounded-xl"
                                            ></div>
                                        ))
                                    }

                                </>
                            )
                            :
                            (
                                <>
                                    {filteredVisits.length == 0 ?
                                        (
                                            <>
                                                <div className="w-[40%] flex item-center justify-center p-8 border border-gray-300 rounded-[10px]">
                                                    <h1 className="text-2xl">Nenhuma visita recente! :/</h1>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                {
                                                    filteredVisits.map((v) => (
                                                        <VisitsCard visitObj={v} key={v.id} isHome={false} openDetails={openDetails} />
                                                    ))
                                                }
                                            </>
                                        )
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