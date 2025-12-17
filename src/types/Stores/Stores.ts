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
    id: number | null
    store_id: number,
    name: string,
    classification_id: number,
    classification: string,
    segment_id: number,
    segment: string,
    activity_id: number | null,
    activity: string | null,
    store_left_name: string | null,
    store_left_id: number | null,
    store_right_name: string | null,
    store_right_id: number | null,
    status: 'active' | 'deleted'
}

export type VisitStore = {
    id: number | null,
    store_id: number,
    shopping_id: number,
    store_id_right: number | null,
    store_id_left: number | null,
    status: 'active' | 'deleted',
    action: "new" | "update" | "delete" | "none"
}

export type VisitCompare = {
    name: string,
    classification: string,
    segment: string,
    activity: string | null,
    status: "active" | "deleted"
}