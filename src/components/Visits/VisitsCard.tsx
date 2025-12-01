import Link from "next/link";
import type { Visit } from "@/src/types/Visits/Visits";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function VisitsCard({ visitObj, isHome }: { visitObj: Visit, isHome: boolean }) {
    const showDetails = (id: number) =>{
        console.log(id);
    }

    return (
        <>

            {isHome == true ?
                (
                    <Link href={'/visit/' + visitObj.id}
                        className={`
                flex gap-4 flex-col border border-[#C2C2C2] p-4 rounded-[10px] h-[250px] xl:h-[220] bg-white  
                w-full xl:w-1/3
                transition-transform duration-200 cursor-pointer  hover:border-[#707070]
            `}
                    >
                        <div className='flex w-full justify-center xl:justify-between item-center'>
                            <div className="flex w-[80%]  xl:justify-start gap-1">
                                <MapPinIcon height={28} width={28} />
                                <h1 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap">{visitObj.shopping_name}</h1>
                            </div>
                            <div className="h-full flex items-center justify-center">
                                {visitObj.date}
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-ellipsis whitespace h-[150px] xl:h-[120px]">
                            <p className="text-[20px]">{visitObj.description}</p>
                        </div>
                    </Link>
                )
                :
                (
                    <div onClick={() =>{showDetails(visitObj.id)}}
                        className={`
                            flex gap-4 flex-col border border-[#C2C2C2] p-4 rounded-[10px] h-[250px] xl:h-[220] bg-white  
                            w-full xl:w-full cursor-pointer
                            transition-transform duration-200 hover:border-[#707070]
                        `}
                    >
                        <div className='flex w-full justify-center xl:justify-between item-center'>
                            <div className="flex w-[80%]  xl:justify-start gap-1">
                                <MapPinIcon height={28} width={28} />
                                <h1 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap">{visitObj.shopping_name}</h1>
                            </div>
                            <div className="h-full flex items-center justify-center">
                                {visitObj.date}
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-ellipsis whitespace h-[150px] xl:h-[120px]">
                            <p className="text-[20px]">{visitObj.description}</p>
                        </div>
                    </div>
                )
            }

        </>

    )
}