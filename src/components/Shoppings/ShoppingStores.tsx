'use client';

import Select from "react-select";
import { useState, useEffect } from "react";
import type { ShoppingStores } from "@/src/types/Stores/Stores";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ShoppingStores({ id }: { id: number }) {

    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<'active' | 'deleted' | 'all'>('active');
    const [shoppingStores, setShoppingStores] = useState<ShoppingStores[]>([
        {
            id: 1,
            name: 'Loja 1',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
        {
            id: 2,
            name: 'Loja 2',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
        {
            id: 3,
            name: 'Loja 3',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
    ]);

    const optionsStatus: {label: string, value: 'active' | 'deleted' | 'all'}[] = [
        {label: 'Ativas', value: 'active'},
        {label: 'Inativas', value: 'deleted'},
        {label: 'Todas', value: 'all'}
    ]

    const handleFilter = (status: 'active' | 'deleted' | 'all') => {
        console.log(status);
    }

    return (
        <>
            <div className="flex gap-4 xl:gap-2 mb-6 flex-col xl:flex-row">
                <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                    <MagnifyingGlassIcon className="h-9 w-9 text-[#a9b1bf]" />
                    <input type="password" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Visita por usuário ou data..."
                        className=" w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                </div>
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
                    isSearchable={false}
                    noOptionsMessage={() => "Nenhum item encontrado!"}
                    placeholder="Classificação"
                    options={optionsStatus}
                    onChange={(v) => handleFilter(v!.value)}
                />
            </div>
            <div className="flex flex-col w-full max-h-[800px] overflow-x-auto">
                {shoppingStores.length == 0 ?
                    (
                        <div className="w-full h-full grid place-items-center">
                            <div className="p-4 border border-gray-300 rounded-[10px] w-full max-w-[400px]">
                                <h1 className="text-2xl text-center">Nenhuma loja cadastrada!</h1>
                                <h2 className="text-2xl text-center">:/</h2>
                            </div>
                        </div>
                    )
                    :
                    (
                        <>
                            <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                <h1 className="text-center">Nome</h1>
                                <h1 className="text-center">Classificação</h1>
                                <h1 className="text-center">Segmento</h1>
                                <h1 className="text-center">Status</h1>
                            </div>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                {
                                    shoppingStores.map((s) => (
                                        <div key={s.id}>
                                            <div className="text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                                <h1 className="text-center">{s.name}</h1>
                                                <h1 className="text-center">{s.classification}</h1>
                                                <h1 className="text-center">{s.segment}</h1>
                                                <h1 className="text-center">{s.status == 'active' ? 'Ativa' : 'Inativa'}</h1>
                                            </div>
                                            <div key={s.id} className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                                <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                                <div className="flex flex-col gap-3">
                                                    <div className="text-[20px]">
                                                        <label className="text-gray-500">Classificação:</label>
                                                        <p>{s.classification}</p>
                                                    </div>
                                                    <div className="text-[20px]">
                                                        <label className="text-gray-500">Segmento:</label>
                                                        <p>{s.segment}</p>
                                                    </div>
                                                    <div className="text-[20px]">
                                                        <label className="text-gray-500">Atividade:</label>
                                                        <p>{s.activity ?? 'Sem Registro'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}