'use client';

import Select from "react-select";
import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import ModalAddStoreVisit from "./Modal/ModalAddStoreVisit";
import type { ShoppingStores } from "@/src/types/Stores/Stores";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function CreateVisitForm() {

    const [searchInput, setSearchInput] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedFilter, setSelectedFilter] = useState<'active' | 'deleted' | 'all'>('active');
    const [selectedShopping, setSelectedShopping] = useState<number>();
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
        {
            id: 4,
            name: 'Loja 4',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                {
            id: 5,
            name: 'Loja 5',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                {
            id: 6,
            name: 'Loja 6',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                {
            id: 7,
            name: 'Loja 7',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                        {
            id: 8,
            name: 'Loja 8',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                        {
            id: 9,
            name: 'Loja 9',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },
                        {
            id: 10,
            name: 'Loja 10',
            classification: 'Classificacao 1',
            segment: 'Segmento 1',
            activity: 'Atividade 1',
            status: 'active'
        },


    ]);

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

    const options = shoppingNames.map(item => ({
        value: item.id,
        label: item.name
    }));

    const loadStores = () => {

    }

    return (
        <>
            <ModalAddStoreVisit  reloadStores={loadStores} isOpen={isOpen} onClose={()=>{setIsOpen(false)}} />
            <h1 className="mt-4 w-full text-center xl:text-left text-3xl">Selecione o Shopping:</h1>
            <Select
                className="w-full text-2xl xl:w-1/4 mb-6"
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
                noOptionsMessage={() => "Nenhum item encontrado!"}
                placeholder="Selecione um Shopping"
                options={options}
                onChange={(v) => setSelectedShopping(v!.value)}
                isSearchable
            />
            <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">
                <div className="w-full xl:w-1/2 flex flex-col gap-4 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl text-[#8B8B8B] ">Lojas Selecionadas:</h1>
                    <div className="flex gap-4 xl:gap-2 mb-6 flex-col xl:flex-row xl:justify-between">
                        <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                            <MagnifyingGlassIcon className="h-8 w-8 text-[#a9b1bf]" />
                            <input type="password" onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Loja..."
                                className=" w-[50%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                        </div>
                        <button onClick={()=>{setIsOpen(true)}}
                        className="w-full xl:w-[30%] text-[28px] bg-[#8173FF] text-white flex items-center justify-center gap-2 rounded-[10px]
                            transition-all duration-200 hover:bg-[#5e4fec] cursor-pointer
                        ">
                            Nova Loja <PlusIcon height={26} />
                        </button>
                    </div>
                    <div className="flex flex-col w-full max-h-[600px] overflow-x-auto">
                        {shoppingStores.length == 0 ?
                            (
                                <div className="w-full h-full grid place-items-center">
                                    <div className="p-4 border border-gray-300 rounded-[10px] w-full max-w-[400px]">
                                        <h1 className="text-2xl text-center">Nenhuma loja selecionada!</h1>
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
                                        <h1 className="text-center">Loja Esquerda</h1>
                                        <h1 className="text-center">Loja Direita</h1>
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
                                                                <label className="text-gray-500">Loja Esquerda:</label>
                                                                <p>{s.segment}</p>
                                                            </div>
                                                            <div className="text-[20px]">
                                                                <label className="text-gray-500">Muit :</label>
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
                </div>
                <div className="min-h-[40vh] w-px hidden xl:block border border-px border-gray-200"></div>
                <div className="w-full xl:w-1/2 flex flex-col gap-3 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl text-[#8B8B8B]">Observação:</h1>
                    <textarea className="w-full rounded-[10px] h-[200px] border p-3 bg-white text-[22px] border-gray-200 
                        transition-all duration-200 focus-within:border-[#8173FF] resize-none outline-none">
                    </textarea>
                    <h1 className="w-full text-center xl:text-left text-3xl text-[#8B8B8B]" >Atenção! Ao salvar a visita, não será possivel alterar.
                        Tenha certaza que todos os dados estão corretos!
                    </h1>
                    <div className="flex items-center justify-center w-full">
                        <button className="flex items-center justify-center flex-row gap-3 p-4 rounded-[10px] w-full xl:w-[30%] text-white text-2xl 
                            bg-[#8173FF] transition-all duration-200 hover:bg-[#5e4fec] cursor-pointer">
                            Salvar
                            <Save height={28} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}