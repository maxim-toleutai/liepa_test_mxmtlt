<template lang="html">
  <tr class="products-group-table-row">
    <td class="name" @click.prevent="addToCart">{{ product.name }}</td>
    <td class="price" :class="priceClasses">{{ price }}</td>
    <td class="currency">
      <label>
        <input v-model="currency" type="number" />
      </label>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NamedProduct } from '~/models/types/products_data'
import { CurrencyHistoryType } from '~/models/types/currency'

export default Vue.extend({
  name: 'ProductsGroupTableRow',
  props: {
    product: {
      type: Object as PropType<NamedProduct>,
      required: true
    }
  },
  computed: {
    currency: {
      get(): string {
        return this.$store.getters['currency/currencyPriceByProductId'](
          this.product.id
        )
      },
      set(value: string) {
        this.$store.commit('currency/SET_CUSTOM_PRODUCT_CURRENCY', {
          productId: this.product.id,
          data: {
            RUB: parseFloat(value) || 0
          }
        })
      }
    },
    price(): string {
      const currency: number | null = this.$store.getters[
        'currency/currencyPriceByProductId'
      ](this.product.id)

      return currency !== null
        ? (this.product.priceUsd * currency).toFixed(2)
        : 'Loading...'
    },
    currencyHistoryType(): CurrencyHistoryType {
      return this.$store.getters['currency/currencyHistoryType'](
        undefined,
        this.currency
      )
    },
    priceClasses(): Classes {
      return {
        [`type-${this.currencyHistoryType.toString()}`]: true
      }
    }
  },
  methods: {
    addToCart(): void {
      this.$store.commit('cart/ADD_ITEM', this.product)
    }
  }
})
</script>

<style scoped>
.products-group-table-row {
  border: 1px solid grey;
  transition: background-color 0.1s;
}

.products-group-table-row:hover {
  background-color: #e0ba67;
}

.products-group-table-row td {
  padding: 4px 5px;
}

.products-group-table-row .name {
  cursor: pointer;
}

.products-group-table-row .currency {
  width: 100px;
}

.products-group-table-row .currency label {
  width: 100%;
}

.products-group-table-row .currency input {
  width: 100%;
}

.products-group-table-row .price {
  width: 100px;
  background-color: #d4d4d4;
  text-align: right;
  transition: background-color 0.1s;
}

.products-group-table-row:hover .price {
  background-color: #e0ba67;
}

.products-group-table-row .price.type-higher {
  background-color: #e02b2b;
}

.products-group-table-row .price.type-lower {
  background-color: #2ec42e;
}
</style>
