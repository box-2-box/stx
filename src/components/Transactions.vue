<template>
  <div>
    <h1>Transactions</h1>
    <table>
      <tr>
        <th>Date</th>
        <th>Action</th>
        <th>Symbol</th>
        <th>Shares</th>
        <th>Price</th>
        <th>Total</th>
        <th></th>
      </tr>
      <tr
        v-for="(transaction, index) in transactions" 
        :key="index"
      >
        <td>{{ transaction.date }}</td>
        <td>{{ actions[transaction.action] }}</td>
        <td>{{ transaction.symbol }}</td>
        <td>{{ transaction.shares }}</td>
        <td>{{ transaction.price }}</td>
        <td>{{ value(transaction.shares, transaction.price) }}</td>
        <td><router-link :to="{name: 'edit', params: {id: transaction.id}}">Edit</router-link></td>
      </tr>
    </table>
    <router-link to="/transaction">New Transaction</router-link>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      transactions: [],
      actions: ['Buy', 'Sell', 'Dividend', 'Reinvest']
    }
  },
  async created () {
    this.refreshTransactions()
  },
  methods: {
    value (shares, price) {
      let n = price * shares
      return n.toLocaleString('en', { style: 'currency', currency: 'USD' })
    },
    async refreshTransactions () {
      this.loading = true
      this.transactions = await api.getTransactions()
      this.loading = false
    },
    async onSaveTransaction (index) {
      if (this.transactions[index].id) {
        await api.updateTransaction(this.transactions[index].id, this.transactions[index])
      } else {
        await api.createTransaction(this.transactions[index])
      }
      await this.refreshTransactions()
    },
    async onDeleteTransaction (index) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        if (this.transactions[index].id) {
          await api.deleteTransaction(this.transactions[index].id)
          await this.refreshTransactions()
        }
        this.transactions.splice(index, 1)
      }
    },
    onUpdateDate (index, date) {
      this.transactions[index].date = date
    }
  }
}
</script>

<style scoped>
th {
  background-color: #ddd;
  font-weight: bold;
  text-transform: capitalize;
}
td {
  border: solid 1px #ddd
}
</style>
