'use client';

import z from 'zod';
import { useState } from "react";
import Modal from "../../Layout/Modal/Modal"
import { cepIsValid, createShopping } from '@/src/services/shopping.service';
import { toast } from 'react-toastify';


export default function ModalCreateShopping({isOpen, onClose, reloadShoppings}: {isOpen :boolean, onClose: () => void, reloadShoppings: () => void}) {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // inputs
    const [name, setName] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [zipNumber, setZipNumber] = useState<string>('');
    const [observation, setObservation] = useState<string>('');


    const shoppingSchema = z.object({
        name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
        zipCode: z.string('CEP inválido').min(7, 'CEP deve ter 7 digitos').regex(/^\d+$/, "Digite apenas números para o CEP"),
        zipNumber: z.string().min(1, 'Número obrigatório').regex(/^\d+$/, "Número inválido!"),
        observation: z.string().max(500, 'Observação muito longa').optional(),
    });

    const handleSubmit = async () => {
        const result = shoppingSchema.safeParse({ name, zipCode, zipNumber, observation });

        if (!result.success) {
            setErrorMessage(result.error?.issues[0].message);
            return;
        }

        const zipCodeIsValid = await cepIsValid(zipCode);
        if(zipCodeIsValid == false){
            setErrorMessage('O CEP deve ser válido e existente!');
            return;
        }

        try {
            setIsLoading(true);
            const result = await createShopping({
                name: name,
                zip_code: Number(zipCode),
                zip_number: Number(zipNumber),
                observation: observation
            });
            
            if(result.status == true){
                toast.success(result.message);
                onClose();
                reloadShoppings();
                cleanForm();
                return;
            }

            setErrorMessage(result.message);

        }
        catch(err: any) {
            setErrorMessage(err.mesage ?? 'Erro ao cadastrar shopping!');
        }
        finally {
            setIsLoading(false);
        }
    }

    const cleanForm = () => {
        setErrorMessage('');
        setIsLoading(false);
        setName('');
        setZipCode('');
        setZipNumber('');
        setObservation('');
    }

    return (
        <Modal title="Cadastro de Shopping" isOpen={isOpen} onClose={onClose} widthMobile={95} width={30}>
            <div className="flex flex-col w-full gap-3">
                <div>
                    <label className="text-[#535353] text-[20px]">Nome:</label>
                    <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                </div>
                <div className="flex gap-2 justify-between">
                    <div className="w-[60%]">
                        <label className="text-[#535353] text-[20px]">CEP:</label>
                        <input onChange={(e)=>{setZipCode(e.target.value)}} value={zipCode} type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                    </div>
                    <div className="w-[30%]">
                        <label className="text-[#535353] text-[20px]">Número:</label>
                        <input onChange={(e)=>{setZipNumber(e.target.value)}} value={zipNumber}type="text" className="w-full p-2 text-[20px] border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200"/>
                    </div>
                </div>
                <div>
                    <label className="text-[#535353] text-[20px]">Observação:</label>
                    <textarea onChange={(e)=>{setObservation(e.target.value)}} value={observation} className="w-full text-[20px] h-[200px] p-2 border-gray-300 border rounded-[10px] outline-none focus-within:border-[#8173FF] transition-all duration-200 resize-none"/>
                </div>
                <div className="w-full h-10">
                    <h1 className="text-2xl text-red-500 text-center w-full">{errorMessage}</h1>
                </div>
                <button onClick={()=>{handleSubmit()}} disabled={isLoading}
                className="w-full bg-[#8173FF] p-2 text-[22px] 
                transition-all duration-200 cursor-pointer hover:bg-[#6050f5] rounded-[10px] text-white">
                    {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-[33px] border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Salvar"
                            )}
                </button>
            </div>
        </Modal>
    )  
}