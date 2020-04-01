import axios from '../axios/global'
import router from '../router'

export default {
  namespaced: true,
  state: {
    movies: []
  },
  actions: {
    initMovies: ({ commit, state, rootState, dispatch }) => {
      if (!rootState.auth.idToken) {
        return
      }

      axios.get('movies.json' + '?auth=' + rootState.auth.idToken + '&orderBy="owner"' + '&equalTo="' + rootState.auth.userId + '"')
        .then(response => {
          const movies = []
          const data = response.data

          for (const key in data) {
            const movie = {
              id: key,
              title: data[key].title,
              owner: data[key].owner
            }

            movies.push(movie)
          }

          commit('SET_MOVIES', movies)
        })
        .catch(() => {
          dispatch('errors/showError', 'Cannot get movies', { root: true })
        })
    },
    createMovie: ({ commit, dispatch, rootState }, movieData) => {
      axios.post('movies.json' + '?auth=' + rootState.auth.idToken, {
        title: movieData.title,
        owner: rootState.auth.userId
      })
        .then(response => {
          dispatch('initMovies')
          router.replace('/movies')
        })
        .catch(() => {
          dispatch('errors/showError', 'Cannot create the movie', { root: true })
        })
    },
    deleteMovie: ({ commit, dispatch, rootState }, movieData) => {
      axios.delete('movies/' + movieData.id + '.json?auth=' + rootState.auth.idToken)
        .then(response => {
          dispatch('initMovies')
        })
        .catch(() => {
          dispatch('errors/showError', 'Cannot delete the movie', { root: true })
        })
    }
  },
  mutations: {
    'SET_MOVIES' (state, movies) {
      state.movies = movies
    }
  },
  getters: {
    movies: (state) => {
      return state.movies
    }
  }
}
