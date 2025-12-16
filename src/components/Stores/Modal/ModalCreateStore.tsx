'use client';

import z from 'zod';
import Swal from 'sweetalert2';
import Select from "react-select";
import { useEffect, useState } from "react";
import Modal from "../../Layout/Modal/Modal";
import { capitalizeWords } from "@/src/lib/utils";
import { createStore } from '@/src/services/store.service';

export default function ModalCreateStore({ isOpen, onClose, reloadStores, classifications, segments, activity }: {
    isOpen: boolean,
    onClose: () => void,
    reloadStores: () => void,
    classifications: { id: number, name: string }[]
    segments: { id: number, name: string, classification_id: number }[]
    activity: { id: number, name: string, segment_id: number }[]
}) {

    // opcoes do modal
    const [error, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [optionsClassification, setOptionsClassification] = useState<{ value: number, label: string }[]>([]);
    const [optionsSegment, setOptionsSegment] = useState<{ value: number, label: string }[]>([]);
    const [optionsActivity, setOptionsActivity] = useState<{ value: number, label: string }[]>([]);

    // formulario
    const [name, setName] = useState<string>('');
    const [classificationId, setClassificationId] = useState<number>(0)
    const [segmentId, setSegmentId] = useState<number>(0)
    const [activityId, setActivityId] = useState<number>(0)

    useEffect(() => {
        setOptionsClassification(
            classifications.map(c => ({
                value: c.id,
                label: capitalizeWords(c.name)
            }))
        );
    }, [classifications]);

    const handleClassification = (id: number) => {
        setClassificationId(id)

        if (id == 0) {
            setSegmentId(0);
            setActivityId(0);
            setOptionsSegment([]);
            setOptionsActivity([]);
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

    const handleSegment = (id: number) => {
        setSegmentId(id)

        if (id == 0) {
            setActivityId(0);
            setOptionsActivity([]);
            return;
        }

        const filteredActivities = activity.filter(
            s => s.segment_id === id
        );

        setOptionsActivity(
            filteredActivities.map(s => ({
                value: s.id,
                label: capitalizeWords(s.name)
            }))
        );
    }

    const getPlaceholderActivity = (): string => {
        if (optionsActivity.length == 0 && segmentId != 0) {
            return 'Nenhuma atividade para o segmento'
        }
        return segmentId === 0 ? 'Selecione uma segmento primeiro' : 'Atividade'
    }

    const storeObject = z.object({
        name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres!'),
        classificationId: z.number().min(1, 'Selecione uma classificação!'),
        segmentId: z.number().min(1, 'Selecione um segmento!'),
        activityId: z.number().optional()
    });

    const handleSubmit = async () => {
        const result = storeObject.safeParse({ name, classificationId, segmentId, activityId });
        if (!result.success) {
            setErrorMessage(result.error?.issues[0].message);
            return;
        }

        setErrorMessage('');
        try {
            setIsLoading(true);
            const created = await createStore({
                name: name,
                classification_id: classificationId,
                segment_id: segmentId,
                activity_id: activityId == 0 ? null : activityId
            })

            if(created == true){
                onClose();
                clearForm();
                reloadStores();
                Swal.fire({
                    title: 'Sucesso!', icon: "success", text: "Loja cadastrada com sucesso!", confirmButtonText: "Boa!"
                })
            }
        }
        catch (err: any) {
            setErrorMessage(err.message ?? 'Erro ao cadastrar loja!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const clearForm = () => {
        setName('');
        setClassificationId(0);
        setSegmentId(0);
        setClassificationId(0);
    }

    return (
        <Modal title="Cadastro de Loja" width={30} widthMobile={95} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col w-full gap-4">
                <div>
                    <label className="text-[#535353] text-[20px]">Nome:</label>
                    <input type="text" placeholder="Nome da Silva" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                        className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Classificação:</label>
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
                                fontSize: "20px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },

                            }),

                        }}
                        value={
                            classificationId === 0 
                            ? null 
                            : optionsClassification.find(o => o.value === classificationId) ?? null
                        }
                        placeholder="Selecione a Classificação"
                        onChange={(v) => { handleClassification(v?.value ?? 0) }}
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={optionsClassification}
                        isClearable
                        isDisabled={isLoading}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Segmento:</label>
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
                                fontSize: "20px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            })

                        }}
                        placeholder={classificationId === 0 ? 'Selecione uma classificação primeiro' : 'Segmento'}
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        options={optionsSegment}
                        onChange={(v) => { handleSegment(v ? v.value : 0) }}
                        value={
                            segmentId === 0
                                ? null
                                : optionsSegment.find(o => o.value === segmentId) ?? null
                        }
                        isSearchable
                        isClearable
                        isDisabled={classificationId === 0 || isLoading}
                    />
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Atividade:</label>
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
                                fontSize: "20px",
                                borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                "&:hover": {
                                    borderColor: state.isFocused ? "#8173FF" : base.borderColor,
                                },
                            }),

                        }}
                        noOptionsMessage={() => "Nenhum item encontrado!"}
                        placeholder={getPlaceholderActivity()}
                        options={optionsActivity}
                        onChange={(v) => { setActivityId(v ? v.value : 0) }}
                        value={
                            activityId === 0
                                ? null
                                : optionsActivity.find(o => o.value === activityId) ?? null
                        }
                        isSearchable
                        isClearable
                        isDisabled={segmentId === 0 || optionsActivity.length == 0 || isLoading}
                    />
                </div>
                <div className="h-20 w-full flex justitify-center items-center">
                    <h1 className="w-full text-2xl text-red-500 text-center">{error}</h1>
                </div>
                <button onClick={() => { handleSubmit() }} disabled={isLoading}
                    className="w-full bg-[#8173FF] p-2 text-[22px] 
                transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-[33px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        "Cadastrar"
                    )}
                </button>
            </div>
        </Modal>
    )
}