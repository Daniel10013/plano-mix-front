import CreateVisitForm from "@/src/components/Visits/CreateVisitForm"
import CreateVisitHeader from "@/src/components/Visits/CreateVisitHeader"

export default function CreateVisit () {
    return (
        <div className="flex flex-col gap-4 py-3 px-4 mt-16 xl:mt-4">
            <CreateVisitHeader />
            <CreateVisitForm />
        </div>
    )
}