import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Sort = () => import('views/sort/Sort')
const User = () => import('views/user/User')
const Detail =()=> import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/sort',
    component: Sort
  },
  {
    path: '/user',
    component: User
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
