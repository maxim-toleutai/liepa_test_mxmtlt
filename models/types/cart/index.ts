// for cart we need only product id and count
// group id only for faster retrieving in map
export interface CartItem {
  readonly groupId: string
  readonly productId: string
  readonly count: number
}

export interface CartItemsData {
  readonly [productId: string]: CartItem
}
