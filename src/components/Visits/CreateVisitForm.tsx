'use client';

import Swal from "sweetalert2";
import Select from "react-select";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { capitalizeWords } from "@/src/lib/utils";
import { createVisit } from "@/src/services/visits.service";
import ModalFormStoreVisit from "./Modal/ModalFormStoreVisit";
import ModalCreateStore from "../Stores/Modal/ModalCreateStore";
import { ShoppingFilter } from "@/src/types/Shoppings/Shoppings";
import { getAllStores, getById } from "@/src/services/store.service";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import type { ShoppingStores, Store, StoreCreate, VisitStore } from "@/src/types/Stores/Stores";
import { getShoppingFilter, getShoppingStores } from "@/src/services/shopping.service";
import { Classification, Segment, Activity } from "@/src/types/Classifications/Classification";
import { getClassifications, getSegments, getActivities } from "@/src/services/classification.service";
import { MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

const STORAGE_KEY = 'visit_shopping_stores';

type StoredVisitData = {
    shopping_id: number;
    shoppingStores: ShoppingStores[];
    observation: string;
};

export default function CreateVisitForm() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingStores, setIsLoadingStores] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenCreateStore, setIsOpenCreateStore] = useState<boolean>(false);
    const [type, setType] = useState<'create' | 'edit'>('create');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [shoppingStoreToEdit, setShoppingStoreToEdit] = useState<{ index: number, item: ShoppingStores }>();

    // shopping 
    const [optionShopping, setShoppingsOptions] = useState<ShoppingFilter[]>([]);

    // parte de lojas
    const [searchInput, setSearchInput] = useState<string>('');
    const [shoppingStores, setShoppingStores] = useState<ShoppingStores[]>([]);
    const [allShoppingStores, setAllShoppingStores] = useState<ShoppingStores[]>([]);

    // Opcoes de lojas para adicionar
    const [storesToAdd, setStoresToAdd] = useState<Store[]>([])
    // dados para o modal de criar loja nova a base da dados
    const [classifications, setClassifications] = useState<Classification[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

    //dados da visita
    const [selectedShopping, setSelectedShopping] = useState<number>(0);
    const [observation, setObservation] = useState<string>('');
    const [visitStores, setVisitStores] = useState<VisitStore[]>([])

    useEffect(() => {
        fetchData();

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed: StoredVisitData = JSON.parse(stored);

            if (parsed.shopping_id) {
                setSelectedShopping(parsed.shopping_id);
                setShoppingStores(parsed.shoppingStores);
                setAllShoppingStores(parsed.shoppingStores);
                setObservation(parsed.observation ?? '');
                // já cria os VisitStores automaticamente
                const storesVisit: VisitStore[] = parsed.shoppingStores.map((s) => ({
                    id: s.id,
                    store_id: s.store_id,
                    shopping_id: parsed.shopping_id,
                    store_id_left: s.store_left_id,
                    store_id_right: s.store_right_id,
                    status: s.status,
                    action: 'none'
                }));

                setVisitStores(storesVisit);
            }
        }
    }, []);

    useEffect(() => {
        if (selectedShopping === 0) return;

        const dataToStore: StoredVisitData = {
            shopping_id: selectedShopping,
            shoppingStores,
            observation
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    }, [shoppingStores, selectedShopping]);

    const fetchData = async () => {
        try {
            const shoppings = await getShoppingFilter();
            setShoppingsOptions(shoppings);
            await fetchStores();
        }
        catch (err: any) {
            toast.error(err.message ?? 'Erro ao listar shoppings!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchStores = async () => {
        try {
            const stores = await getAllStores();
            setStoresToAdd(stores);

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
    }

    const handleSelectShopping = async (id: number) => {
        localStorage.removeItem(STORAGE_KEY);
        setObservation('');
        setSelectedShopping(id);
        setShoppingStores([]);

        try {
            setIsLoadingStores(false);
            const stores = (await getShoppingStores(id)).data;
            setShoppingStores(stores);
            setAllShoppingStores(stores);
            const storesVisit: VisitStore[] = stores.map((s) => ({
                id: s.id,
                store_id: s.store_id,
                shopping_id: selectedShopping,
                store_id_left: s.store_left_id,
                store_id_right: s.store_right_id,
                status: s.status,
                action: 'none'
            }))
            setVisitStores(storesVisit);
        }
        catch (err: any) {
            toast.error(err.message ?? 'Erro ao listar lojas do shopping!');
        }
        finally {
            setIsLoadingStores(false);
        }
    }

    const addStore = (newStore: ShoppingStores) => {
        const storeExists = shoppingStores.find((s) => s.store_id === newStore.store_id);
        if (storeExists) {
            toast.error('A loja já existe no shopping!');
            return;
        }

        setShoppingStores(prev => [
            ...prev,
            {
                ...newStore,
            }
        ]);

        const storeVisit: VisitStore = {
            id: null,
            store_id: newStore.store_id,
            shopping_id: selectedShopping,
            store_id_right: newStore.store_right_id,
            store_id_left: newStore.store_left_id,
            status: "active",
            action: "new"
        }

        setVisitStores(prev => [
            ...prev,
            {
                ...storeVisit,
            }
        ]);

        toast.success('Loja adicionada!');
    }

    const updateStore = (index: number, item: ShoppingStores) => {
        const s = visitStores.find((s) => s.store_id == shoppingStores[index].store_id);
        setShoppingStores(prev =>
            prev.map((it, i) =>
                i === index ? { ...it, ...item } : it
            )
        );

        const storeVisit: VisitStore = {
            id: item.id,
            store_id: item.store_id,
            shopping_id: selectedShopping,
            store_id_right: item.store_right_id,
            store_id_left: item.store_left_id,
            status: "active",
            action: "update"
        }

        setVisitStores(prev =>
            prev.map((it, i) =>
                i === index ? { ...it, ...storeVisit } : it
            )
        );

        toast.success('Loja atualizada!');
    }

    const updateStoreStatus = (index: number, status: 'active' | 'deleted') => {
        const item = visitStores.find((s) => s.store_id == shoppingStores[index].store_id);
        if (item?.action == 'new') {
            Swal.fire({
                icon: 'question', title: 'Atenção', text: `Deseja remover a loja?`,
                showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim'
            }).then((res) => {
                if (res.isConfirmed) {
                    setShoppingStores(prev =>
                        prev.filter((_, i) => i !== index)
                    );

                    setVisitStores(prev =>
                        prev.filter((_, i) => i !== index)
                    );
                }
            });
            return;
        }

        const action = status == 'active' ? 'ativar' : 'desativar';
        Swal.fire({
            icon: 'question', title: 'Atenção', text: `Deseja ${action} a loja?`,
            showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim'
        }).then((res) => {
            if (res.isConfirmed) {
                setShoppingStores(prev =>
                    prev.map((item, i) =>
                        i === index
                            ? { ...item, status }
                            : item
                    )
                );

                setVisitStores(prev =>
                    prev.map((item, i) =>
                        i === index
                            ? { ...item, status, action: 'delete' }
                            : item
                    )
                );
            }
        });
    };

    const handleFilterInput = (value: string) => {
        setSearchInput(value);
        const normalized = value.trim().toLowerCase();
        const shoppings = allShoppingStores.filter((s) => normalized === '' || s.name.toLowerCase().includes(normalized));
        setShoppingStores(shoppings);
    }

    const handleSubmit = () => {
        if (selectedShopping == 0) {
            setErrorMessage('Selecione um shopping!');
            return;
        }

        if (visitStores.length == 0) {
            setErrorMessage('Adicione ao menos 1 loja para cadastrar a visita!');
            return;
        }

        setErrorMessage('');
        Swal.fire({
            icon: 'question', title: 'Atenção!', html: 'Deseja Salvar a visita? <br> Após salvar, não será possível editar!',
            showConfirmButton: true, showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim',
            confirmButtonColor: "#de463e",
            showLoaderOnConfirm: true,

            preConfirm: async () => {
                try {
                    const res = await createVisit({
                        observation: observation,
                        shopping_id: selectedShopping,
                        shopping_stores: visitStores
                    });

                    return res;
                } catch (err: any) {
                    return Swal.showValidationMessage(
                        err.message ?? "Erro inesperado ao apagar."
                    );
                }
            },

            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Visita adicionada com sucesso!",
                    icon: "success",
                    confirmButtonText: "Entendido!"
                }).then(() => {
                    localStorage.removeItem(STORAGE_KEY);
                    setObservation('');
                    router.push('/visits');
                });
            }
        });
    }

    const addNewStoreFromModal = async (data: StoreCreate, id: number) => {
        const storeToAddOnVisit: VisitStore = {
            id: null,
            store_id: id,
            shopping_id: selectedShopping,
            store_id_right: null,
            store_id_left: null,
            status: "active",
            action: "new",
        }

        setVisitStores(prev => [
            ...prev,
            {
                ...storeToAddOnVisit,
            }
        ]);

        const newStore = await getById(id);
        console.log(newStore);
        const storeToAdd: ShoppingStores = {
            id: null,
            store_id: newStore.id,
            name: newStore.name,
            classification: newStore.classification,
            classification_id: newStore.classification_id,
            segment: newStore.segment,
            segment_id: newStore.segment_id,
            activity: newStore?.activity ?? null,
            activity_id: newStore?.activity_id ?? null,
            store_left_name: null,
            store_left_id: null,
            store_right_name: null,
            store_right_id: null,
            status: 'active'
        }
        addStore(storeToAdd);

        setStoresToAdd(prev => [
            ...prev,
            newStore
        ]);
    }

    return (
        <>
            <ModalCreateStore isOpen={isOpenCreateStore} onClose={() => { setIsOpenCreateStore(false) }} addStoreToMemory={addNewStoreFromModal}
                classifications={classifications} segments={segments} activity={activities} />
            <ModalFormStoreVisit type={type} addStore={addStore} stores={storesToAdd} updateStore={updateStore} itemToEdit={shoppingStoreToEdit}
                isOpen={isOpen} onClose={() => { setIsOpen(false) }}
            />
            <h1 className="mt-4 w-full text-center xl:text-left text-3xl">Selecione o Shopping:</h1>
            <div className="w-full flex flex-col xl:flex-row xl:gap-2 mb-5">
                <div className="w-full xl:w-[40%]">
                    <Select
                        className="w-full text-[28px] mb-4"
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
                                : optionShopping.find(o => o.value === selectedShopping) ?? null
                        }
                        placeholder="Selecione um Shopping..."
                        onChange={(v) => { handleSelectShopping(v?.value ?? 0) }}
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={optionShopping}
                        isClearable
                        isDisabled={isLoading}
                    />
                </div>
                <div className={`${selectedShopping == 0 ? 'hidden' : 'flex'} w-full xl:w-[20%]`}>
                    <button disabled={isLoading || isLoadingStores || selectedShopping == 0} onClick={() => { setIsOpenCreateStore(true) }}
                        className={`w-full text-[28px] bg-[#8173FF] text-white flex items-center justify-center rounded-[10px] h-14 gap-3
                            ${isLoading || isLoadingStores || selectedShopping == 0 ? 'bg-[#afa6ff]' : 'bg-[#8173FF] transition-all duration-200 hover:bg-[#5e4fec] cursor-pointer'}
                            `}>
                        Cadastrar Loja
                        <BuildingStorefrontIcon width={28} />
                    </button>

                </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">
                <div className="w-full xl:w-[60%] flex flex-col gap-4 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl text-[#8B8B8B] ">Lojas Selecionadas:</h1>
                    <div className="flex gap-4 xl:gap-2 mb-6 flex-col xl:flex-row xl:justify-between">
                        <div className="w-full xl:w-[70%] flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                            <MagnifyingGlassIcon className="h-8 w-8 text-[#a9b1bf]" />
                            <input type="text" onChange={(e) => { handleFilterInput(e.target.value) }} value={searchInput} placeholder="Pesquisar Loja..."
                                className=" w-[50%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                        </div>
                        <button onClick={() => { setIsOpen(true) }} disabled={isLoading || isLoadingStores || selectedShopping == 0}
                            className={`w-full xl:w-[30%] text-[28px] bg-[#8173FF] text-white flex items-center justify-center gap-2 rounded-[10px]
                            ${isLoading || isLoadingStores || selectedShopping == 0 ? 'bg-[#afa6ff]' : 'bg-[#8173FF] transition-all duration-200 hover:bg-[#5e4fec] cursor-pointer'}
                            `}>
                            Nova Loja <PlusIcon height={26} />
                        </button>
                    </div>
                    <div className="flex flex-col w-full max-h-[600px] overflow-x-auto">
                        {selectedShopping == 0 ?
                            (
                                <>
                                    <div className="w-full h-[150px] rounded-[10px] flex items-center justify-center border-gray-300">
                                        <h1 className="text-2xl" >Selecione um shopping para iniciar! {`:)`}</h1>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    {isLoadingStores ?
                                        (
                                            <>
                                                <div className="flex items-center justify-center w-full flex-col gap-3 h-[200px]">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-20 h-20 border-10 border-[#8173FF] border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                    <h1 className="text-3xl text-[#8173FF]">Carregando...</h1>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                {shoppingStores.length == 0 ?
                                                    (
                                                        <div className="w-full h-full grid place-items-center">
                                                            <div className="p-4 border border-gray-300 rounded-[10px] w-full max-w-[400px]">
                                                                <h1 className="text-2xl text-center">Nenhuma loja adicionada!</h1>
                                                                <h2 className="text-2xl text-center">:/</h2>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className="text-2xl w-full hidden grid-cols-5 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                                                <h1 className="text-center">Nome</h1>
                                                                <h1 className="text-center">Classificação</h1>
                                                                <h1 className="text-center">Loja Esquerda</h1>
                                                                <h1 className="text-center">Loja Direita</h1>
                                                                <h1 className="text-center">Ações</h1>
                                                            </div>
                                                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                                                {
                                                                    shoppingStores.map((s, index) => {
                                                                        return (
                                                                            <div key={index} className={s.status == 'deleted' ? 'bg-[#5c5c5c11]' : ''}>
                                                                                <div className="text-[20px] text-gray-600 w-full hidden grid-cols-5 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                                                                    <h1 className="text-center">{s.name}</h1>
                                                                                    <h1 className="text-center">{capitalizeWords(s.classification)}</h1>
                                                                                    <h1 className="text-center">{s.store_left_name ?? '-'}</h1>
                                                                                    <h1 className="text-center">{s.store_right_name ?? '-'}</h1>
                                                                                    <div className="w-full flex items-center justify-center">
                                                                                        <div className="flex gap-2">
                                                                                            <PencilSquareIcon height={28} width={28}
                                                                                                className="text-[#3365ee] transition-all duration-200 hover:text-[#1f4cc7] cursor-pointer"
                                                                                                onClick={() => {
                                                                                                    if (s.status == 'deleted') {
                                                                                                        toast.warning('Não é possivel alterar uma loja desativada');
                                                                                                        return;
                                                                                                    }
                                                                                                    setType('edit');
                                                                                                    setShoppingStoreToEdit({ index: index, item: s })
                                                                                                    setIsOpen(true);
                                                                                                }}
                                                                                            />
                                                                                            {s.status == 'active' ?
                                                                                                (
                                                                                                    <>
                                                                                                        <MinusCircleIcon height={28} width={28}
                                                                                                            className="text-[#e33] transition-all duration-200 hover:text-[#bd2020] cursor-pointer"
                                                                                                            onClick={() => { updateStoreStatus(index, 'deleted') }}
                                                                                                        />
                                                                                                    </>
                                                                                                )
                                                                                                :
                                                                                                (
                                                                                                    <>
                                                                                                        <PlusCircleIcon height={28} width={28}
                                                                                                            className="text-[#50cf70] transition-all duration-200 hover:text-[#1eb142] cursor-pointer"
                                                                                                            onClick={() => { updateStoreStatus(index, 'active') }}
                                                                                                        />
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                                                                    <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                                                                    <div className="flex flex-col gap-3">
                                                                                        <div className="text-[20px]">
                                                                                            <label className="text-gray-500">Classificação:</label>
                                                                                            <p>{capitalizeWords(s.classification)}</p>
                                                                                        </div>
                                                                                        <div className="text-[20px]">
                                                                                            <label className="text-gray-500">Loja Esquerda:</label>
                                                                                            <p>{s.store_left_name ?? '-'}</p>
                                                                                        </div>
                                                                                        <div className="text-[20px]">
                                                                                            <label className="text-gray-500">Loja Direita :</label>
                                                                                            <p>{s.store_right_name ?? '-'}</p>
                                                                                        </div>
                                                                                        <div className="text-[20px]">
                                                                                            <label className="text-gray-500">Ações :</label>
                                                                                            <div className="w-full flex items-center mt-2">
                                                                                                <div className="flex gap-2">
                                                                                                    <PencilSquareIcon height={28} width={28}
                                                                                                        className="text-[#3365ee] transition-all duration-200 hover:text-[#1f4cc7] cursor-pointer"
                                                                                                        onClick={() => {
                                                                                                            if (s.status == 'deleted') {
                                                                                                                toast.warning('Não é possivel alterar uma loja desativada');
                                                                                                                return;
                                                                                                            }
                                                                                                            setType('edit');
                                                                                                            setShoppingStoreToEdit({ index: index, item: s })
                                                                                                            setIsOpen(true);
                                                                                                        }}
                                                                                                    />
                                                                                                    {s.status == 'active' ?
                                                                                                        (
                                                                                                            <>
                                                                                                                <MinusCircleIcon height={28} width={28}
                                                                                                                    className="text-[#e33] transition-all duration-200 hover:text-[#bd2020] cursor-pointer"
                                                                                                                    onClick={() => { updateStoreStatus(index, 'deleted') }}
                                                                                                                />
                                                                                                            </>
                                                                                                        )
                                                                                                        :
                                                                                                        (
                                                                                                            <>
                                                                                                                <PlusCircleIcon height={28} width={28}
                                                                                                                    className="text-[#50cf70] transition-all duration-200 hover:text-[#1eb142] cursor-pointer"
                                                                                                                    onClick={() => { updateStoreStatus(index, 'active') }}
                                                                                                                />
                                                                                                            </>
                                                                                                        )
                                                                                                    }
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="min-h-[40vh] w-px hidden xl:block border border-px border-gray-200"></div>
                <div className="w-full xl:w-[40%] flex flex-col gap-3 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl text-[#8B8B8B]">Observação:</h1>
                    <textarea disabled={isLoading} value={observation} onChange={(e) => { setObservation(e.target.value) }} className={`
                        w-full rounded-[10px] h-[200px] border p-3 text-[22px] border-gray-200 resize-none outline-none
                        ${!isLoading ? 'transition-all duration-200 focus-within:border-[#8173FF]' : 'bg-gray-200'}
                        `}>
                    </textarea>
                    <h1 className="w-full text-center xl:text-left text-2xl text-[#8B8B8B]" >Atenção! Ao salvar a visita, não será possivel alterar.
                        Tenha certeza que todos os dados estão corretos!
                    </h1>
                    <div className="h-25 w-full flex justitify-center items-end">
                        <h1 className="w-full text-2xl text-red-500 text-center">{errorMessage}</h1>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <button disabled={isLoading || isLoadingStores || selectedShopping == 0} onClick={() => { handleSubmit() }}
                            className={`
                                flex items-center justify-center flex-row gap-3 p-4 rounded-[10px] w-full xl:w-[30%] text-white text-2xl 
                                ${isLoading || selectedShopping == 0 ? 'bg-[#afa6ff]' : 'bg-[#8173FF] transition-all duration-200 hover:bg-[#5e4fec] cursor-pointer'}
                            `}>
                            {isLoading ? 'Carregando...' : 'Salvar'}

                            {!isLoading ? (
                                <><Save height={28} /></>) : (<></>)
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}