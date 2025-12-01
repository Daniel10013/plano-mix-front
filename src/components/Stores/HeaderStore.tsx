import Image from "next/image"

export default function HeaderStore() {
    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full flex">
                    <div className="mt-12 xl:w-[65%] w-full flex flex-col xl:items-start gap-8">
                        <h1 className="text-4xl">Lojas cadastradas</h1>
                        <p className=" text-2xl text-gray-500 text-center w-full xl:w-[70%] xl:text-left">Essa tela é para o cadastro de lojas geral, ou seja, as lojas cadastradas aqui, serão para serem usadas ao adicionar lojas para os shoppings!
                            <br></br>
                            <br></br>
                            Além disso, aqui você pode ver as lojas cadastradas, e alterar suas informações!</p>
                    </div>
                    <div className="w-[45%] xl:flex justify-start hidden ml-8">
                    <Image
                        src="/stores/store-header.svg"
                        alt="Imagem Store"
                        width={400} height={400}/>
                    </div>
                </div>
            </div>
        </>
    )
}