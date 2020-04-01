import axios from '../axios/global'
import router from '../router'

export default {
  namespaced: true,
  state: {
    movies: []
  },
  actions: {
    initMovies: ({ commit, state, rootState }) => {
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
        .catch(error => {
          console.error(error)
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
        .catch(error => {
          console.error(error)
        })
    },
    deleteMovie: ({ commit, dispatch, rootState }, movieData) => {
      axios.delete('movies/' + movieData.id + '.json?auth=' + rootState.auth.idToken)
        .then(response => {
          dispatch('initMovies')
        })
        .catch(error => {
          console.error(error)
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
