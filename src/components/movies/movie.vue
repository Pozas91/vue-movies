<template>
  <div class="col-3">
    <div class="card" @click="deleteMovie">
      <div class="card-body">
        <h5 class="text-center">{{movie.title}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteMovie () {
      this.$swal.fire({
        text: 'Have you already seen the movie?',
        icon: 'info',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('movies/deleteMovie', this.movie)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
