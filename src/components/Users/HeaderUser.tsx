import { PlusIcon } from "lucide-react"

export default function HeaderUser () {
    return(
        <>
            <div className="w-full p-4 ">
                <div className="flex justify-between">
                <h1 className="text-3xl flex items-center">Listagem de Usuários</h1>
                <button className=" p-2 w-[13%] xl:w-[21%] bg-[#8173FF] text-white flex items-center justify-center xl:gap-2 rounded-[10px] 
                transition-all duration-200 hover:bg-[#4f3fdd] cursor-pointer">
                        <span className="hidden xl:block text-2xl">Adicionar Usuário</span><PlusIcon />
                    </button>
                </div>
            </div>
        </>
    )
}