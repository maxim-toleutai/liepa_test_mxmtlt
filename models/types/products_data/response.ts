// server response description

export interface ProductResponse {
  readonly G: number // group name id (number)
  readonly T: number // product name id (number)
  readonly C: number // price
  readonly P: number // product count
}

export interface ProductsDataResponse {
  // don't need this data: commented for proper IDE autocomplete
  // readonly Error: string
  // readonly Id: number
  // readonly Success: boolean
  readonly Value: {
    readonly Goods: ProductResponse[]
  }
}
