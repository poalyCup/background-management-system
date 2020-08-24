import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../views/home/Welcome.vue'
import Users from '../views/users/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/roles',
    children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: () => import('../views/power/Rights.vue')},
      {path: '/roles', component: () => import('../views/power/Roles.vue')}
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
