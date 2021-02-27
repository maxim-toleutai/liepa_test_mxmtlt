<template>
  <div class="currency-display">
    <div class="previous">
      <span class="label">Предыдущая:</span>
      <span class="amount">{{ previous }} USDRUB</span>
    </div>
    <div class="current">
      <span class="label">Нынешняя:</span>
      <span class="amount">{{ current }} USDRUB</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CurrencyDisplay',
  computed: {
    current(): string {
      return (this.$store.state.currency.data.RUB || 0).toFixed(2)
    },
    previous(): string {
      return (this.$store.state.currency.previousData?.RUB || 0).toFixed(2)
    }
  }
})
</script>

<style scoped>
.currency-display {
  display: flex;
  flex-direction: column;
}

.currency-display div {
  display: flex;
}

.currency-display div .label {
  font-size: 14px;
  color: #7f828b;
}

.currency-display div .amount {
  margin-left: 10px;
  color: orangered;
  font-weight: bold;
}
</style>
