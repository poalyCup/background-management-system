import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../views/home/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('components/Login.vue')
  },
  {
    path: '/home',
    component: () => import('components/Home.vue'),
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: () => import('views/home/Welcome.vue')},
      {path: '/users', component: () => import('views/users/Users.vue')},
      {path: '/rights', component: () => import('views/power/Rights.vue')},
      {path: '/roles', component: () => import('views/power/Roles.vue')},
      {path: '/categories', component: () => import('views/goods/CateList/Categories.vue')},
      {path: '/params', component: () => import('views/goods/CateParams/CateParams.vue')},
      {path: '/goods', component: () => import('views/goods/goodsList/Goods.vue')},
      {path: '/goods/add', component: () => import('views/goods/goodsList/AddGoods.vue')},
      {path: '/orders', component: () => import('views/orders/Orders.vue')},
      {path: '/reports', component: () => import('views/reports/Reports.vue')},

    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
