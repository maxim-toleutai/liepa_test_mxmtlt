export interface ProductNameData {
  readonly name: string
}

export interface ProductsNameData {
  readonly [id: string]: ProductNameData
}

export interface GroupsNameData {
  readonly name: string
  readonly productNames: ProductsNameData
}

export interface NamesData {
  readonly [id: string]: GroupsNameData
}
