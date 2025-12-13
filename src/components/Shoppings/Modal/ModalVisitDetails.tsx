'use client';
import { useState, useEffect } from "react";
import Modal from "../../Layout/Modal/Modal";
import { formatDate } from "@/src/lib/utils";
import { UserIcon, CalendarIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function VisitDetailsModal({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: number }) {

    useEffect(() => {
        const fetchData = async () => {

        }

        fetchData();
    }, [isOpen, id]);

    return (
        <Modal title={'Comparação de Visitas'} isOpen={isOpen} onClose={onClose} width={75} widthMobile={95}>
            <div className="flex gap-3">
                <div className="w-full">
                    <div className="w-full text-center text-[22px] mb-5">
                        <div className="flex gap-1">
                            <div className="w-[30%] flex gap-1 text-gray-500">
                                <UserIcon height={24} />
                                <span className="text-[20px] h-full">Usuário:</span>
                            </div>
                            <h1 className="w-[60%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {}
                            </h1>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] flex gap-1 text-gray-500">
                                <CalendarIcon height={24} />
                                <span className="text-[20px]" >Data:</span>
                            </div>
                            <h1 className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {/* {formatDate(s.date)} */}
                            </h1>
                        </div>
                        <div className="flex">
                            <div className="w-[30%] flex gap-1 text-gray-500">
                                <ExclamationCircleIcon height={24} />
                                <span className="text-[20px]" >Obs:</span>
                            </div>
                            <p title={''} className="w-[70%] text-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {}
                            </p>
                        </div>
                    </div>
                    <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                        <h1 className="text-center">Nome</h1>
                        <h1 className="text-center">Classificação</h1>
                        <h1 className="text-center">Segmento</h1>
                        <h1 className="text-center">Atividade</h1>
                    </div>
                </div>
            </div>
        </Modal>
    );
}