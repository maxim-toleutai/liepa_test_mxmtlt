<template lang="html">
  <div class="products-group-table">
    <div class="products-group-table__header">
      <button @click.prevent="toggleOpened">
        {{ isOpened ? 'A' : 'V' }}
      </button>
      <span>{{ group.name }}</span>
    </div>
    <table v-show="isOpened">
      <tbody>
        <products-group-table-row
          v-for="product of group.products"
          :key="product.id"
          :product="product"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NamedProduct, NamedProductsGroup } from '~/models/types/products_data'
import ProductsGroupTableRow from '~/components/ProductsGroupTableRow.vue'

export default Vue.extend({
  name: 'ProductsGroupTable',
  components: {
    ProductsGroupTableRow
  },
  props: {
    group: {
      type: Object as PropType<NamedProductsGroup>,
      required: true
    }
  },
  data() {
    return {
      isOpened: true
    }
  },
  methods: {
    toggleOpened(): void {
      this.isOpened = !this.isOpened
    },
    getPrice(product: NamedProduct): string {
      const currency: number = this.$store.getters[
        'currency/currencyPriceByProduct'
      ](product)

      return currency ? (product.priceUsd * currency).toFixed(2) : 'Loading...'
    }
  }
})
</script>

<style scoped>
.products-group-table {
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.products-group-table__header {
  width: 100%;
  padding: 2px 5px 4px;
  background-color: #4bae8e;
  font-weight: 600;
  border: 1px solid grey;
}

.products-group-table__header button {
  background-color: transparent;
  font-weight: bolder;
  color: #47494e;
  border: none;
  cursor: pointer;
}

.products-group-table__header button:focus {
  outline: none;
}

.products-group-table table {
  width: 100%;
  border: 1px solid grey;
  border-collapse: collapse;
  border-top: none;
}
</style>
