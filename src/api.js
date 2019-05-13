import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getTransactions () {
    return this.execute('get', '/transactions')
  },
  getTransaction (id) {
    return this.execute('get', `/transactions/${id}`)
  },
  createTransaction (data) {
    return this.execute('post', '/transactions', data)
  },
  updateTransaction (id, data) {
    return this.execute('put', `/transactions/${id}`, data)
  },
  deleteTransaction (id) {
    return this.execute('delete', `/transactions/${id}`)
  }
}
