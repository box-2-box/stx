<template>
  <form>
    <h1 v-if="transactionType === 'edit'">Edit Transaction</h1>
    <h1 v-if="transactionType === 'add'">Add Transaction</h1>
    <h1 v-if="transactionType === 'sell'">Sell Holding</h1>
    <div class="form-group">
      <label>Date</label>
      <date-picker 
        v-if="dataLoaded"
        :date="transaction.date"
        v-on:update-date="onUpdateDate" />
    </div>
    <div class="form-group">
      <label>Action</label>
      <select class="form-control" v-model="transaction.action">
        <option value="">Select...</option>
        <option v-if="transactionType !== 'sell'" value="1">Buy</option>
        <option v-if="transactionType !== 'sell'" value="2">Dividend</option>
        <option v-if="transactionType !== 'sell'" value="3">Reinvest</option>
        <option v-if="transactionType === 'sell'" value="4">Sell</option>
      </select>
      
    </div>
    <div class="form-group">
      <label>Symbol</label>
      <input v-model="transaction.symbol" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Shares</label>
      <input v-if="transactionType === 'sell'" v-model="transaction.shares" type="number" min="1" max="transation.shares" class="form-control">
      <input v-else v-model="transaction.shares" type="number" min="1" class="form-control">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input v-model="transaction.price" type="number" class="form-control">
    </div>
    <button @click.prevent="saveTransaction" class="btn btn-primary btn-lg btn-block">Save</button>
    <button 
      class="btn btn-secondary btn-lg btn-block"
      @click.prevent="$router.push('/transactions')"
    >Cancel</button>
    <button 
      v-if="transactionType === 'edit'"
      class="btn btn-secondary btn-lg btn-block"
      @click.prevent="deleteTransaction"
    >Delete</button>
  </form>
</template>

<script>
import DatePicker from './DatePicker.vue'
import api from '@/api'

export default {
  data () {
    return {
      id: this.$route.params.id,
      transactionType: this.$attrs.transactionType,
      transaction: {},
      loading: false,
      dataLoaded: false,
      sharesRemaining: null
    }
  },
  components: {
    'date-picker': DatePicker
  },
  async created () {
    if (this.transactionType === 'edit') {
      await this.getTransaction()
    } else if (this.transactionType === 'sell') {
      await this.getTransaction()
      this.transaction.date = ''
      this.transaction.action = 4
      this.transaction.shares = ''
      this.transaction.price = ''
    }
    this.dataLoaded = true
  },
  methods: {
    async getTransaction () {
      this.loading = true
      this.transaction = await api.getTransaction(this.id)
      this.loading = false
    },
    onUpdateDate (date) {
      console.log(date)
      this.transaction.date = date
    },
    async saveTransaction () {
      if (this.id) {
        await api.updateTransaction(this.id, this.transaction)
      } else {
        await api.createTransaction(this.transaction)
      }
      this.$router.push('/transactions')
    },
    async deleteTransaction () {
      if (confirm('Are you sure you want to delete this transaction?')) {
        if (this.id) {
          await api.deleteTransaction(this.id)
        }
        this.$router.push('/transactions')
      }
    }
  }
}
</script>

<style>

</style>
