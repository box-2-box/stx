import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Transactions from '@/components/Transactions'
import Edit from '@/components/EditTransaction'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-741623.okta.com/oauth2/default',
  client_id: '0oadejezhdB6T7rVn356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transaction/:id',
      name: 'Edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
