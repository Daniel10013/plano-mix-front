import HeaderClassification from "@/src/components/Classifications/HeaderClassification";
import ListClassification from "@/src/components/Classifications/ListClassification";


export default function ClassificationPage() {
    return (
        <>
            <div className=" w-full flex flex-col p-4 gap-4">
                <HeaderClassification />
                <ListClassification/>
            </div>
        </>
    )
}