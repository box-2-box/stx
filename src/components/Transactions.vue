<template>
  <div>
    <h1>Transactions</h1>
    <table>
      <tr>
        <th 
          v-for="(key, index) in model" 
          v-bind:key="index"
        >{{ index }}</th>
      </tr>
      <stx-transaction 
        v-for="(transaction, index) in transactions" 
        v-bind:key="index" 
        v-bind:stock="transaction"
        @delete-transaction="onDeleteTransaction(index)"
        @save-transaction="onSaveTransaction(index)" />
    </table>
    <button @click="addRow">Add Row</button>
  </div>
</template>

<script>
import api from '@/api'
import Transaction from './Transaction.vue'

export default {
  data () {
    return {
      loading: false,
      transactions: [],
      model: {
        'id': '',
        'transaction': '0',
        'date': '',
        'symbol': '',
        'price': '',
        'shares': '',
        'total': ''
      }
    }
  },
  components: {
    'stx-transaction': Transaction
  },
  async created () {
    this.refreshTransactions()
  },
  methods: {
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
    addRow () {
      this.transactions.push(this.model)
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
