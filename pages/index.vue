<template lang="html">
  <div class="container">
    <h1 class="title">
      liepa_test
    </h1>
    <h2 class="subtitle">
      Test project for Liepa ltd.
    </h2>
    <div class="currency-data-section">
      <h3>Валюта</h3>
      <currency-display />
    </div>
    <div class="groups-tables-section">
      <h3>Товары</h3>
      <products-group-table
        v-for="group of groups"
        :key="group.id"
        :group="group"
      />
    </div>
    <div class="cart-section">
      <h3>Корзина</h3>
      <cart />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NamedProductsData } from '~/models/types/products_data'
import ProductsGroupTable from '~/components/ProductsGroupTable.vue'
import Cart from '~/components/Cart.vue'
import CurrencyDisplay from '~/components/CurrencyDisplay.vue'

// external config-like variable for easy manipulate fetching interval
const UPDATE_INTERVAL_IN_SECONDS: number = 15

export default Vue.extend({
  components: { ProductsGroupTable, Cart, CurrencyDisplay },
  async fetch(): Promise<void> {
    // fetching initial data from server (first time on server-side)
    await Promise.all([
      this.$store.dispatch('product/fetchData'),
      this.$store.dispatch('currency/fetchData'),
      this.$store.dispatch('product/fetchNames')
    ])
  },
  data(): {
    fetchInterval: ReturnType<typeof setInterval> | null
  } {
    return {
      fetchInterval: null
    }
  },
  computed: {
    // get products data grouped
    groups(): NamedProductsData {
      return this.$store.getters['product/namedProductsData']
    }
  },
  created() {
    // if on server no need to start interval fetching
    if (!process.client) return
    // start fetching data by interval
    this.fetchInterval = setInterval(() => {
      this.$store.dispatch('product/fetchData')
      this.$store.dispatch('currency/fetchData')
    }, UPDATE_INTERVAL_IN_SECONDS * 1000)
  },
  beforeDestroy() {
    if (this.fetchInterval == null) return
    clearInterval(this.fetchInterval)
    this.fetchInterval = null
  }
})
</script>

<style>
.container {
  margin: 0 auto 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin: 20px 0 10px;
}

.groups-tables-section,
.cart-section,
.currency-data-section {
  width: 100%;
  max-width: 720px;
}
</style>
