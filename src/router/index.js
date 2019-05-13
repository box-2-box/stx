import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Transactions from '@/components/Transactions'
import Edit from '@/components/Transaction'
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
      name: 'home',
      component: Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transaction/',
      name: 'add',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/transaction/:id',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
