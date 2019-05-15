<template>
  <form>
    <h1 v-if="id">Edit Transaction</h1>
    <h1 v-else>Add Transaction</h1>
    <div class="form-group">
      <label>Date</label>
      <date-picker 
        v-if="transaction.date"
        :date="transaction.date"
        v-on:update-date="onUpdateDate" />
    </div>
    <div class="form-group">
      <label>Action</label>
      <select class="form-control" v-model="transaction.action">
        <option value="">Select...</option>
        <option value="1">Buy</option>
        <option value="2">Dividend</option>
        <option value="3">Reinvest</option>
      </select>
    </div>
    <div class="form-group">
      <label>Symbol</label>
      <input v-model="transaction.symbol" type="text" class="form-control">
    </div>
    <div class="form-group">
      <div>Shares</div>
      <input v-model="transaction.shares" type="text" class="form-control">
    </div>
    <div class="form-group">
      <div>Price</div>
      <input v-model="transaction.price" type="text" class="form-control">
    </div>
    <button @click.prevent="saveTransaction" class="btn btn-primary btn-lg btn-block">Save</button>
    <button 
      class="btn btn-secondary btn-lg btn-block"
      @click.prevent="deleteTransaction" 
      v-if="id"
    >Delete</button>
    <button 
      class="btn btn-secondary btn-lg btn-block"
      @click.prevent="$router.push('/transactions')" 
      v-else
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
      transaction: {},
      loading: false
    }
  },
  components: {
    'date-picker': DatePicker
  },
  created () {
    if (this.id !== undefined) {
      this.getTransaction()
    }
  },
  mounted () {
    this.componentLoaded = true
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
