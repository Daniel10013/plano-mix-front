"use client";

import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useSearchParams, useRouter } from "next/navigation";
import { changePassword } from '@/src/services/user.service';

export default function ForgotPassword() {

    const router = useRouter();
    const params = useSearchParams();

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const token = params.get("token");
        if (!token) {
            router.push('/login');
        }
    })

    const handleSubmit = async () => {
        if (newPassword == '' || confirmPassword == '') {
            setErrorMessage('As senhas não podem ser vazias!');
            return;
        }

        if (validatePass(newPassword) == false) {
            setErrorMessage('A senha não tem os requisitos necessários!');
            return;
        }

        if (newPassword != confirmPassword) {
            setErrorMessage('A senha não tem os requisitos necessários!');
            return;
        }

        setErrorMessage('');
        try {
            setIsLoading(true)
            const token = params.get('token')!;
            const { status, message } = await changePassword(token, newPassword, confirmPassword);
            if (status == true) {
                Swal.fire({
                    icon: 'success', title: 'Senha trocada com sucesso!',
                    html: message + '<br>Favor efetuar o login novamente!', confirmButtonColor: '#8173ff',
                }).then(()=>{
                    router.push('/login');
                })
                return;
            }

            if (status == false) {
                setErrorMessage(message);
                return;
            }
        }
        catch (err: any) {
            console.log(err);
            setErrorMessage(err?.message || "Erro ao trocar a senha!");
        } finally {
            setIsLoading(false)
        }
    }

    const validatePass = (pass: string): boolean => {
        return (
            pass.length >= 8 &&
            /[a-z]/.test(pass) &&
            /[A-Z]/.test(pass) &&
            /[0-9]/.test(pass) &&
            /[^A-Za-z0-9]/.test(pass)
        );
    }

    return (
        <main className="h-screen flex flex-col">
            <div className="bg-[#8173FF] h-[28%] w-full"></div>
            <div className="bg-white flex-1 w-full"></div>
            <div className="w-full h-screen absolute top-0 flex items-center justify-center">
                <div className="bg-white xl:border xl:border-solid border-[#dadada] w-[95%] xl:w-[55%] h-170 xl:h-160 p-3 xl:py-6 xl:px-20 rounded-2xl flex flex-col items-center justify-center xl:justify-start gap-1">
                    <h1 className="w-full text-center text-7xl">MIX</h1>
                    <h3 className="w-full text-2xl">Digite sua nova senha!</h3>
                    <small className="w-full text-[20px] text-[#7C7C7C]">
                        Crie a nova senha da sua conta! Lembre-se de usar uma senha forte e diferente das outras que você já usa!
                    </small>
                    <small className="w-full text-[20px] text-[#7C7C7C]">
                        Sua senha deve conter:
                        <ul className="text-gray-500 list-disc pl-5 space-y-1">
                            <li>Letras maiúsculas e minúsculas</li>
                            <li>Símbolos e números</li>
                            <li>No mínimo 8 caracteres</li>
                        </ul>
                    </small>
                    <div className='w-full h-14 mt-3 mb-3 flex justify-center items-center px-7'>
                        <span className='text-[20px]  text-red-600'>
                            {errorMessage}
                        </span>
                    </div>
                    <div className='flex flex-col  items-center justify-center gap-5 w-full xl:w-[75%]'>
                        <div className="flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 w-full focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                            <LockClosedIcon className="h-8 w-8 text-[#a9b1bf]" />
                            <input type="text" onChange={(e) => { setNewPassword(e.target.value) }} value={newPassword} placeholder="Digite a nova senha" className="outline-none text-[20px] text-gray-700 placeholder-[#a9b1bf]" />
                        </div>
                        <div className="flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 w-full focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                            <LockClosedIcon className="h-8 w-8 text-[#a9b1bf]" />
                            <input type="text" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} placeholder="Confirme a nova senha" className="outline-none text-[20px] text-gray-700 placeholder-[#a9b1bf]" />
                        </div>
                        <button onClick={handleSubmit} disabled={isLoading}
                            className={`py-2 px-1 text-white bg-[#8173FF] text-2xl rounded-[10px] w-full 
                        ${isLoading ? 'bg-[#a99fff]' : 'cursor-pointer hover:bg-[#685ae6]'} transition-all duration-200 `}>
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Definir nova senha"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}