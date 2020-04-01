import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './auth'
import moviesStore from './movies'
import errorsStore from './errors'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: authStore,
    movies: moviesStore,
    errors: errorsStore
  }
})
