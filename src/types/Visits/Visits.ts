export type Visit = {
    id: number,
    shopping_name: string,
    description: string
    user: string,
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