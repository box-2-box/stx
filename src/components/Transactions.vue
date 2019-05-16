<template>
  <div>
    <h1>Trades</h1>
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
      <tbody>
        <tr
          v-for="(transaction, index) in transactions" 
          :key="index"
        >
          <td>{{ transaction.date }}</td>
          <td>{{ actions[transaction.action] }}</td>
          <td class="text-uppercase">{{ transaction.symbol }}</td>
          <td>{{ transaction.shares }}</td>
          <td>{{ value(1, transaction.price) }}</td>
          <td>{{ value(transaction.shares, transaction.price) }}</td>
          <td><router-link :to="{name: 'sell', params: {id: transaction.id}}">Sell</router-link></td>
          <td><router-link :to="{name: 'edit', params: {id: transaction.id}}">Edit</router-link></td>
          <td><a href="#" @click="deleteTransaction(index)">Delete</a></td>
        </tr>
      </tbody>
    </table>
    <router-link to="/trade/add"><button class="btn btn-primary btn-lg btn-block">New Trade</button></router-link>
  </div>
</template> 

<script>
import api from '@/api'
import helpers from '@/helpers'

export default {
  data () {
    return {
      loading: false,
      transactions: [],
      actions: ['', 'Buy', 'Dividend', 'Reinvest', 'Sell']
    }
  },
  async created () {
    this.refreshTransactions()
  },
  methods: {
    value (shares, price) {
      return helpers.toCurrency(shares * price)
    },
    async refreshTransactions () {
      this.loading = true
      this.transactions = await api.getTransactions()
      this.loading = false
    },
    async deleteTransaction (index) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        await api.deleteTransaction(this.transactions[index].id)
        this.refreshTransactions()
      }
    }
  }
}
</script>

<style scoped>

</style>
