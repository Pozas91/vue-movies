<template>
  <div class="row">
    <div class="col-6 offset-3">
      <h1>Oops!</h1>
      <h2>You got lost on the way (Error 404)</h2>
      <small>Let me help you</small>
    </div>
    <div class="col-6 offset-3 text-center">
      <router-link to="/movies" class="btn btn-info">
        <font-awesome-icon icon="undo" size="6x"/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style scoped>

</style>
