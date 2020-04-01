<template>
  <div class="row">
    <h1 class="text-center col-6 offset-3 mt-3">
      Welcome {{this.$store.state.auth.name}}!
    </h1>

    <div class="col-12 mt-3">
      <div class="row">
        <movie v-for="movie in movies" :movie="movie" :key="movie.id"></movie>
      </div>
    </div>

    <div class="col-6 offset-3 mt-3">
      <router-link to="/movies/create" class="btn btn-success btn-block">
        Add movie
        <font-awesome-icon icon="plus" />
      </router-link>
    </div>

  </div>
</template>

<script>
import Movie from '@/components/movies/movie.vue'

export default {
  name: 'Index',
  components: {
    movie: Movie
  },
  created () {
    this.$store.dispatch('movies/initMovies')
  },
  computed: {
    movies () {
      return this.$store.getters['movies/movies']
    }
  },
  methods: {}
}
</script>
