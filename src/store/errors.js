export default {
  namespaced: true,
  state: {
    error: false,
    errorMessage: ''
  },
  actions: {
    showError: ({ commit, dispatch }, message) => {
      commit('SHOW_ERROR', message)

      setTimeout(() => {
        dispatch('hideError')
      }, 5000)
    },
    hideError: ({ commit }) => {
      commit('RESET_ERROR')
    }
  },
  mutations: {
    'SHOW_ERROR' (state, message) {
      state.error = true

      if (message === null) {
        message = 'Oops, something go wrong.'
      }

      state.errorMessage = message
    },
    'RESET_ERROR' (state) {
      state.error = false
      state.errorMessage = ''
    }
  },
  getters: {}
}
