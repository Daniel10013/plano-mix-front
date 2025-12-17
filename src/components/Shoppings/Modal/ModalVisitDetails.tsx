'use client';

import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "../../Layout/Modal/Modal";
import { VisitDetails } from "@/src/types/Visits/Visits";
import { formatDate, capitalizeWords } from "@/src/lib/utils";
import { getVisitDetails } from "@/src/services/visits.service";
import { UserIcon, CalendarIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function VisitDetailsModal({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: number }) {

    const [visit, setVisit] = useState<VisitDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            if (id == 0) {
                return;
            }
            try {
                const data = await getVisitDetails(id);
                setVisit(data.data)
            }
            catch (err: any) {
                onClose();
                Swal.fire({
                    icon: 'error',
                    title: "Erro!", text: err.message ?? 'Erro ao pegar detalhes da visita',
                })
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [isOpen, id]);

    return (
        <Modal title={'Datalhes da Visita'} isOpen={isOpen} onClose={onClose} width={70} widthMobile={95}>
            <div className="flex gap-3 max-h-[500px]">
                {isLoading ?
                    (
                        <>
                            <div className="flex items-center justify-center w-full flex-col gap-3 h-[500px]">
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
                            <div className="w-full flex flex-col">
                                <div className="flex flex-col gap-4 mb-5 text-[22px]">
                                    <div className="flex flex-col xl:flex-row w-full gap-4">
                                        <div className="flex gap-2 w-full xl:w-[65%]">
                                            <div className="flex gap-1 text-gray-500">
                                                <UserIcon height={24} />
                                                <span className="text-[20px]">Usuário:</span>
                                            </div>
                                            <h1 className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                {visit?.username ?? 'Usuário deletado.'}
                                            </h1>
                                        </div>

                                        <div className="flex gap-2 w-full xl:w-[25%]">
                                            <div className="flex gap-1 text-gray-500">
                                                <CalendarIcon height={24} />
                                                <span className="text-[20px]">Data:</span>
                                            </div>
                                            <h1 className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                {formatDate(visit!.date)}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full">
                                        <div className="flex gap-1 text-gray-500">
                                            <ExclamationCircleIcon height={24} />
                                            <span className="text-[20px]">Obs:</span>
                                        </div>
                                        <p className="w-[85%] xl:w-[90%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                            {visit?.observation ?? ''}
                                        </p>
                                    </div>
                                </div>
                                <h1 className="w-full text-2xl text-center mb-3">Listagem de Lojas</h1>
                                <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                    <h1 className="text-center">Nome</h1>
                                    <h1 className="text-center">Classificação</h1>
                                    <h1 className="text-center">Segmento</h1>
                                    <h1 className="text-center">Atividade</h1>
                                </div>
                                <div className="w-full flex flex-col">
                                    {visit?.stores.map((store, index) => {
                                        return (
                                            <div key={index} className="text-[16px] w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                                <h1 className="text-center">{store.name}</h1>
                                                <h1 className="text-center">{capitalizeWords(store.classification)}</h1>
                                                <h1 className="text-center">{capitalizeWords(store.segment)}</h1>
                                                <h1 className="text-center">{!store.activity ? 'Sem atividade' : capitalizeWords(store.activity)}</h1>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </Modal>
    );
}