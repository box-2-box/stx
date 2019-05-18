<template>
  <form>
    <h1>Sell Holding</h1>
    <div class="form-group">
      <label>Date</label>
      <date-picker 
        v-if="dataLoaded"
        :date="transaction.date"
        v-on:update-date="onUpdateDate" />
    </div>
    <div class="form-group">
      <label>Symbol</label>
      <input 
        v-model="transaction.symbol" 
        type="text" 
        class="form-control" 
        readonly>
    </div>
    <div class="form-group">
      <label>Shares</label>
      <input 
        v-if="dataLoaded"
        v-model="transaction.shares" 
        type="number" 
        min="1" 
        :max="sharesRemaining"
        class="form-control">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input 
        v-model="transaction.price" 
        type="number" 
        class="form-control">
    </div>
    <button 
      @click.prevent="saveTransaction" 
      class="btn btn-primary btn-lg btn-block">Save</button>
    <button 
      class="btn btn-secondary btn-lg btn-block"
      @click.prevent="$router.push('/trades')"
    >Cancel</button>
  </form>
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
        purchase_id: this.$route.params.id
      },
      dataLoaded: false,
      sharesRemaining: 0
    }
  },
  components: {
    'date-picker': DatePicker
  },
  async created () {
    let trade = await api.getTransaction(this.id)
    this.transaction.symbol = trade.symbol
    // TODO: do calculation
    this.sharesRemaining = this.transaction.shares
    this.dataLoaded = true
  },
  methods: {
    onUpdateDate (date) {
      this.transaction.date = date
    },
    async saveTransaction () {
      await api.createTransaction(this.transaction)
      this.$router.push('/trades')
    }
  }
}
</script>

<style>

</style>
