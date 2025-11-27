import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
    return (
        <main className="w-full h-screen flex justify-center items-center flex-col">
            <Image src='/404/error-animate.svg' alt="Erro 404" height={500} width={500} />
            <h1 className="text-4xl">Oops! Página não encontrada!</h1>
            <Link href='/home' className="bg-[#8173FF] rounded-[10px] w-[25%] mt-10 text-center p-2 text-[20px] text-white">
                Voltar para a home
            </Link>
        </main>
    )
}