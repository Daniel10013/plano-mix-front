"use client";

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { auth } from '@/src/services/auth.service';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'

export default function LoginPage() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const showToast = sessionStorage.getItem("showLogoutToast");
        if (showToast) {
            toast.warning('Sessão encerrada! Faça login novamente');
            sessionStorage.removeItem('showLogoutToast');
            return;
        }
    })

    const handleLogin = async () => {
        if (email == '' || password == '') {
            setErrorMessage('Preencha todos os campos corretamente!');
            return;
        }

        if (email.includes('@') == false || email.includes('.') == false) {
            setErrorMessage('E-mail inválido!');
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage("");

            const { status, message } = await auth(email, password);
            if (status == false) {
                setErrorMessage(message);
                return;
            }

            router.push('/home');
        }
        catch (err: any) {
            setErrorMessage(err?.message || "Erro ao fazer login");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex items-center justify-center h-screen xl:bg-[#8173ff33]">
            <div className="bg-white w-full xl:w-[55%] h-160 flex rounded-2xl">
                <div className="h-full w-full xl:w-[50%]  flex flex-col items-center justify-between pt-20 pb-2 py-2 px-2">
                    <div className='text-center'>
                        <h1 className='text-7xl'>MIX</h1>
                        <h3 className='text-2xl'>Faça login para continuar</h3>
                    </div>
                    <div className='w-full h-13 flex justify-center items-center px-7'>
                        <span className='text-[20px]  text-red-600'>
                            {errorMessage}
                        </span>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <div className="w-full xl:w-[85%] flex flex-col gap-10">
                            <div className="flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                                <EnvelopeIcon className="h-9 w-9 text-[#a9b1bf]" />
                                <input type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="E-mail" className="w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-[10px] border border-gray-300 focus-within:border-[#8173FF] transition-all duration-200 px-2 py-2">
                                <LockClosedIcon className="h-9 w-9 text-[#a9b1bf]" />
                                <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Senha" className=" w-[80%] outline-none text-2xl text-gray-700 placeholder-[#a9b1bf]" />
                            </div>
                        </div>
                        <button onClick={handleLogin} disabled={isLoading}
                            className={`p-3 mt-10 text-white bg-[#8173FF] text-3xl rounded-[10px] w-1/2 
                                ${isLoading ? 'bg-[#a99fff]' : 'cursor-pointer hover:bg-[#685ae6]'} transition-all duration-200 `}>
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-9 h-9 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <Link href="/forgot-password" className='mt-18 cursor-pointer underline text-[#8173FF] transition-all duration-200 hover:opacity-60'>Esqueceu sua senha?</Link>
                    </div>
                </div>
                <div className="bg-[#8173FF] w-[50%] rounded-tr-2xl rounded-br-2xl flex-col items-center justify-center hidden xl:flex">
                    <h1 className='text-7xl w-1/2 text-center'>Bem vindo!</h1>
                    <Image
                        src='/login/login.svg'
                        width={350} height={350}
                        alt='Autenticacao'
                    />
                </div>
            </div>
        </main>
    )
}