<template>
  <div>
    <h1 class="float-left">Trades</h1>
    <router-link to="/trade/add"><button class="btn btn-primary btn-lg float-right">New Trade</button></router-link>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
          <th scope="col">Symbol</th>
          <th scope="col">Shares</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody
        v-if="dataLoaded">  
        <tr
          v-for="(transaction, index) in transactions" 
          :key="index">
          <td>{{ transaction.date }}</td>
          <td>{{ actions[transaction.action] }}</td>
          <td class="text-uppercase">{{ transaction.symbol }}</td>
          <td>{{ transaction.shares }}</td>
          <td>{{ transaction.price | toFloat | toCurrency }}</td>
          <td>{{ transaction.shares * transaction.price | toFloat | toCurrency }}</td>
          <td><router-link :to="{name: 'edit', params: {id: transaction._id}}">Edit</router-link></td>
          <td><a href="#" @click="deleteTransaction(index)">Delete</a></td>
          <td v-if="dataLoaded && transaction.action == 4"></td>
          <td v-if="dataLoaded && transaction.action != 4"><router-link :to="{name: 'sell', params: {id: transaction._id}}">Sell</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template> 

<script>
import api from '@/api'

export default {
  data () {
    return {
      dataLoaded: false,
      transactions: [],
      actions: ['', 'Buy', 'Dividend', 'Reinvest', 'Sell']
    }
  },
  async created () {
    this.refreshTransactions()
  },
  filters: {
    toFloat (value) {
      if (value) return parseFloat(value)
    },
    toCurrency (value) {
      if (value) return value.toLocaleString('en', { style: 'currency', currency: 'USD' })
    }
  },
  methods: {
    async refreshTransactions () {
      this.transactions = await api.getTransactions()
      this.dataLoaded = true
    },
    async deleteTransaction (index) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        await api.deleteTransaction(this.transactions[index]._id)
        this.refreshTransactions()
      }
    }
  }
}
</script>

<style scoped>

</style>
