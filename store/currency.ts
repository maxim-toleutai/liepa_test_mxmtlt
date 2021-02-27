import { MutationTree, GetterTree, ActionTree } from 'vuex'
import { CurrencyData, CurrencyHistoryType } from '~/models/types/currency'
import { NumberUtils } from '~/utils/number'

// all types related data in "models" folder

export interface CurrencyState {
  data: CurrencyData
  // previous currency data (before current)
  previousData: CurrencyData | null
  // custom currencies for picked products
  customCurrencies: {
    readonly [productId: string]: CurrencyData
  }
}

export const state = (): CurrencyState => ({
  data: {},
  previousData: null,
  customCurrencies: {}
})

export const getters: GetterTree<CurrencyState, object> = {
  // get the difference between current and previous saved currency in numbers
  // returns function
  currencyDifference(state: CurrencyState) {
    return (currency: string = 'RUB', customAmount?: number): number | null =>
      state.data[currency] && state.previousData && state.previousData[currency]
        ? (customAmount || state.data[currency]) - state.previousData[currency]
        : null
  },
  // get the difference between current and previous saved currency as enum type
  // returns function
  currencyHistoryType(_, getters: any) {
    return (
      currency: string = 'RUB',
      customAmount?: number
    ): CurrencyHistoryType => {
      const currencyDifference: number = getters.currencyDifference(
        currency,
        customAmount
      )

      if (currencyDifference === null || currencyDifference === 0) {
        return CurrencyHistoryType.Same
      }

      return currencyDifference > 0
        ? CurrencyHistoryType.Higher
        : CurrencyHistoryType.Lower
    }
  },
  // get currency price (related to USD)
  // returns function
  currencyPrice(state: CurrencyState) {
    return (currency: string = 'RUB'): number | null =>
      state.data[currency] || null
  },
  // get currency price (related to USD) of custom product currency
  // returns function
  currencyPriceByProductId(state: CurrencyState, getters: any) {
    return (productId: string, currency: string = 'RUB'): number | null => {
      const currencyPrice: number =
        state.customCurrencies[productId]?.[currency]

      return currencyPrice === undefined
        ? getters.currencyPrice(currency)
        : currencyPrice
    }
  }
}

export const mutations: MutationTree<CurrencyState> = {
  SET_DATA(state: CurrencyState, data: CurrencyData) {
    state.previousData = state.data
    state.data = { ...data }
  },
  // sets the custom product currency for picked product
  SET_CUSTOM_PRODUCT_CURRENCY(
    state: CurrencyState,
    { productId, data }: { productId: string; data: CurrencyData }
  ) {
    const currencyData: CurrencyData = state.customCurrencies[productId]

    state.customCurrencies = {
      ...state.customCurrencies,
      [productId]: currencyData
        ? {
            ...currencyData,
            ...data
          }
        : { ...data }
    }
  }
}

export const actions: ActionTree<CurrencyState, object> = {
  // simply generate random currency
  // in way as it fetching from server
  fetchData({ commit }) {
    const data: CurrencyData = {
      RUB: NumberUtils.randomBetween(20, 80, true)
    }
    commit('SET_DATA', data)
  }
}
