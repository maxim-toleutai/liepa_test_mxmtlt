import { MutationTree, GetterTree, ActionTree } from 'vuex'
import {
  ProductsData,
  ProductsGroup,
  NamedProductsData,
  NamedProduct,
  Product
} from '~/models/types/products_data'
import { Api } from '~/api'
import { NamesData } from '~/models/types/names_data'

// all types related data in "models" folder

export interface ProductsState {
  // products data
  data: ProductsData
  // namings data of groups and products
  names: NamesData
}

export const state = (): ProductsState => ({
  data: {},
  names: {}
})

export const getters: GetterTree<ProductsState, object> = {
  // get extended product model with name data from group id and product id
  // returns function
  namedProductByIds(state: ProductsState) {
    return (groupId: string, productId: string): NamedProduct | null => {
      const product: Product = state.data[groupId]?.[productId] || null

      return product
        ? {
            ...product,
            name: state.names[groupId]?.productNames[productId]?.name
          }
        : null
    }
  },
  // get grouped lists of named product model
  // could be optimized without filters
  // returns function
  namedProductsData(state: ProductsState): NamedProductsData {
    return Object.keys(state.data)
      .map((groupId: string) => ({
        id: groupId,
        name: state.names[groupId]?.name,
        products: Object.keys(state.data[groupId])
          .map((productId) => ({
            ...state.data[groupId][productId],
            name: state.names[groupId]?.productNames[productId]?.name
          }))
          .filter((product) => product.name)
      }))
      .filter((group) => group.name)
  },
  // get price of product by group id and product id
  // returns function
  priceByIds(state: ProductsState) {
    return (groupId: string, productId: string): number | null =>
      state.data[groupId]?.[productId].priceUsd || null
  },
  groupById(state: ProductsState) {
    return (id: string): ProductsGroup => state.data[id]
  }
}

export const mutations: MutationTree<ProductsState> = {
  SET_DATA(state: ProductsState, data: ProductsData) {
    state.data = data
  },
  SET_NAMES(state: ProductsState, names: NamesData) {
    state.names = names
  }
}

export const actions: ActionTree<ProductsState, object> = {
  async fetchData({ commit }) {
    const data = await Api.fetchProductsData()
    commit('SET_DATA', data)
  },

  async fetchNames({ commit }) {
    const data = await Api.fetchNamesData()
    commit('SET_NAMES', data)
  }
}
