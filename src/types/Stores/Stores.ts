export type ShoppingStores = {
    id: number,
    name: string,
    classification: string,
    segment: string,
    activity?: string,
    status: 'active' | 'deleted'
}