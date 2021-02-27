<template lang="html">
  <div class="cart">
    <div v-if="items.length" class="cart__data">
      <table>
        <thead>
          <tr>
            <th>Наименование товара и описание</th>
            <th>Количество</th>
            <th>Цена</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <cart-row
            v-for="item of items"
            :key="item.productId"
            :cart-item="item"
          />
        </tbody>
      </table>
      <div class="cart__data__total">
        <div class="data">
          <span class="label">Общая стоимость:</span>
          <span class="amount">{{ totalPrice }} руб.</span>
        </div>
      </div>
    </div>
    <div v-else>
      <span>
        Пусто
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CartItem } from '~/models/types/cart'
import CartRow from '~/components/CartRow.vue'

export default Vue.extend({
  name: 'Cart',
  components: {
    CartRow
  },
  data() {
    return {}
  },
  computed: {
    items(): CartItem[] {
      return this.$store.getters['cart/items']
    },
    totalPrice(): string {
      return this.items
        .reduce((price: number, item: CartItem) => {
          return price + this.getPrice(item)
        }, 0)
        .toFixed(2)
    }
  },
  methods: {
    getPrice(item: CartItem): number {
      const currency: number =
        this.$store.getters['currency/currencyPriceByProductId'](
          item.productId
        ) || 0

      const price: number =
        this.$store.getters['product/priceByIds'](
          item.groupId,
          item.productId
        ) || 0

      return price * currency * item.count
    }
  }
})
</script>

<style scoped>
.cart {
  width: 100%;
}

.cart table {
  width: 100%;
}

.cart table thead tr th {
  margin: 0;
  padding: 4px 5px 6px;
  color: #7f828b;
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  border-bottom: 1px #c6c4c4 solid;
}

.cart__data__total {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.cart__data__total .data .label {
  font-size: 14px;
  color: #7f828b;
}

.cart__data__total .data .amount {
  color: orangered;
  font-weight: bold;
  font-size: 20px;
}
</style>
