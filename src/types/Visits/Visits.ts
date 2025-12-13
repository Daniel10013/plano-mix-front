export type Visit = {
    id: number,
    shopping_name: string,
    observation: string
    username: string,
    date: string
}

export type VisitCompare = {
    date: string,
    stores:  {
        name: string,
        classification: string,
        segment: string,
        activity?: string
    }[]
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
    }[]
}