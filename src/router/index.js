import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Transactions from '@/components/Transactions'
import AddTrade from '@/components/AddTrade'
import EditTrade from '@/components/EditTrade'
import SellHolding from '@/components/SellHolding'
import Auth from '@okta/okta-vue'

// Vue.use(Auth, {
//   issuer: 'https://dev-741623.okta.com/oauth2/default',
//   client_id: '0oadejezhdB6T7rVn356',
//   redirect_uri: 'http://localhost:8080/implicit/callback',
//   scope: 'openid profile email'
// })

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
      path: '/trades',
      name: 'transactions',
      component: Transactions,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/trade/add',
      name: 'add',
      component: AddTrade,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/trade/edit/:id',
      name: 'edit',
      component: EditTrade,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/trade/sell/:id',
      name: 'sell',
      component: SellHolding,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

// router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
