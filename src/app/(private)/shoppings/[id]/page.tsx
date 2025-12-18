import { redirect } from "next/navigation";
import Details from "@/src/components/Shoppings/DetailsPage";

export default function Page({ params }: { params: { id: string } }) {
    const numberId = Number(params.id);

    if (!Number.isInteger(numberId) || numberId <= 0) {
        redirect("/shoppings");
    }

    return (
        <>
            <Details shoppingId={numberId} />
        </>
    );
}