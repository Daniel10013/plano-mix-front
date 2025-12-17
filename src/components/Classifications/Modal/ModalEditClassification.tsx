import Modal from "../../Layout/Modal/Modal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { editClassification } from "@/src/services/classification.service";
import { editSegment } from "@/src/services/classification.service";
import { editActivity } from "@/src/services/classification.service";

export default function ModalEditClassification({ isOpen, onClose, nameEdit, idEdit, editType, reloadClassification, fatherId }: {
    isOpen: boolean,
    onClose: () => void,
    nameEdit: string,
    idEdit: number
    editType: string,
    reloadClassification: () => void,
    fatherId: number
}) {

    const [error, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [addType, setAddType] = useState<string>("");

    const [name, setName] = useState<string>('');
    const [classificationId, setClassificationId] = useState<number>(0)
    const [segmentId, setSegmentId] = useState<number>(0)
    const [activityId, setaAtivityId] = useState<number>(0)
    const [fatherEditId, setFatherEditId] = useState<number>(0);


    useEffect(() => {
        if (isOpen) {
            setName(nameEdit);
            if (editType === "CLASSIFICACAO") {
                setClassificationId(idEdit)
            }
            else if (editType === "SEGMENTO") {
                setSegmentId(idEdit)
                setFatherEditId(fatherId);
            }
            else if (editType === "ATIVIDADE") {
                setaAtivityId(idEdit)
                setFatherEditId(fatherId);
            }
        }
    }, [isOpen, nameEdit]);

    const handleSubmit = async () => {
        try {
            let result;
            if (editType === "CLASSIFICACAO") {
                result = await editClassification(classificationId, name);
            }
            else if (editType === "SEGMENTO") {
                result = await editSegment(segmentId, name, fatherEditId );
            }
            else if (editType === "ATIVIDADE") {
                result = await editActivity(activityId, name, fatherEditId);
            }
            if (result?.status == true) {
                toast.success(result.message);
                onClose();
                reloadClassification();
                cleanForm();
                return;
            }
        } catch (err: any) {
            setErrorMessage(err.message ?? 'Erro ao atualizar');
        }
    }

    const cleanForm = () => {
        setName('');
        setErrorMessage(" ");
        setClassificationId(0);
        setSegmentId(0);
        setClassificationId(0);
    }
    return (
        <>
            <Modal title="Edição de Classificação" width={30} widthMobile={95} isOpen={isOpen} onClose={onClose}>
                <div className="mt-6 h-20">
                    {editType === "CLASSIFICACAO" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl">Nome da Classificação:</label>
                            <input type="text" placeholder="Nome da Classificação" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                                className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                        </div>
                    )}

                    {editType === "SEGMENTO" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl">Nome do Segmento:</label>
                            <input type="text" placeholder="Nome do Segmento" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
                                className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200" />
                        </div>

                    )}

                    {editType === "ATIVIDADE" && (
                        <div className="flex flex-col gap-2">
                            <label className="text-2xl">Nome da Atividade:</label>
                            <input type="text" placeholder="Nome da Atividade" value={name} onChange={(e) => { setName(e.target.value) }} disabled={isLoading}
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
                        "Editar"
                    )}
                </button>


            </Modal>
        </>
    )
}