import HeaderUser from "./HeaderUser";
import ListUser from "./ListUser";


export default function PageUser() {

    return (
        <>
        <div className="w-full mt-16 py-3 px-4 flex flex-col gap-3">
            <HeaderUser/>
            <ListUser/>
        </div>
        </>
    )
}
