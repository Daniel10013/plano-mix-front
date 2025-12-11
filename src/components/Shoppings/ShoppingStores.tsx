'use client';

import Select from "react-select";
import { toast } from "react-toastify";
import { useState, useEffect, useMemo } from "react";
import { debounce, capitalizeWords } from "@/src/lib/utils";
import type { ShoppingStores } from "@/src/types/Stores/Stores";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getShoppingStores } from "@/src/services/shopping.service";

type StatusType = {
    label: string;
    value: 'active' | 'deleted' | 'all';
};

export default function ShoppingStores({ id }: { id: number }) {

    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<'active' | 'deleted' | 'all'>('active');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shoppingStores, setShoppingStores] = useState<ShoppingStores[]>([]);
    const [fullShoppingStores, setFullShoppingStores] = useState<ShoppingStores[]>([]);

    const optionsStatus: { label: string, value: 'active' | 'deleted' | 'all' }[] = [
        { label: 'Ativas', value: 'active' },
        { label: 'Inativas', value: 'deleted' },
        { label: 'Todas', value: 'all' }
    ];

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getShoppingStores(id);
                setFullShoppingStores(data.data);
            } catch (err: any) {
                toast.error(err.message ?? 'Erro ao carregar as lojas do shopping!');
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [id]);

    useEffect(() => {
        if (fullShoppingStores.length === 0) return;
        applyInstantFilter();
    }, [fullShoppingStores, selectedFilter]);

    const debouncedSearch = useMemo(() =>
        debounce((value: string) => {
            const normalized = value.trim().toLowerCase();
            const filtered = fullShoppingStores.filter(s => {
                const matchStatus = selectedFilter === 'all' ? true : s.status === selectedFilter;
                const matchName = normalized === '' ? true : s.name.toLowerCase().includes(normalized);
                return matchStatus && matchName;
            });

            setShoppingStores(filtered);
            setIsLoading(false);
        }, 500)
        , [fullShoppingStores, selectedFilter]);

    const applyInstantFilter = () => {
        const normalized = searchInput.trim().toLowerCase();
        const filtered = fullShoppingStores.filter(s => {
            const matchStatus = selectedFilter === 'all' ? true : s.status === selectedFilter;
            const matchName = normalized === '' ? true : s.name.toLowerCase().includes(normalized);
            return matchStatus && matchName;
        });
        setShoppingStores(filtered);
    };

    const handleFilter = (status: 'active' | 'deleted' | 'all') => {
        setSelectedFilter(status);
    };

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setIsLoading(true);
        debouncedSearch(value);
    };

    return (
        <>
            <div className="flex gap-4 xl:gap-2 mb-6 flex-col xl:flex-row">
                <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                    <MagnifyingGlassIcon className="h-9 w-9 text-[#a9b1bf]" />
                    <input type="text" onChange={(e) => { handleSearch(e.target.value) }} value={searchInput} placeholder="Pesquisar Loja..."
                        className=" w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                </div>
                <Select<StatusType>
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
                    isSearchable={false}
                    noOptionsMessage={() => "Nenhum item encontrado!"}
                    placeholder="Classificação"
                    options={optionsStatus}
                    onChange={(v) => handleFilter(v!.value)}
                    defaultValue={optionsStatus.find(o => o.value === selectedFilter)}
                />
            </div>
            <div className="flex flex-col w-full max-h-[800px] overflow-x-auto">
                <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                    <h1 className="text-center">Nome</h1>
                    <h1 className="text-center">Classificação</h1>
                    <h1 className="text-center">Segmento</h1>
                    <h1 className="text-center">Status</h1>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {isLoading ?
                        (
                            <>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index}>
                                        <div className="xl:flex gap-4 flex-col p-4 rounded-[10px]bg-white w-full xl:w-full skeleton hidden h-10">
                                            {" "}
                                        </div>
                                        <div className="w-full rounded-[10px] xl:hidden p-3 h-60 skeleton">
                                            {" "}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                        :
                        (
                            <>
                                {
                                    shoppingStores.length == 0 ?
                                        (
                                            <div key="empty" className="w-full h-full grid place-items-center">
                                                <div className="p-4 border border-gray-300 rounded-[10px] w-full mt-4">
                                                    <h1 className="text-2xl text-center">Nenhuma loja encontrada!</h1>
                                                    <h2 className="text-2xl text-center">:/</h2>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <>
                                                {
                                                    shoppingStores.map((s) => (
                                                        <div key={s.id}>
                                                            {/* DESKTOP */}
                                                            <div className="text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                                                <h1 className="text-center">{s.name}</h1>
                                                                <h1 className="text-center overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    {capitalizeWords(s.classification)}
                                                                </h1>
                                                                <h1 className="text-center overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    {capitalizeWords(s.segment)}
                                                                </h1>
                                                                <h1 className="text-center">{s.status == 'active' ? 'Ativa' : 'Inativa'}</h1>
                                                            </div>
                                                            {/* MOBILE */}
                                                            <div className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                                                <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                                                <div className="flex flex-col gap-3">
                                                                    <div className="text-[20px]">
                                                                        <label className="text-gray-500">Classificação:</label>
                                                                        <p>{capitalizeWords(s.classification)}</p>
                                                                    </div>
                                                                    <div className="text-[20px]">
                                                                        <label className="text-gray-500">Segmento:</label>
                                                                        <p>{capitalizeWords(s.segment)}</p>
                                                                    </div>
                                                                    <div className="text-[20px]">
                                                                        <label className="text-gray-500">Atividade:</label>
                                                                        <p>{!s.activity ? 'Sem Registro' : capitalizeWords(s.activity)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
        </>
    );
}