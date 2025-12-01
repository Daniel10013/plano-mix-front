'use client';
import { useState, useEffect } from "react";
import Modal from "../../Layout/Modal/Modal";
import { VisitCompare } from "@/src/types/Visits/Visits";

export default function CompareVisitModal({ id1, id2, isOpen, onClose }: { id1: number, id2: number, isOpen: boolean, onClose: () => void }) {

    const [visit1, setVisit1] = useState<VisitCompare>({
        date: '10/12/2025',
        stores: [
            {
                name: 'Loja 1',
                classification: 'classification 1',
                segment: 'segment 1'
            },
            {
                name: 'Loja 1',
                classification: 'classification 1',
                segment: 'segment 1'
            }, {
                name: 'Loja 1',
                classification: 'classification 1',
                segment: 'segment 1'
            }
        ]
    })
    const [visit2, setVisit2] = useState<VisitCompare>({
        date: '10/12/2025',
        stores: [
            {
                name: 'Loja 2',
                classification: 'classification 1',
                segment: 'segment 1'
            },
            {
                name: 'Loja 2',
                classification: 'classification 1',
                segment: 'segment 1'
            }, {
                name: 'Loja 2',
                classification: 'classification 1',
                segment: 'segment 1'
            }
        ]
    })

    return (
        <Modal title={'Comparação de Visitas'} isOpen={isOpen} onClose={onClose} width={75} widthMobile={95}>
            <div className="flex gap-3">
                <div className="w-1/2">
                    <div className="w-full text-center text-[22px] mb-5">
                        <div>Visita do dia {visit1.date}</div>
                    </div>
                    <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                        <h1 className="text-center">Nome</h1>
                        <h1 className="text-center">Classificação</h1>
                        <h1 className="text-center">Segmento</h1>
                        <h1 className="text-center">Atividade</h1>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                        {
                            visit1.stores.map((s, index) => (
                                <div key={index}>
                                    <div className="text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                        <h1 className="text-center">{s.name}</h1>
                                        <h1 className="text-center">{s.classification}</h1>
                                        <h1 className="text-center">{s.segment}</h1>
                                        <h1 className="text-center">{s.activity ?? 'Sem Atividade'}</h1>
                                    </div>
                                    <div key={index} className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                        <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                        <div className="flex flex-col gap-3">
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Classificação:</label>
                                                <p>{s.classification}</p>
                                            </div>
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Segmento:</label>
                                                <p>{s.segment}</p>
                                            </div>
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Atividade:</label>
                                                <p>{s.activity ?? 'Sem Registro'}</p>
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
                        <div>Visita do dia {visit2.date}</div>
                    </div>
                    <div className="text-2xl w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 mb-1 border-t-gray-300 border-b-gray-300">
                        <h1 className="text-center">Nome</h1>
                        <h1 className="text-center">Classificação</h1>
                        <h1 className="text-center">Segmento</h1>
                        <h1 className="text-center">Atividade</h1>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                        {
                            visit2.stores.map((s, index) => (
                                <div key={index}>
                                    <div className="text-[20px] text-gray-600 w-full hidden grid-cols-4 border border-l-0 border-r-0 xl:grid px-0 py-2 border-t-0 border-b-gray-300">
                                        <h1 className="text-center">{s.name}</h1>
                                        <h1 className="text-center">{s.classification}</h1>
                                        <h1 className="text-center">{s.segment}</h1>
                                        <h1 className="text-center">{s.activity ?? 'Sem Atividade'}</h1>
                                    </div>
                                    <div key={index} className="w-full rounded-[10px] border xl:hidden border-gray-300 p-3">
                                        <h1 className="w-full text-center text-2xl">{s.name}</h1>
                                        <div className="flex flex-col gap-3">
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Classificação:</label>
                                                <p>{s.classification}</p>
                                            </div>
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Segmento:</label>
                                                <p>{s.segment}</p>
                                            </div>
                                            <div className="text-[20px]">
                                                <label className="text-gray-500">Atividade:</label>
                                                <p>{s.activity ?? 'Sem Registro'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Modal>
    );
}