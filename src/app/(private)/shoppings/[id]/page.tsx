import { redirect } from "next/navigation";
import Details from "@/src/components/Shoppings/DetailsPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numberId = Number(id)
    if (!Number.isInteger(numberId) || numberId <= 0) {
        redirect("/shoppings");
    }


    return (
        <>
            <Details shoppingId={numberId} />
        </>
    )
}