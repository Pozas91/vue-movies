import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Index from '../views/Movies/Index'
import Login from '../views/Login'
import Register from '../views/Register'
import Create from '../views/Movies/Create'
import Error404 from '../views/Error404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'Movies',
    component: Index,
    beforeEnter (to, from, next) {
      if (store.state.auth.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register
  },
  {
    path: '/movies/create',
    name: 'CreateMovie',
    component: Create
  },
  {
    path: '*',
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
