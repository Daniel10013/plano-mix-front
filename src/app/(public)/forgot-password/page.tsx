"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react'
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { sendResetEmail } from '@/src/services/user.service';
import Swal from 'sweetalert2';

export default function ResetPassword() {

    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async () => {
        if (email == '') {
            setErrorMessage('O email não pode ser vazio!');
            return;
        }

        if (email.includes('@') == false || email.includes('.') == false) {
            setErrorMessage('E-mail inválido!');
            return;
        }
        setErrorMessage('');

        try {
            setIsLoading(true);
            const { status, message } = await sendResetEmail(email);

            if(status == true){
                Swal.fire({
                    icon: 'success', title: 'Confira seu e-mail!',
                    text: message, confirmButtonColor: '#8173ff'
                })
                setEmail('');
                return;
            }

            if(status == false){
                setErrorMessage(message);
                return;
            }
        }
        catch (err: any) {
            setErrorMessage(err?.message || "Erro ao enviar email!");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="h-screen flex flex-col">
            <div className="bg-[#8173FF] h-[28%] w-full"></div>
            <div className="bg-white flex-1 w-full"></div>
            <div className="w-full h-screen absolute top-0 flex items-center justify-center">
                <div className="bg-white border border-solid border-[#dadada] w-[91%] xl:w-[55%] h-160 p-10 rounded-2xl flex flex-col items-center justify-center xl:justify-start  gap-3">
                    <h1 className="w-full text-center text-7xl">MIX</h1>
                    <h3 className="w-full text-2xl">Esqueçeu sua senha?</h3>
                    <small className="w-full text-[20px] text-[#7C7C7C]">
                        Digite o email da sua conta que enviaramos um link para redefinição da senha!
                    </small>
                    <div className='w-full h-14 mt-3 mb-3 flex justify-center items-center px-7'>
                        <span className='text-[20px]  text-red-600'>
                            {errorMessage}
                        </span>
                    </div>
                    <div className='flex w-full h-full'>
                        <div className='flex flex-col  items-center justify-center gap-5 w-full xl:w-[55%]'>
                            <div className="flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 w-full focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                                <EnvelopeIcon className="h-8 w-8 text-[#a9b1bf]" />
                                <input type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="E-mail" className="outline-none text-[20px] text-gray-700 placeholder-[#a9b1bf]" />
                            </div>
                            <button onClick={handleSubmit} disabled={isLoading}
                                className={`
                                py-2 px-1 text-white bg-[#8173FF] text-2xl rounded-[10px] w-full 
                                ${isLoading ? 'bg-[#a99fff]' : 'cursor-pointer hover:bg-[#685ae6]'} transition-all duration-200 `}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    "Enviar link de recuperação"
                                )}
                            </button>
                            <Link href="/login" className='mt-2 w-full text-center cursor-pointer underline text-[#8173FF] transition-all duration-200 hover:opacity-60'>
                                Fazer login
                            </Link>
                        </div>
                        <div className='hidden xl:flex xl:w-[45%] items-center justify-center'>
                            <Image src='./login/forgot-password.svg' width={320} height={320} alt='Esqueci a senha' />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}