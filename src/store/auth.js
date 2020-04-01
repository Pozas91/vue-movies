import axiosAuth from '../axios/auth'
import router from '../router'

export default {
  namespaced: true,
  state: {
    name: null,
    idToken: null,
    userId: null
  },
  mutations: {
    authUser (state, userData) {
      state.name = userData.name
      state.idToken = userData.token
      state.userId = userData.userId
    },
    clearAuthData (state) {
      state.name = null
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    logIn ({ commit, dispatch, rootState }, authData) {
      axiosAuth.post('accounts:signInWithPassword?key=' + process.env.VUE_APP_CLIENT_SECRET, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(response => {
          const now = new Date()
          const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000)
          localStorage.setItem('name', response.data.displayName)
          localStorage.setItem('token', response.data.idToken)
          localStorage.setItem('userId', response.data.localId)
          localStorage.setItem('expirationDate', expirationDate)

          commit('authUser', {
            name: response.data.displayName,
            token: response.data.idToken,
            userId: response.data.localId
          })

          dispatch('setLogoutTimer', response.data.expiresIn)
          router.replace('/movies')
        })
        .catch(error => {
          let errorMessage = null

          if (error.response.status === 400) {
            errorMessage = 'Credentials indicated are invalid. Please check it.'
          }

          dispatch('errors/showError', errorMessage, { root: true })
        })
    },
    register ({ commit, dispatch }, authData) {
      axiosAuth.post('accounts:signUp?key=' + process.env.VUE_APP_CLIENT_SECRET, {
        displayName: authData.name,
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            name: res.data.displayName,
            token: res.data.idToken,
            userId: res.data.localId
          })

          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('name', res.data.displayName)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)

          dispatch('setLogoutTimer', res.data.expiresIn)

          router.replace('/movies')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({ commit, dispatch }) {
      const token = localStorage.getItem('token')

      if (!token) {
        dispatch('logout')
        return
      }

      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      const now = new Date()

      if (now >= expirationDate) {
        dispatch('logout')
        return
      }

      const userId = localStorage.getItem('userId')
      const name = localStorage.getItem('name')

      commit('authUser', {
        name: name,
        token: token,
        userId: userId
      })

      router.replace('/movies')
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      router.replace('/login')
    }
  },
  modules: {},
  getters: {
    user (state) {
      return state.name
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
}
