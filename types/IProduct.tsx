export type IProduct = {
    product_id: string,
    detail: string,
    quantity: number,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    design_id: number,
    fabric_id: number,
    created_at: number
    created_by: number,
}