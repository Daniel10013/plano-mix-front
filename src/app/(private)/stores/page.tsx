import HeaderStore from "@/src/components/Stores/HeaderStore"
import ListStore from "@/src/components/Stores/ListStore"

export default function StorePage() {
    return (
        <>
            <div className=" w-full flex flex-col border p-4 gap-4">
                <HeaderStore />
                <ListStore />
            </div>
        </>
    )
}