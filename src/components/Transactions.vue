<template>
  <div>
    <h1>Transactions</h1>
    <table>
      <tr>
        <th 
          v-for="(key, index) in model" 
          v-bind:key="index"
        >{{ key }}</th>
      </tr>
      <stx-transaction 
        v-for="(transaction, index) in transactions" 
        v-bind:key="index" 
        v-bind:stock="transaction"
        @delete-row="onDeleteRow(index)" />
    </table>
    <button v-on:click="addRow">Add Row</button>
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
      model: {}
    }
  },
  components: {
    'stx-transaction': Transaction,
  },
  async created () {
    this.refreshPosts()
  },
  methods: {
    async refreshTransactions () {
      this.loading = true
      this.posts = await api.getTransactions()
      this.loading = false
    },
    async saveTransaction () {
      // if (this.model.id) {
      //   await api.updatePost(this.model.id, this.model)
      // } else {
      //   await api.createPost(this.model)
      // }
      // this.model = {} // reset form
      // await this.refreshPosts()
    },
    async deleteTransaction (id) {
      // if (confirm('Are you sure you want to delete this post?')) {
      //   // if we are editing a post we deleted, remove it from the form
      //   if (this.model.id === id) {
      //     this.model = {}
      //   }
      //   await api.deletePost(id)
      //   await this.refreshPosts()
      // }
    },

    addRow() {
      let tmp = {}
      let keys = Object.keys(this.stx[0])
      keys.forEach(function(key) {
        tmp[key] = ''
      })

      this.stx.push(tmp)
    },
    onDeleteRow(index) {
      this.stx.splice(index, 1)
    }
  }
}
</script>

<style scoped>
th {
  background-color: #ddd;
  font-weight: bold;
}
td {
  border: solid 1px #ddd
}
</style>
