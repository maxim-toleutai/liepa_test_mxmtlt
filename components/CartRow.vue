<template lang="html">
  <tr class="cart-row">
    <td class="name">{{ namedProduct.name }}</td>
    <td class="count">
      <div class="wrapper">
        <label><input v-model="count" type="number" /> <span>шт.</span></label>
        <div v-if="namedProduct.count < 4" class="additional">
          <span>Количество ограничено</span>
        </div>
      </div>
    </td>
    <td class="price">
      <span class="price__amount">{{ price }} руб.</span>
      <span class="price__label">\ шт.</span>
    </td>
    <td class="action">
      <button @click.prevent="removeFromCart">Удалить</button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { CartItem } from '~/models/types/cart'
import { NamedProduct } from '~/models/types/products_data'

export default Vue.extend({
  name: 'CartRow',
  props: {
    cartItem: {
      type: Object as PropType<CartItem>,
      required: true
    }
  },
  computed: {
    namedProduct(): NamedProduct {
      return this.$store.getters['product/namedProductByIds'](
        this.cartItem.groupId,
        this.cartItem.productId
      )
    },
    count: {
      get(): string {
        return this.cartItem.count.toString()
      },
      set(value: string) {
        this.$store.commit('cart/SET_ITEM_COUNT', {
          product: this.namedProduct,
          count: parseInt(value) || 1
        })
      }
    },
    price(): string {
      const currency: number | null = this.$store.getters[
        'currency/currencyPriceByProductId'
      ](this.namedProduct.id)

      return currency !== null
        ? (this.namedProduct.priceUsd * currency).toFixed(2)
        : 'No data'
    }
  },
  methods: {
    removeFromCart(): void {
      this.$store.commit('cart/REMOVE_ITEM', this.namedProduct)
    }
  }
})
</script>

<style scoped>
.cart-row {
  width: 100%;
}

.cart-row td {
  padding: 4px 5px 6px;
  border-bottom: 1px #c6c4c4 solid;
}

.cart-row .count {
  width: 100px;
}

.cart-row .count .wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.cart-row .count label {
  display: flex;
  width: 40px;
}

.cart-row .count label input {
  width: 40px;
}

.cart-row .count label span {
  margin-left: 6px;
}

.cart-row .additional {
  margin-top: 10px;
  padding: 4px;
  color: orangered;
  font-size: 14px;
  border: orangered dashed 1px;
  background-color: #ffe0d8;
}

.cart-row .price {
  width: 150px;
}

.cart-row .price .price__amount {
  font-weight: bold;
}

.cart-row .price .price__label {
  font-size: 14px;
  color: #7f828b;
}

.cart-row .action button {
  background: none;
  border: none;
  color: #7f828b;
  cursor: pointer;
}

.cart-row .action button:focus {
  outline: none;
}

.cart-row .action button:hover {
  color: #b6b7bc;
}
</style>
