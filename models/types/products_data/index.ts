// data with namings
// generates by store

export interface NamedProduct extends Product {
  readonly name: string
}

export interface NamedProductsGroup {
  readonly id: string
  readonly name: string
  readonly products: NamedProduct[]
}

export type NamedProductsData = Readonly<NamedProductsGroup[]>

// --------------------------------------------------------------- //

// converted server data

export interface Product {
  readonly id: string
  readonly groupId: string
  readonly priceUsd: number
  readonly count: number
}

export interface ProductsGroup {
  readonly [productId: string]: Product
}

export interface ProductsData {
  readonly [groupId: string]: ProductsGroup
}
