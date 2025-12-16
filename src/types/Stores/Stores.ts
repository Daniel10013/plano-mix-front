export type Store = {
    id: number
    name: string,
    Classification_id: number,
    classification: string,
    segment_id: number,
    segment: string,
    activity_id?: number,
    activity?: string
}

export type ShoppingStores = {
    id: number,
    name: string,
    classification: string,
    segment: string,
    activity?: string,
    status: 'active' | 'deleted'
}