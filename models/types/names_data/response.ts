// server response description

export interface ProductNameDataResponse {
  readonly N: string // name
}

export interface ProductNamesDataResponse {
  readonly [productId: string]: ProductNameDataResponse
}

export interface GroupNamesDataResponse {
  readonly G: string // group name
  readonly B: ProductNamesDataResponse
}

export interface NamesDataResponse {
  readonly [groupId: string]: GroupNamesDataResponse
}
