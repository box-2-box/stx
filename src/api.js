// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    // let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
    }).then(req => {
      return req.data
    })
  },
  getTransactions () {
    return this.execute('get', '/trades')
  },
  getTransaction (id) {
    return this.execute('get', `/trades/edit/${id}`)
  },
  createTransaction (data) {
    return this.execute('post', '/trades/add', data)
  },
  updateTransaction (id, data) {
    return this.execute('put', `/trades/update/${id}`, data)
  },
  deleteTransaction (id) {
    return this.execute('delete', `/trades/delete/${id}`)
  },
  getSales (id) {
    return this.execute('get', `/trades/sales/${id}`)
  }
}
