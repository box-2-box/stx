<template>
  <div v-if="dataLoaded">
    <h1>Sell Holding</h1>
    <form v-if="holding.shares_held > 0">
      <div class="form-group">
        <label>Date</label>
        <date-picker
          :date="transaction.date"
          v-on:update-date="onUpdateDate" />
      </div>
      <div class="form-group">
        <label>Symbol</label>
        <input 
          v-model="transaction.symbol" 
          type="text" 
          class="form-control text-uppercase" 
          readonly>
      </div>
      <div class="form-group">
        <label>Shares</label>
        <input 
          v-model="transaction.shares" 
          type="number" 
          min="1" 
          :max="transaction.shares"
          class="form-control">
      </div>
      <div class="form-group">
        <label>Price</label>
        <input 
          v-model="transaction.price" 
          type="number" 
          class="form-control">
      </div>
      <div
        v-if="sales.length > 0">
        <h2>Sales History</h2>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <td scope="col">Date</td>
              <td scope="col">Shares</td>
              <td scope="col">Price</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sale, index) in sales"
              :key="index">
              <td>{{ sale.date }}</td>
              <td>{{ sale.shares }}</td>
              <td>{{ sale.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button 
        @click.prevent="saveTransaction" 
        class="btn btn-primary btn-lg btn-block">Save</button>
      <button 
        class="btn btn-secondary btn-lg btn-block"
        @click.prevent="$router.push('/trades')">Cancel</button>
    </form>
    <div v-else>
      <p>All shares have been purchased</p>
      <button 
          class="btn btn-secondary btn-lg btn-block"
          @click.prevent="$router.push('/trades')">Cancel</button>
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue'
import api from '@/api'

export default {
  data () {
    return {
      id: this.$route.params.id,
      transaction: {
        date: '',
        action: 4,
        price: '',
        shares: 0,
        purchase_id: this.$route.params.id
      },
      holding: {},
      sales: [],
      dataLoaded: false
    }
  },
  components: {
    'date-picker': DatePicker
  },
  async created () {
    this.holding = await api.getTransaction(this.id)
    this.transaction.symbol = this.holding.symbol
    this.transaction.shares = this.holding.shares_held
    this.sales = await api.getSales(this.id)
    this.dataLoaded = true
  },
  methods: {
    onUpdateDate (date) {
      this.transaction.date = date
    },
    async saveTransaction () {
      this.holding.shares_held -= this.transaction.shares
      await api.updateTransaction(this.id, this.holding)
      await api.createTransaction(this.transaction)
      this.$router.push('/trades')
    }
  }
}
</script>

<style>

</style>
