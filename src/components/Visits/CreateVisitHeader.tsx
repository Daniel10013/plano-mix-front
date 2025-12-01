import Image from "next/image"

export default function CreateVisitHeader() {
    return (
        <div className="flex flex-col gap-4 xl:flex-row">
            <div className="flex flex-col gap-2 xl:w-[65%]">
                <h1 className="text-4xl w-full text-center xl:text-left mb-4 xl:mb-1">Cadastro de Visitas</h1>
                <p className="w-full text-[26px] xl:w-[80%] text-gray-500 flex flex-col gap-4">
                    <span>
                        Aqui será realizado o cadastro de visitas, ou seja, será feita a relação de lojas por shopping!
                    </span>
                    <span>
                        Lembre-se de adicionar todas as lojas que o shopping possui, com suas informações corretas, lojas, andares, lojas ao lado, etc.
                    </span>
                    <span>
                        Caso algo aconteça durante a visita, ou você perca a conexão, fique tranquilo, nós salvamos os dados localmente para garantir que nada seja perdido!
                    </span>
                </p>
            </div>
            <div className="hidden xl:flex items-center justify-center xl:w-[40%]">
                <Image src={'/visits/visit-create.svg'} alt="procurando lojas" height={400} width={400} />
            </div>
        </div>
    )
}