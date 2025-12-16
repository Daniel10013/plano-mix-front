"use client"

import Select from "react-select";
import { SearchIcon } from "lucide-react"
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ModalFormStore from "./Modal/ModalFormStore";
import { PlusIcon } from "@heroicons/react/24/outline"
import type { Store } from "@/src/types/Stores/Stores.ts"
import StoreCard from "@/src/components/Stores/StoreCard";
import { getAllStores } from "@/src/services/store.service";
import { capitalizeWords, debounce } from "@/src/lib/utils";
import { Classification, Segment, Activity } from "@/src/types/Classifications/Classification";
import { getClassifications, getSegments, getActivities } from "@/src/services/classification.service";


export default function ListStore() {
    //dados da pagina
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchLoading, setSearchIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [idToEdit, setIdToEdit] = useState<number>(0);

    //dados carregados
    const [stores, setStores] = useState<Store[]>([]);
    const [allStores, setAllStores] = useState<Store[]>([]);
    const [classifications, setClassifications] = useState<Classification[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

    // dados de filtro
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedClassification, setSelectedClassification] = useState<number>(0);
    const [selectedSegment, setSelectedSegment] = useState<number>(0);
    const [optionsClassification, setOptionsClassification] = useState<{ value: number, label: string }[]>([]);
    const [optionsSegment, setOptionsSegment] = useState<{ value: number, label: string }[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setOptionsClassification(
            classifications.map(c => ({
                value: c.id,
                label: capitalizeWords(c.name)
            }))
        );
    }, [classifications]);

    useEffect(() => {
        setOptionsSegment(
            segments.map(s => ({
                value: s.id,
                label: capitalizeWords(s.name)
            }))
        );
    }, [segments]);

    useEffect(() => {
        if (isLoading) return;

        setSearchIsLoading(true);
        applyFilterDebounced();

        return () => {
            applyFilterDebounced.cancel?.();
        };
    }, [searchInput, selectedClassification, selectedSegment, isLoading]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await getAllStores();
            setAllStores(data);
            setStores(data);

            const dataClass = await getClassifications();
            setClassifications(dataClass.data);
            const dataSegment = await getSegments();
            setSegments(dataSegment.data);
            const dataActivity = await getActivities();
            setActivities(dataActivity.data);
        }
        catch (err: any) {
            toast.error(err.message ?? 'Erro ao carregar dados das lojas!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleFilterClassification = (id: number) => {
        setSelectedClassification(id);

        if (id === 0) {
            setSelectedSegment(0);
            setOptionsSegment([]);
            return;
        }

        const filteredSegments = segments.filter(
            s => s.classification_id === id
        );

        setOptionsSegment(
            filteredSegments.map(s => ({
                value: s.id,
                label: capitalizeWords(s.name)
            }))
        );
    }

    const filterStores = (
        value: string,
        classificationId: number,
        segmentId: number
    ): Store[] => {
        const normalized = value.trim().toLowerCase();

        return allStores.filter(store => {
            const matchName =
                normalized === '' ||
                store.name.toLowerCase().includes(normalized);

            const matchClassification =
                classificationId === 0 ||
                store.classification_id === classificationId;

            const matchSegment =
                segmentId === 0 ||
                store.segment_id === segmentId;

            return matchName && matchClassification && matchSegment;
        });
    };

    const applyFilterDebounced = debounce(() => {
        const result = filterStores(searchInput, selectedClassification, selectedSegment);
        setStores(result);
        setSearchIsLoading(false);
    }, 500);

    return (
        <>
            <ModalFormStore
                isOpen={isOpen} onClose={() => { setIsOpen(false) }} storeId={idToEdit}
                reloadStores={() => { fetchData() }} classifications={classifications} segments={segments} activity={activities}
            />
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex">
                    <span className="w-[80%] flex justify-start">
                        <h1 className="text-3xl">Listagem de lojas</h1>
                    </span>
                    <div className="w-[20%] xl:w-[20%] xl:hidden flex justify-center">
                        <button onClick={() => { setIsOpen(true) }} className=" p-2 w-[65%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
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
                            placeholder="Classificação"
                            options={optionsClassification}
                            onChange={(v) => handleFilterClassification(v ? v.value : 0)}
                            isSearchable
                            isClearable
                        />
                    </div>
                    <div className="rounded-[10px] w-full xl:w-[30%] flex">
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
                            noOptionsMessage={() => "Nenhum item encontrado!"}
                            placeholder={
                                selectedClassification === 0
                                    ? 'Selecione uma classificação'
                                    : 'Segmento'
                            }
                            options={optionsSegment}
                            value={
                                selectedSegment === 0
                                    ? null
                                    : optionsSegment.find(o => o.value === selectedSegment) ?? null
                            }
                            onChange={(v) => setSelectedSegment(v ? v.value : 0)}
                            isSearchable
                            isClearable
                            isDisabled={selectedClassification === 0}
                        />

                    </div>
                    <div className="hidden w-full xl:w-[20%] xl:flex justify-center">
                        <button onClick={() => { setIsOpen(true) }}
                            className=" p-2 w-[10%] xl:w-full bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                            transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                            <span className="xl:block text-2xl">Cadastrar</span><PlusIcon height={28} />
                        </button>
                    </div>
                </div>
                <div className={!searchLoading && !isLoading && stores.length == 0 ? 'w-full flex items-center justify-center' : 'w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'}>
                    {isLoading || searchLoading ?
                        (
                            <>
                                {Array.from({ length: 8 }).map((_, index) => {
                                    return (
                                        <div key={index} className={`h-80 flex gap-4 flex-col border border-transparent p-4 rounded-[10px] bg-white w-full xl:w-full skeleton`}>
                                        </div>
                                    );
                                })

                                }
                            </>
                        )
                        :
                        (
                            <>
                                {stores.length == 0 ?
                                    (
                                        <>
                                            <div className="w-1/2 border border-gray-300 rounded-[10px] flex item-center justify-center p-12">
                                                <h1 className="text-2xl">Nenhuma loja cadastrada! :/</h1>
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {
                                                stores.map((v) => (
                                                    <StoreCard storeObj={v} key={v.id} reloadCards={fetchData} setIdToEdit={setIdToEdit} openEditModal={setIsOpen} />
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
    )
}