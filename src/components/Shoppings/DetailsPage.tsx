'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getById } from "@/src/services/shopping.service";
import ShoppingStores from "@/src/components/Shoppings/ShoppingStores";
import ShoppingVisits from "@/src/components/Shoppings/ShoppingVisits";
import ShoppingDetails from "@/src/components/Shoppings/ShoppingDetails"

export default function Details({ shoppingId }: { shoppingId: number }) {

    const router = useRouter();

    useEffect(() => {
        const checkShoppingExists = async () => {
            try {
                await getById(Number(shoppingId) ?? 0);
            }
            catch (err: any) {
                if (err.status == 404) {
                    router.push('/shoppings');
                }
            }
        }

        checkShoppingExists();
    }, []);

    return (
        <div className="w-full py-3 px-4 mt-14 xl:mt-1  flex flex-col gap-8">
            <h1 className="w-full text-center xl:text-left text-3xl">Detalhes do Shopping</h1>
            <ShoppingDetails id={shoppingId} />
            <div className="flex flex-col xl:flex-row gap-10 xl:gap-0">
                <div className="w-full xl:w-1/2 flex flex-col gap-2 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl flex gap-2">
                        Listagem de Lojas
                    </h1>
                    <ShoppingStores id={shoppingId} />
                </div>
                <div className="h-[63vh] w-px hidden xl:block border border-px border-gray-200"></div>
                <div className="w-full xl:w-1/2 flex flex-col gap-2 p-3">
                    <h1 className="w-full text-center xl:text-left text-3xl">Visitas</h1>
                    <ShoppingVisits id={shoppingId} />
                </div>
            </div>
        </div>
    )
}