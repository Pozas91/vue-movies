import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "login" */ '../views/Movies/Index.vue'),
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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/movies/create',
    name: 'CreateMovie',
    component: () => import(/* webpackChunkName: "login" */ '../views/Movies/Create.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
