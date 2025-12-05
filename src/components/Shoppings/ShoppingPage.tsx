"use client";

import { toast } from "react-toastify";
import { debounce } from "@/src/lib/utils";
import { SearchIcon, PlusIcon } from "lucide-react"
import { useEffect, useState, useMemo } from "react";
import ModalEditShopping from "./Modal/ModalEditShopping";
import ModalCreateShopping from "./Modal/ModalCreateShopping";
import type { Shopping } from "@/src/types/Shoppings/Shoppings";
import { loadShoppings } from "@/src/services/shopping.service";
import ShoppingCard from "@/src/components/Shoppings/ShoppingCards";

export default function ShoppingPage() {

    const [searchInput, setSearchInput] = useState<string>('');
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalEditIsOpen, setModaleEditIsOpen] = useState<boolean>(false);
    const [idToEdit, setIdToEdit] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shoppings, setShoppings] = useState<Shopping[]>([])
    const [originalShoppings, setOriginalShoppings] = useState<Shopping[]>([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await loadShoppings() as Shopping[];
            setShoppings(data);
            setOriginalShoppings(data);
        }
        catch (err: any) {
            console.log(err);
            toast.error(err.message ?? 'Erro ao listar shoppings!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const reloadShoppings = async () => {
        await fetchData();
    }

    const filterShoppings = (value: string) => {
        if (value === '') {
            setShoppings(originalShoppings);
            setIsLoading(false);
            return;
        }

        const filtered = originalShoppings.filter((s) =>
            s.name.toLowerCase().includes(value.toLowerCase())
        );

        setShoppings(filtered);
        setIsLoading(false);
    };

    const debouncedFilter = useMemo(
        () =>
            debounce((value: string) => {
                filterShoppings(value);
            }, 300),
        [originalShoppings]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const value = e.target.value;
        setSearchInput(value);
        debouncedFilter(value);
    };

    return (
        <>
            <ModalEditShopping isOpen={modalEditIsOpen} 
                onClose={() => { setModaleEditIsOpen(false) }} reloadShoppings={()=> {reloadShoppings()}} 
                idToEdit={idToEdit}
            />
            <ModalCreateShopping isOpen={modalIsOpen} onClose={() => { setModalIsOpen(false) }} reloadShoppings={()=> {reloadShoppings()}} />
            <div className="w-full py-3 px-4 mt-14 xl:mt-1 flex flex-col gap-5">
                <h1 className="w-full text-center text-4xl xl:text-left">Shoppings Cadastrados</h1>
                <div className="flex gap-1 justify-between">
                    <div className="flex items-center gap-3 bg-white rounded-[10px] w-[85%] xl:w-[70%] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                        <SearchIcon className="h-8 w-8 text-[#a9b1bf]" />
                        <input type="text" onChange={handleChange} value={searchInput} placeholder="Pesquisar Shoppings..." className="w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                    </div>
                    <button onClick={() => { setModalIsOpen(!modalIsOpen) }} disabled={isLoading}
                        className="w-[13%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                        <span className="hidden xl:block text-2xl">Cadastrar</span><PlusIcon />
                    </button>
                </div>
                <div className={`w-full grid ${shoppings.length == 0 && isLoading== false ? ' items-center justify-center h-20' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'} gap-4`}>
                    <>
                        {isLoading ? (
                            <>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            flex gap-4 flex-col p-4 rounded-[10px] 
                                            h-[380px] xl:h-[280px] bg-white w-full xl:w-full skeleton
                                                ">
                                        {" "}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {shoppings.length == 0 ?
                                    (
                                        <div className="flex w-full flex-col item-center justify-center">
                                            <h1 className="text-2xl">Nenhum shopping cadastrado!</h1>
                                            <h2 className="text-2xl w-full text-center">:/</h2>
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            {shoppings.map((s) => (
                                                <ShoppingCard
                                                    shoppingObj={s}
                                                    key={s.id}
                                                    isHome={false}
                                                    setIdToEdit={setIdToEdit}
                                                    setModalEditOpen={setModaleEditIsOpen}
                                                    reloadCards={reloadShoppings}
                                                />
                                            ))}
                                        </>
                                    )
                                }
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}