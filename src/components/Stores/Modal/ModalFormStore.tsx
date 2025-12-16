'use client';

import z from 'zod';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Modal from '../../Layout/Modal/Modal';
import { capitalizeWords } from '@/src/lib/utils';
import { createStore, getById, updateStore } from '@/src/services/store.service';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    reloadStores: () => void;
    storeId?: number;
    classifications: { id: number; name: string }[];
    segments: { id: number; name: string; classification_id: number }[];
    activity: { id: number; name: string; segment_id: number }[];
};

export default function ModalFormStore({
    isOpen,
    onClose,
    reloadStores,
    storeId,
    classifications,
    segments,
    activity,
}: Props) {
    const isEdit = !!storeId && storeId != 0;

    const [error, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(isEdit);

    const [optionsClassification, setOptionsClassification] = useState<any[]>([]);
    const [optionsSegment, setOptionsSegment] = useState<any[]>([]);
    const [optionsActivity, setOptionsActivity] = useState<any[]>([]);

    const [name, setName] = useState('');
    const [classificationId, setClassificationId] = useState(0);
    const [segmentId, setSegmentId] = useState(0);
    const [activityId, setActivityId] = useState(0);

    useEffect(() => {
        if (!isEdit || !storeId) return;

        const load = async () => {
            try {
                const data = await getById(storeId);
                setName(data.name);
                setClassificationId(data.classification_id);
                setSegmentId(data.segment_id);
                setActivityId(data.activity_id ?? 0);
            } catch (err: any) {
                toast.error(err.message);
                onClose();
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [storeId, isEdit, isOpen]);

    useEffect(() => {
        setOptionsClassification(
            classifications.map(c => ({
                value: c.id,
                label: capitalizeWords(c.name),
            }))
        );
    }, [classifications]);

    useEffect(() => {
        if (classificationId === 0) {
            setOptionsSegment([]);
            setSegmentId(0);
            return;
        }

        setOptionsSegment(
            segments
                .filter(s => s.classification_id === classificationId)
                .map(s => ({
                    value: s.id,
                    label: capitalizeWords(s.name),
                }))
        );
    }, [classificationId, segments]);

    useEffect(() => {
        if (segmentId === 0) {
            setOptionsActivity([]);
            setActivityId(0);
            return;
        }

        setOptionsActivity(
            activity
                .filter(a => a.segment_id === segmentId)
                .map(a => ({
                    value: a.id,
                    label: capitalizeWords(a.name),
                }))
        );
    }, [segmentId, activity]);

    const handleClassification = (id: number) => {
        setClassificationId(id);
        setSegmentId(0);
        setActivityId(0);
    };

    const handleSegment = (id: number) => {
        setSegmentId(id);
        setActivityId(0);
    };

    const getPlaceholderActivity = () => {
        if (optionsActivity.length === 0 && segmentId !== 0) return 'Nenhuma atividade para o segmento';
        return segmentId === 0 ? 'Selecione um segmento primeiro' : 'Atividade';
    };

    const storeObject = z.object({
        name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres!'),
        classificationId: z.number().min(1, 'Selecione uma classificação!'),
        segmentId: z.number().min(1, 'Selecione um segmento!'),
        activityId: z.number().optional()
    });

    const handleSubmit = async () => {
        const parsed = storeObject.safeParse({ name, classificationId, segmentId, activityId });
        if (!parsed.success) {
            setErrorMessage(parsed.error.issues[0].message);
            return;
        }

        setErrorMessage('');
        setIsLoading(true);

        try {
            const payload = {
                name,
                classification_id: classificationId,
                segment_id: segmentId,
                activity_id: activityId === 0 ? null : activityId,
            };

            const ok = isEdit
                ? await updateStore(storeId!, payload)
                : await createStore(payload);

            if (ok) {
                onClose();
                reloadStores();
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: isEdit ? 'Loja alterada com sucesso!' : 'Loja cadastrada com sucesso!',
                });
                clearForm();
            }
        } catch (err: any) {
            setErrorMessage(err.message ?? 'Erro ao salvar loja');
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setName('');
        setClassificationId(0);
        setSegmentId(0);
        setClassificationId(0);
    }

    return (
        <Modal
            title={isEdit ? 'Editar Loja' : 'Cadastro de Loja'}
            width={30}
            widthMobile={95}
            isOpen={isOpen}
            onClose={onClose}
        >
            {isLoading && isEdit ?
                (
                    <>
                        <>
                            <div className="flex flex-col w-full gap-4">
                                <div>
                                    <label className="text-[#535353] text-[20px]">Nome:</label>
                                    <input type="text" disabled={isLoading}
                                        className="skeleton-small w-full p-2 text-[20px] border-gray-300 rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                                </div>
                                <div>
                                    <label className="text-[#535353] text-[20px]">Classificação:</label>
                                    <input type="text" disabled={isLoading}
                                        className="skeleton-small w-full p-2 text-[20px] border-gray-300 rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                                </div>
                                <div>
                                    <label className="text-[#535353] text-[20px]">Segmento:</label>
                                    <input type="text" disabled={isLoading}
                                        className="skeleton-small w-full p-2 text-[20px] border-gray-300 rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                                </div>
                                <div>
                                    <label className="text-[#535353] text-[20px]">Atividade:</label>
                                    <input type="text" disabled={isLoading}
                                        className="skeleton-small w-full p-2 text-[20px] border-gray-300 rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />

                                </div>
                                <div className="h-20 w-full flex justitify-center items-center">
                                    <h1 className="w-full text-2xl text-red-500 text-center">{error}</h1>
                                </div>
                                <button disabled={isLoading} className="w-full bg-[#a9a2e9] p-2 text-[22px] rounded-[10px] text-white">
                                    Carregando...
                                </button>
                            </div>
                        </>
                    </>
                )
                :
                (
                    <>
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
                                ) :
                                    isEdit ? 'Salvar Alterações' : 'Cadastrar'
                                }
                            </button>
                        </div>
                    </>
                )

            }

            {/* <div className="flex flex-col gap-4">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nome da loja"
                    disabled={isLoading}
                    className="p-2 border rounded"
                />

                <Select
                    value={optionsClassification.find(o => o.value === classificationId) ?? null}
                    options={optionsClassification}
                    onChange={v => handleClassification(v?.value ?? 0)}
                    placeholder="Classificação"
                    isClearable
                />

                <Select
                    value={optionsSegment.find(o => o.value === segmentId) ?? null}
                    options={optionsSegment}
                    onChange={v => handleSegment(v?.value ?? 0)}
                    placeholder={classificationId === 0 ? 'Selecione classificação' : 'Segmento'}
                    isDisabled={classificationId === 0}
                    isClearable
                />

                <Select
                    value={optionsActivity.find(o => o.value === activityId) ?? null}
                    options={optionsActivity}
                    onChange={v => setActivityId(v?.value ?? 0)}
                    placeholder={getPlaceholderActivity()}
                    isDisabled={segmentId === 0 || optionsActivity.length === 0}
                    isClearable
                />

                <p className="text-red-500 text-center">{error}</p>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#8173FF] text-white p-2 rounded"
                >
                    {isEdit ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
            </div> */}
        </Modal>
    );
}
