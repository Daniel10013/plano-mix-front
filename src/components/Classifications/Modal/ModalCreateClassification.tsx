"use client"

import Modal from "../../Layout/Modal/Modal";
import { Classification, Segment, Activity } from "@/src/types/Classifications/Classification";
import { useState, useEffect } from "react";
import Select from "react-select";
import { capitalizeWords } from "@/src/lib/utils";
import { createClassification } from "@/src/services/classification.service";
import { createSegment } from "@/src/services/classification.service";
import { createActivity } from "@/src/services/classification.service";
import { toast } from "react-toastify";

export default function ModalCreateClassification({ isOpen, onClose, classifications, segments, reloadClassification }: {
    isOpen: boolean,
    onClose: () => void,
    classifications: Classification[],
    segments: Segment[],
    reloadClassification: () => void
}) {
    const [error, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addType, setAddType] = useState<string>("");

    const [classification, setClassifications] = useState<{ value: number, label: string }[]>([]);
    const [segment, setSegment] = useState<{ value: number, label: string }[]>([]);
    // formulario
    const [name, setName] = useState<string>('');
    const [classificationId, setClassificationId] = useState<number>(0)
    const [segmentId, setSegmentId] = useState<number>(0)

    const optionsType = [
        { value: "CLASSIFICACAO", label: "Classificação" },
        { value: "SEGMENTO", label: "Segmento" },
        { value: "ATIVIDADE", label: "Atividade" },
    ];

    useEffect(() => {
        setClassifications(
            classifications.map(c => ({
                value: c.id,
                label: capitalizeWords(c.name)
            }))
        );
    }, [classifications]);

    useEffect(() => {
        setSegment(
            segments.map(c => ({
                value: c.id,
                label: capitalizeWords(c.name)
            }))
        );
    }, [segments]);

    const cleanForm = () => {
        setName('');
        setErrorMessage(" ");
        setClassificationId(0);
        setSegmentId(0);
        setClassificationId(0);
    }

    const handleSubmit = async () => {
        if (addType == "CLASSIFICACAO") {
            try {
                const result = await createClassification(name);
                if (result.status == true) {
                    toast.success(result.message);
                    onClose();
                    reloadClassification();
                    cleanForm();
                    return;
                }
            } catch (err: any) {
                setErrorMessage(err.message ?? 'Erro ao adicionar Classificação');
            }
        }
        if (addType == "SEGMENTO") {
            if (classificationId !== 0) {
                try {
                    const result = await createSegment(classificationId, name);
                    if (result.status == true) {
                        toast.success(result.message);
                        onClose();
                        reloadClassification();
                        cleanForm();
                        return;
                    }
                } catch (err: any) {
                    setErrorMessage(err.message ?? 'Erro ao adicionar Segmento');
                }
            }
        }
        if (addType == "ATIVIDADE") {
            if (segmentId !== 0) {
                try {
                    const result = await createActivity(segmentId, name);
                    if (result.status == true) {
                        toast.success(result.message);
                        onClose();
                        reloadClassification();
                        cleanForm();
                        return;
                    }
                } catch (err: any) {
                    setErrorMessage(err.message ?? 'Erro ao adicionar Atividade');
                }
            }
        }
    }

    return (
        <>
            <Modal title="Cadastro de Classificação" width={30} widthMobile={95} isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col w-full gap-4">
                    <h1 className="text-2xl">O que você deseja adicionar?</h1>
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
                        options={optionsType}
                        value={optionsType.find(o => o.value === addType) ?? null}
                        placeholder="O que você deseja adicionar?"
                        noOptionsMessage={() => "Nenhuma opção encontrada!"}
                        isClearable
                        isDisabled={isLoading}
                        onChange={(option) => {
                            setAddType(option == null ? "" : option.value);
                        }}
                    />
                </div>
                <div className="mt-6 h-80">
                    {addType === "CLASSIFICACAO" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl">Nome da Classificação:</label>
                            <input type="text" placeholder="Nome da Classificação" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                                className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                        </div>
                    )}

                    {addType === "SEGMENTO" && (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Escolha a Classificação deste segmento:</h1>
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
                                placeholder={"Selecione"}
                                options={classification}
                                onChange={(e) => setClassificationId(e ? e.value : 0)}
                                value={classificationId === 0
                                    ? null
                                    : classification.find(o => o.value === classificationId) ?? null}
                            />
                            <label className="text-2xl">Nome do segmento:</label>
                            <input type="text" placeholder="Nome do segmento" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                                className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />

                        </div>
                    )}

                    {addType === "ATIVIDADE" && (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl">Escolha o Segmento desta atividade:</h1>
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
                                placeholder={"Selecione"}
                                options={segment}
                                onChange={(e) => setSegmentId(e ? e.value : 0)}
                                value={segmentId === 0
                                    ? null
                                    : segment.find(o => o.value === segmentId) ?? null}
                            />
                            <label className="text-2xl">Nome da atividade:</label>
                            <input type="text" placeholder="Nome da atividade" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                                className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                        </div>
                    )}
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


            </Modal>
        </>
    )
}