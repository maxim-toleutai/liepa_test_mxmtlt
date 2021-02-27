import { MutationTree, GetterTree } from 'vuex'
import { CartItemsData, CartItem } from '~/models/types/cart'
import { Product } from '~/models/types/products_data'
import { NumberUtils } from '~/utils/number'

// all types related data in "models" folder

export interface CartState {
  data: CartItemsData
}

export const state = (): CartState => ({
  data: {}
})

export const getters: GetterTree<CartState, object> = {
  // simply return all items as list
  items(state: CartState): CartItem[] {
    return Object.keys(state.data).map((productId) => state.data[productId])
  }
}

export const mutations: MutationTree<CartState> = {
  // cart item is product and count, so we add item by product itself
  ADD_ITEM(state: CartState, product: Product) {
    const existingCartItem: CartItem = state.data[product.id]
    const { id: productId, groupId } = product
    const cartItem: CartItem = {
      groupId,
      productId,
      count: NumberUtils.clamp(
        !existingCartItem ? 1 : existingCartItem.count + 1,
        0,
        product.count
      )
    }

    state.data = {
      ...state.data,
      [product.id]: cartItem
    }
  },
  // remove item by product
  REMOVE_ITEM(state: CartState, product: Product) {
    const existingCartItem: CartItem = state.data[product.id]
    if (!existingCartItem) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [product.id]: _, ...newState } = state.data

    state.data = newState
  },
  // set item count by product
  SET_ITEM_COUNT(
    state: CartState,
    { product, count }: { product: Product; count: number }
  ) {
    const { id: productId, groupId } = product
    const cartItem: CartItem = {
      groupId,
      productId,
      // we don't want to go above product count that we get from data
      count: NumberUtils.clamp(count, 1, product.count)
    }

    state.data = {
      ...state.data,
      [product.id]: cartItem
    }
  }
}
