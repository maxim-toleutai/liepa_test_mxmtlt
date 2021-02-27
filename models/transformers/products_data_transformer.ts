import { ProductsData, ProductsGroup } from '../types/products_data'
import { ProductsDataResponse } from '../types/products_data/response'
import { Mutable } from '~/utils/mutable'

export class ProductsDataTransformer {
  static fetch(response: ProductsDataResponse): ProductsData {
    const productsData: Mutable<ProductsData> = {}

    response.Value.Goods.forEach((productResponse) => {
      const id: string = productResponse.T.toString()
      const groupId: string = productResponse.G.toString()
      const group: Mutable<ProductsGroup> =
        (productsData[groupId] as Mutable<ProductsGroup>) || {}

      group[id] = {
        id,
        groupId,
        priceUsd: productResponse.C,
        count: productResponse.P
      }

      productsData[groupId] = group
    })

    return productsData as ProductsData
  }
}
