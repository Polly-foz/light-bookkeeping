import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Statistics from '@/views/Statistics.vue'
import AddTransaction from '@/views/AddTransaction.vue'
import Transactions from '@/views/Transactions.vue'
import Transaction from '@/views/Transaction.vue'
import Categories from '@/views/Categories.vue'
import NotFound from '@/views/NotFound.vue'
import Test from '@/views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/addTransaction',
    component: AddTransaction
  },
  {
    path: '/transactions',
    component: Transactions
  },
  {
    path: '/transaction',
    component: Transaction
  },
  {
    path: '/categories',
    component: Categories
  },
  {
    path: '/test',
    component: Test
  },
  {
    path: '*',
    component: NotFound
  }

]

const router = new VueRouter({
  routes
})

export default router
