'use client';

import Link from "next/link";
import type { Shopping } from "@/src/types/Shoppings/Shoppings";
import { BuildingOfficeIcon, MapPinIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";


export default function ShoppingCard({ shoppingObj, isHome, reloadCards }: {
    shoppingObj: Shopping, isHome: boolean, reloadCards?: () => void
}) {

    const handleEdit = async (id: number) => {
        console.log('Editar id: ' + id)
    }

    const handleDelete = async (id: number) => {
        console.log('Apagar id: ' + id)
    }

    return (
        <Link href={'/shoppings/' + shoppingObj.id}
            className={`
                flex gap-4 flex-col border border-[#C2C2C2] p-4 rounded-[10px]  ${isHome ? 'h-[330px]' : 'h-[380px]'} xl:h-[280] bg-white  
                w-full ${isHome ? 'xl:w-1/4' : 'xl:w-full'}
                transition-all duration-200 hover:border-[#595959]
            `}
        >
            <div className={'flex w-full'}>
                <div className="flex w-full xl:w-[80%] justify-center xl:justify-start gap-4">
                    <BuildingOfficeIcon height={30} width={30} />
                    <h1 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap">{shoppingObj.name}</h1>
                </div>
                {!isHome ? (
                    <>
                        <div className="hidden xl:w-[20%] xl:flex items-center justify-between z-10">
                            <PencilSquareIcon width={30} className="text-blue-500 transition-all duration-200 cursor-pointer hover:text-blue-800"
                                onClick={(e) => { e.preventDefault(); handleEdit(shoppingObj.id) }}
                            />
                            <TrashIcon width={30} className="text-red-500 transition-all duration-200 cursor-pointer hover:text-red-800"
                                onClick={(e) => { e.preventDefault(); handleDelete(shoppingObj.id) }}
                            />
                        </div>
                    </>) : (<></>)}
            </div>
            <div className="w-full overflow-hidden text-ellipsis whitespace h-[150px] xl:h-[120px]">
                <p className="text-[20px]">{shoppingObj.description}</p>
            </div>
            <div className="w-full flex gap-2 overflow-hidden text-ellipsis whitespace h-20 xl:h-[55px] text-gray-600">
                <div className="h-full flex items-start">
                    <MapPinIcon height={28} width={28} />
                </div>
                <p className="text-[18px]">{shoppingObj.address}</p>
            </div>
            <div>
                {!isHome ? (
                    <>
                        <div className="flex w-full xl:hidden items-center justify-around z-10">
                            <span className="
                                flex gap-2 p-3 border border-blue-500 items-center text-blue-500 transition-all duration-200 cursor-pointer rounded-[10px]
                                hover:bg-blue-500 hover:text-white
                            ">
                                Editar
                                <PencilSquareIcon width={30}
                                    onClick={(e) => { e.preventDefault(); handleEdit(shoppingObj.id) }}
                                />
                            </span>

                            <span className="
                                flex gap-2 p-3 border border-red-500 items-center text-red-500 transition-all duration-200 cursor-pointer rounded-[10px]
                                hover:bg-red-500 hover:text-white
                            ">
                                Apagar
                                <TrashIcon width={30} 
                                    onClick={(e) => { e.preventDefault(); handleDelete(shoppingObj.id) }}
                                />
                            </span>
                        </div>
                    </>) : (<></>)}
            </div>
        </Link>
    )
}