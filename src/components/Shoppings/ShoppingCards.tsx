import Link from "next/link";
import type { ShoppingCard } from "@/src/types/Shoppings/Shoppings";
import { BuildingOfficeIcon, MapPinIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";


export default function ShoppingCard ({shoppingObj, isHome}: {shoppingObj: ShoppingCard, isHome: boolean}) {
    return (
        <Link href={'/shopping/' + shoppingObj.id} 
            className={`
                flex gap-4 flex-col border border-[#C2C2C2] p-4 rounded-[10px] h-[330px] xl:h-[280] bg-white  
                w-[90%] ${isHome ? 'xl:w-1/4' : 'xl:w-1/3'}
                transition-transform duration-200 hover:translate-y-1 hover:border-[#595959]
            `}
        >
            <div className={'flex w-full'}>
                <div className="flex w-full justify-center xl:justify-start gap-4">
                    <BuildingOfficeIcon  height={28} width={28}/>
                    <h1 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap">{shoppingObj.name}</h1>
                </div>
                <div className="hidden">
                </div>
            </div>
            <div className="w-full overflow-hidden text-ellipsis whitespace h-[150px] xl:h-[120px]">
                <p className="text-[20px]">{shoppingObj.description}</p>
            </div>
            <div className="w-full flex gap-2 overflow-hidden text-ellipsis whitespace h-20 xl:h-[55px] text-gray-600">
                <div className="h-full flex items-start">
                    <MapPinIcon  height={28} width={28}/>
                </div>
                <p className="text-[18px]">{shoppingObj.address}, {shoppingObj.cep}</p>
            </div>
        </Link>
    )
}