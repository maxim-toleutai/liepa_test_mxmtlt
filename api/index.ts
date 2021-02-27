import { ProductsData } from '~/models/types/products_data'
import { NamesDataResponse } from '~/models/types/names_data/response'
import { ProductsDataResponse } from '~/models/types/products_data/response'
import { ProductsDataTransformer } from '~/models/transformers/products_data_transformer'
import { NamesDataTransformer } from '~/models/transformers/names_data_transformer'
import { NamesData } from '~/models/types/names_data'

// wrapper around http client, for easy replace if needed
export class Api {
  private static _baseUrl: string = ''

  // set basic url for fetching data from server on application init
  // info in plugins/api
  static setBasicUrl(baseUrl: string = ''): void {
    this._baseUrl = baseUrl
  }

  // fetches product data
  static async fetchProductsData(): Promise<ProductsData> {
    try {
      const response: ProductsDataResponse = await this._fetch(
        '/data/data.json'
      )
      return ProductsDataTransformer.fetch(response)
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  // fetches names data
  static async fetchNamesData(): Promise<NamesData> {
    try {
      const response: NamesDataResponse = await this._fetch('/data/names.json')
      return NamesDataTransformer.fetch(response)
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  // basic fetching method (returns json of "T" type)
  private static async _fetch<T>(url: string): Promise<T> {
    const response: Response = await fetch(`${this._baseUrl}${url}`)
    return (await response.json()) as T
  }
}
