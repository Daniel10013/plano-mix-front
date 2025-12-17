import { VisitStore } from "../Stores/Stores"

export type Visit = {
    id: number,
    shopping_name: string,
    shopping_id: number,
    observation: string
    username: string,
    date: string
}

export type VisitDetails = {
    id: string,
    observation: string
    username: string,
    date: string,
    stores:  {
        name: string,
        classification: string,
        segment: string,
        activity?: string
        status: 'active' | 'deleted'
    }[]
}

export type VisitCreate = {
    observation: string,
    shopping_id: number,
    shopping_stores: VisitStore[]
}
