'use client';
import { useState, useEffect } from "react";
import Modal from "../../Layout/Modal/Modal";
import { VisitCompare } from "@/src/types/Stores/Stores";
import { compareVisits, getVisitsDates } from "@/src/services/visits.service";
import Swal from "sweetalert2";
import { capitalizeWords, formatDate } from "@/src/lib/utils";

export default function CompareVisitModal({ id1, id2, isOpen, onClose }: { id1: number, id2: number, isOpen: boolean, onClose: () => void }) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visit1, setVisit1] = useState<VisitCompare[]>([])
    const [visit2, setVisit2] = useState<VisitCompare[]>([])

    const [visit1Date, setVisit1Date] = useState('');
    const [visit2Date, setVisit2Date] = useState('');

    useEffect(() => {
        if(!id1 || !id2){
            return;
        }
        const fetchData = async () => {
            try {
                const data = await compareVisits(id1, id2);
                setVisit1(data.data.visit1);
                setVisit2(data.data.visit2);

                const dates = await getVisitsDates(id1, id2);
                setVisit1Date(formatDate(dates.date1));
                setVisit2Date(formatDate(dates.date2));
            }
            catch (err: any) {
                onClose();
                Swal.fire({
                    icon: 'error', title: 'Erro!', text: err.message ?? 'Erro ao pegar dados!'
                })
            }   
            finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [isOpen])

    return (
        <Modal title={'Comparação de Visitas'} isOpen={isOpen} onClose={onClose} width={85} widthMobile={95}>

            <div className="flex gap-3">
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
                            <div className="w-1/2">
                                <div className="w-full text-center text-[22px] mb-5">
                                    <div>Visita do dia {visit1Date}</div>
                                </div>
                                <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                    <h1 className="text-center">Nome</h1>
                                    <h1 className="text-center">Classificação</h1>
                                    <h1 className="text-center">Segmento</h1>
                                    <h1 className="text-center">Atividade</h1>
                                </div>
                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                    {
                                        visit1.map((s, index) => (
                                            <div key={index} className={`rounded-[10px] xl:rounded-none ${s.status == 'deleted' ? 'bg-[#eaeaea]' : ''}`}>
                                                <div className={`text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300`}>
                                                    <h1 className="text-center">{s.name}</h1>
                                                    <h1 className="text-center">{capitalizeWords(s.classification)}</h1>
                                                    <h1 className="text-center">{capitalizeWords(s.segment)}</h1>
                                                    <h1 className="text-center">{s.activity ? capitalizeWords(s.activity) : '-'}</h1>
                                                </div>
                                                <div key={index} className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                                    <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Classificação:</label>
                                                            <p>{capitalizeWords(s.classification)}</p>
                                                        </div>
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Segmento:</label>
                                                            <p>{capitalizeWords(s.segment)}</p>
                                                        </div>
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Atividade:</label>
                                                            <p>{s.activity ? capitalizeWords(s.activity) : '-'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="min-h-[300px] h-fit-content w-px hidden sm:block border border-px border-gray-200"></div>
                            <div className="w-1/2">
                                <div className="w-full text-center text-[22px] mb-5">
                                    <div>Visita do dia {visit2Date}</div>
                                </div>
                                <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                                    <h1 className="text-center">Nome</h1>
                                    <h1 className="text-center">Classificação</h1>
                                    <h1 className="text-center">Segmento</h1>
                                    <h1 className="text-center">Atividade</h1>
                                </div>
                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                                    {
                                        visit2.map((s, index) => (
                                            <div key={index}>
                                                <div className="text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                                    <h1 className="text-center">{s.name}</h1>
                                                    <h1 className="text-center">{capitalizeWords(s.classification)}</h1>
                                                    <h1 className="text-center">{capitalizeWords(s.segment)}</h1>
                                                    <h1 className="text-center">{s.activity ? capitalizeWords(s.activity) : '-'}</h1>
                                                </div>
                                                <div className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                                    <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Classificação:</label>
                                                            <p>{capitalizeWords(s.classification)}</p>
                                                        </div>
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Segmento:</label>
                                                            <p>{capitalizeWords(s.segment)}</p>
                                                        </div>
                                                        <div className="text-[20px]">
                                                            <label className="text-gray-500">Atividade:</label>
                                                            <p>{s.activity ? capitalizeWords(s.activity) : '-'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </Modal>
    );
}