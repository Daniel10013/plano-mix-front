"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import { SearchIcon } from "lucide-react"
import { useState } from "react";
import Select from "react-select";
import StoreCard from "@/src/components/Stores/StoreCard";
import type {Store} from "@/src/types/Stores/Store.ts"

export default function ListStore() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [stores, setStores] = useState<Store[]>(
        [{
            id: 1,
            name: "Burguer King",
            classification: "Ancora",
            segment: "Alimentação",
            activity: "Fast-Food"
        },
        {
            id: 2,
            name: "Burguer King",
            classification: "Ancora",
            segment: "Alimentação",
            activity: "Fast-Food"
        },
        {
            id: 3,
            name: "Burguer King",
            classification: "Ancora",
            segment: "Alimentação",
            activity: "Fast-Food"
        },
        {
            id: 4,
            name: "Burguer King",
            classification: "Ancora",
            segment: "Alimentação",
            activity: "Fast-Food"
        },
        {
            id: 5,
            name: "Burguer King",
            classification: "Ancora",
            segment: "Alimentação",
            activity: "Fast-Food"
        },])


    const classification = [
        { "id": 1, "name": "LOJAS ÂNCORA" },
        { "id": 2, "name": "SEMI-ÂNCORA" },
        { "id": 3, "name": "MEGALOJAS" },
        { "id": 4, "name": "LOJAS SATÉLITE" },
        { "id": 5, "name": "CONVENIÊNCIA / SERVIÇOS" },
        { "id": 6, "name": "ENTRETENIMENTO" },
        { "id": 7, "name": "MALL E MERCHANDISING" }
    ]
    const optionsClassification = classification.map(item => ({
        value: item.id,
        label: item.name
    }));
    const segment = [
        { "id": 1, "name": "MODA", "classification_id": 1 },
        { "id": 2, "name": "HIPERMERCADO / SUPERMERCADO / ATACAREJO", "classification_id": 1 },
        { "id": 3, "name": "ARTIGOS ESPORTIVOS", "classification_id": 1 },
        { "id": 4, "name": "CONSTRUÇÃO E DECORAÇÃO", "classification_id": 1 },
        { "id": 5, "name": "ELETRODOMÉSTICOS E ELETROELETRÔNICOS", "classification_id": 1 },
        { "id": 6, "name": "MAGAZINES E/OU UTENSÍLIOS PARA O LAR E CONVENIÊNCIA", "classification_id": 1 },
        { "id": 7, "name": "MATERIAL DE ESCRITÓRIO / PAPELARIA / INFORMÁTICA", "classification_id": 1 },
        { "id": 8, "name": "BRINQUEDOS", "classification_id": 1 },
        { "id": 9, "name": "PUERICULTURA", "classification_id": 1 },
        { "id": 10, "name": "ARTIGOS PARA FESTAS", "classification_id": 1 },
        { "id": 11, "name": "LIVRARIAS", "classification_id": 1 },
        { "id": 12, "name": "PET CENTERS", "classification_id": 1 },
        { "id": 13, "name": "ACADEMIAS", "classification_id": 1 },
        { "id": 14, "name": "CENTROS MÉDICOS", "classification_id": 1 },
        { "id": 15, "name": "CENTROS EDUCACIONAIS / ESCOLAS / FACULDADES / UNIVERSIDADES", "classification_id": 1 },
        { "id": 16, "name": "SERVIÇOS", "classification_id": 1 },
        { "id": 17, "name": "ALIMENTAÇÃO E BEBIDAS", "classification_id": 1 },
        { "id": 18, "name": "OUTROS", "classification_id": 1 }
    ]
    const optionsSegment = segment.map(item => ({
        value: item.id,
        label: item.name
    }));

    const handleFilterClassification = (id: number) => {
        console.log(id);
    }

    const handleFilterSegment = (id: number) => {
        console.log(id);
    }

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex">
                    <span className="w-[80%] flex justify-start">
                        <h1 className="text-3xl">Listagem de lojas</h1>
                    </span>
                    <div className="w-[20%] xl:w-[20%] xl:hidden flex justify-center">
                        <button onClick={() => { console.log("teste") }} className=" p-2 w-[65%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                                                transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                            <span className="hidden text-2xl">Adicionar Usuário</span><PlusIcon height={28} />
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:flex-row gap-4">
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
                            placeholder="Classificação"
                            options={optionsClassification}
                            onChange={(v) => handleFilterClassification(v!.value)}
                            isSearchable
                        />
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
                            placeholder="Segmento"
                            options={optionsSegment}
                            onChange={(v) => handleFilterSegment(v!.value)}
                            isSearchable
                        />
                    </div>
                    <div className="hidden w-full xl:w-[20%] xl:flex justify-center">
                        <button className=" p-2 w-[10%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                            <span className="xl:block text-2xl">Cadastrar</span><PlusIcon height={28} />
                        </button>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {stores.length == 0 ?
                        (
                            <div className="w-full flex item-center justify-center p-8">
                                <h1 className="text-2xl">Nenhuma loja cadastrada! :/</h1>
                            </div>
                        )
                        :
                        (
                            <>
                                {
                                    stores.map((v) => (
                                        <StoreCard storeObj={v} key={v.id} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}