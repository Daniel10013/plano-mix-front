'use client';

import Select from "react-select";
import { useEffect, useState } from "react";
import Modal from "../../Layout/Modal/Modal";
import { Store } from "@/src/types/Stores/Stores";
import { ShoppingStores } from "@/src/types/Stores/Stores";
import { Control, Option, SingleValue } from "../../Layout/Select/Select";

type optionsStore = {value: number, label: string, subtitle: string};

export default function ModalFormStoreVisit({type, isOpen, onClose, stores, addStore, itemToEdit, updateStore}: {
    type: 'create' | 'edit',
    isOpen: boolean,
    stores: Store[],
    itemToEdit? : {index: number, item: ShoppingStores}
    onClose: () => void,
    addStore: (storeData: ShoppingStores) => void,
    updateStore: (index: number, item: ShoppingStores) => void,
}) {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [storesOptions, setStoreOptions] = useState<optionsStore[]>([]);

    const [selectedStore, setSelectedStore] = useState<number>(0);
    const [selectedStoreLeft, setSelectedStoreLeft] = useState<number>(0);
    const [selectedStoreRight, setSelectedStoreRight] = useState<number>(0);

    //valores dos selects

    useEffect(() => {
        setStoreOptions(stores.map((s) => ({
            value: s.id,
            label: s.name,
            subtitle: `${s.classification}, ${s.segment} ${s.activity ? ', ' + s.activity : ''}`
        })))
    }, [stores])

    useEffect(() => {
        setSelectedStore(itemToEdit?.item.store_id ?? 0);
        setSelectedStoreLeft(itemToEdit?.item.store_left_id ?? 0);
        setSelectedStoreRight(itemToEdit?.item.store_right_id ?? 0);
    }, [itemToEdit, type])

    const handleClick = () => {
        if(selectedStore == 0){
            setErrorMessage('Selecione a loja para adicionar!');
            return;
        }   

        if(selectedStore == selectedStoreLeft || selectedStore == selectedStoreRight){
            setErrorMessage('A loja da esquerda ou direita não pode ser igual a selecionada!');
            return;
        }

        if((selectedStoreLeft != 0 && selectedStoreRight != 0) && (selectedStoreLeft == selectedStoreRight)){
            setErrorMessage('A loja da esquerda não pode ser igual da direita!');
            return;
        }

        const store = stores.find((s)=> s.id == selectedStore);
        const storeLeft = stores.find((s)=> s.id == selectedStoreLeft) ?? null;
        const storeRight = stores.find((s)=> s.id == selectedStoreRight) ?? null;
        const storeToAdd: ShoppingStores = {
            id: type == 'create' ? null : itemToEdit!.item.id,
            store_id: store!.id,
            name: store!.name,
            classification: store!.classification,
            classification_id: store!.classification_id,
            segment: store!.segment,
            segment_id: store!.segment_id,
            activity: store?.activity ?? null,
            activity_id: store?.activity_id ?? null,
            store_left_name: storeLeft?.name ?? null,
            store_left_id: storeLeft?.id ?? null,
            store_right_name: storeRight?.name ?? null,
            store_right_id: storeRight?.id ?? null,
            status: 'active'
        }

        if(type == 'create'){
            addStore(storeToAdd);
        }
        if(type == 'edit') {
            updateStore(itemToEdit!.index, storeToAdd);
        }
        onClose();
        clearForm();
    }

    const clearForm = () => {
        setSelectedStore(0);
        setSelectedStoreLeft(0);
        setSelectedStoreRight(0);
    }

    return (
        <Modal title={type == 'create'? 'Cadastro de Loja' : 'Alterar Loja'} width={30} widthMobile={95} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full gap-4">
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a loja:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                fontSize: '20px',
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        onChange={(v)=>{setSelectedStore(v ? v.value : 0)}}
                        isClearable
                        value= {
                            selectedStore == 0 ? null : storesOptions.find(s => s.value == selectedStore)
                        }
                        options={storesOptions}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a Loja a esquerda:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                fontSize: '20px',
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        onChange={(v)=>{setSelectedStoreLeft(v ? v.value : 0)}}
                        options={storesOptions}
                        isClearable
                        value= {
                            selectedStoreLeft == 0 ? null : storesOptions.find(s => s.value == selectedStoreLeft)
                        }
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Selecione a Loja a esquerda:</label>
                    <Select
                        className="w-full text-2xl"
                        components={{ Control, Option, SingleValue }}
                        styles={{
                            container: (base) => ({ ...base, flex: 1 }),
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                cursor: "pointer",
                                minHeight: "2.75rem",
                                boxShadow: "none",
                                borderRadius: "10px",
                                fontSize: '20px',
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        placeholder="Procure pela loja"
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={storesOptions}
                        isClearable
                        onChange={(v)=>{setSelectedStoreRight(v ? v.value : 0)}}
                        value= {
                            selectedStoreRight == 0 ? null : storesOptions.find(s => s.value == selectedStoreRight)
                        }
                    />
                </div>
                <div className="h-30 w-full flex justitify-center items-end">
                    <h1 className="w-full text-2xl text-red-500 text-center">{errorMessage}</h1>
                </div>
                <button onClick={()=>{handleClick()}} className="w-full bg-[#8173FF] p-2 text-[22px] transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                    Adicionar Loja
                </button>
            </div>
        </Modal>
    )
}