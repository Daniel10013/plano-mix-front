export type Store = {
    id: number
    name: string,
    classification_id: number,
    classification: string,
    segment_id: number,
    segment: string,
    activity_id: number | null,
    activity: string | null
}

export type StoreCreate = Omit<Store, 'id' | 'classification' | 'segment' | 'activity'>
export type StoreUpdate = Omit<Store, 'classification' | 'segment' | 'activity'>

export type ShoppingStores = {
    id: number,
    name: string,
    classification: string,
    segment: string,
    activity?: string,
    status: 'active' | 'deleted'
}