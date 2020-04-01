<template>
  <div class="col-6 col-sm-4 col-lg-3 col-xl-2">
    <div class="card">
      <div class="card-body">
        <h5 class="text-center">{{movie.title}}</h5>
      </div>
      <div class="card-footer text-center">
        <button type="button" @click="deleteMovie" class="btn btn-danger">
          <font-awesome-icon icon="trash" />
        </button>
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
