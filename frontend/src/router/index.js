import Vue from 'vue'
import VueRouter from 'vue-router'
import Graphics from '../views/Graphics.vue'
import Orders from '../views/Orders.vue'
import Import from '../views/Import.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/import',
    name: 'import',
    component: Import
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/graphics',
    name: 'graphics',
    component: Graphics
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
