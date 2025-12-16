'use client';

import Link from "next/link"
import { useEffect, useState } from "react";
import type { Shopping } from "@/src/types/Shoppings/Shoppings";
import ShoppingCard from "../Shoppings/ShoppingCards";
import { loadShoppings } from "@/src/services/shopping.service";
import { toast } from "react-toastify";

export default function HomeShoppings() {

    const [shoppings, setShoppings] = useState<Shopping[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const shopping = await loadShoppings() as Shopping[];
                setShoppings(shopping);
            } catch (err: any) {
                console.log(err);
                toast.error(err.message ?? 'Erro ao listar shoppings!');
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="py-10 flex flex-col px-4 w-full bg-[#F8F8F8] gap-5">
            <div className="w-full flex items-center justify-center xl:justify-between">
                <h1 className="text-[30px]">Shoppings Cadastrados</h1>
                <Link className="hidden xl:block text-2xl text-[#8173FF] hover:text-[#5141e0] underline transition-all duration-200" href={'/shoppings'}>Ver mais</Link>
            </div>
            {isLoading ?
                (
                    <>
                        <div className="w-full flex flex-col xl:flex-row items-center gap-4">


                            <>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="skeleton w-full h-[280px] rounded-xl"
                                        ></div>

                                    ))
                                }
                            </>


                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className="w-full flex flex-col xl:flex-row items-center gap-4">
                            {shoppings && shoppings.length == 0 ?
                                (
                                    <div className="flex w-80% flex-col item-center justify-center">
                                        <h1 className="text-2xl">Nenhum shopping cadastrado!</h1>
                                        <h2 className="text-2xl w-full text-center">:/</h2>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {
                                            shoppings?.slice(0, 4).map((s) => (
                                                <ShoppingCard shoppingObj={s} key={s.id} isHome={true} />
                                            ))
                                        }
                                        <Link href={'/shoppings'} className="w-1/2 p-3 bg-[#8173FF] text-white text-[24px] rounded-[10px] text-center
                                        transition-all duration-200 hover:bg-[#7465f7] xl:hidden
                            ">
                                            Ver mais
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}