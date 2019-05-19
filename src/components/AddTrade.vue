<template>
  <form>
    <h1>Add Trade</h1>
    <div class="form-group">
      <label>Date</label>
      <date-picker
        :date="transaction.date"
        v-on:update-date="onUpdateDate" />
    </div>
    <div class="form-group">
      <label>Action</label>
      <select class="form-control" v-model="transaction.action">
        <option value="0">Select...</option>
        <option value="1">Buy</option>
        <option value="2">Dividend</option>
        <option value="3">Reinvest</option>
      </select>
    </div>
    <div class="form-group">
      <label>Symbol</label>
      <input 
        v-model="transaction.symbol" 
        type="text" 
        class="form-control text-uppercase">
    </div>
    <div class="form-group">
      <label>Shares</label>
      <input 
        v-model="transaction.shares" 
        type="number" 
        min="1" 
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
      @click.prevent="$router.push('/trades')">Cancel</button>
  </form>
</template>

<script>
import DatePicker from './DatePicker.vue'
import api from '@/api'

export default {
  data () {
    return {
      transaction: {
        action: 0,
        date: ''
      }
    }
  },
  components: {
    'date-picker': DatePicker
  },
  methods: {
    onUpdateDate (date) {
      this.transaction.date = date
    },
    async saveTransaction () {
      this.transaction.shares_held = this.transaction.shares
      await api.createTransaction(this.transaction)
      this.$router.push('/trades')
    }
  }
}
</script>

<style>

</style>
