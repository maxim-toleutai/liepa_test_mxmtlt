import {
  GroupNamesDataResponse,
  NamesDataResponse,
  ProductNameDataResponse,
  ProductNamesDataResponse
} from '../types/names_data/response'
import { NamesData, ProductsNameData } from '../types/names_data'
import { Mutable } from '~/utils/mutable'

export class NamesDataTransformer {
  static fetch(response: NamesDataResponse): NamesData {
    const namesData: Mutable<NamesData> = {}

    Object.keys(response).forEach((groupId) => {
      const group: GroupNamesDataResponse = response[groupId]

      namesData[groupId] = {
        name: group.G,
        productNames: this._fetchProducts(group.B)
      }
    })

    return namesData as NamesData
  }

  private static _fetchProducts(
    productNamesDataResponse: ProductNamesDataResponse
  ): ProductsNameData {
    const productNames: Mutable<ProductsNameData> = {}

    Object.keys(productNamesDataResponse).forEach((productId) => {
      const product: ProductNameDataResponse =
        productNamesDataResponse[productId]

      productNames[productId] = {
        name: product.N
      }
    })

    return productNames as ProductsNameData
  }
}
