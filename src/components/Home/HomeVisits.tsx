'use client';

import Link from "next/link"
import { useEffect, useState } from "react";
import VisitsCard from "../Visits/VisitsCard";
import type { Visit } from "@/src/types/Visits/Visits";
import { getRecentVisits } from "@/src/services/visits.service";
import { toast } from "react-toastify";


export default function HomeVisits() {

    const [visits, setVisits] = useState<Visit[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getRecentVisits() as Visit[];
                setVisits(data);
            } catch (err: any) {
                console.log(err);
                toast.error(err.message ?? 'Erro ao listar visitas!');
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
                <h1 className="text-[30px]">Visitas Recentes</h1>
                <Link className="hidden xl:block text-2xl text-[#8173FF] hover:text-[#5141e0] underline transition-all duration-200" href={'/shoppings'}>Ver mais</Link>
            </div>
            {isLoading ?
                (
                    <>
                        <div className="w-full flex flex-col xl:flex-row items-center gap-4">
                            <>
                                {
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="skeleton w-full h-[220px] rounded-xl"
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
                            {visits && visits.length == 0 ?
                                (
                                    <div className="flex w-80% flex-col item-center justify-center">
                                        <h1 className="text-2xl">Nenhuma visita recente!</h1>
                                        <h2 className="text-2xl w-full text-center">:/</h2>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {
                                            visits?.slice(0, 3).map((v) => (
                                                <VisitsCard visitObj={v} key={v.id} isHome={true} />
                                            ))
                                        }
                                        <Link href={'/visits'} className="w-1/2 p-3 bg-[#8173FF] text-white text-[24px] rounded-[10px] text-center
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