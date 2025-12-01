import Image from "next/image"

export default function HeaderClassification() {
    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full flex">
                    <div className="mt-12 xl:w-[65%] w-full flex flex-col xl:items-start gap-8">
                        <h1 className="text-4xl text-center">Classificações</h1>
                        <p className="text-2xl text-gray-500 w-[70%]">Aqui você pode controlar as classificações disponiveis, para sem usadas na hora de cadastrar as lojas para os shoppings!
                            <br></br>
                            <br></br>
                            Assim você mantém a organização, e o controle dos tipos de lojas que cada shopping possui!</p>
                    </div>
                    <div className="w-[45%] xl:flex justify-start hidden ml-8">
                        <Image
                            src="/classification/classification-header.svg"
                            alt="Imagem Classification"
                            width={350} height={350} />
                    </div>
                </div>
            </div>
        </>
    )
}