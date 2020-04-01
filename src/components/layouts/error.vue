<template>
  <div class="row">
    <div class="col-6 offset-3">
      <transition enter-active-class="animated bounce" leave-active-class="animated fadeOut" mode="out-in">
        <div class="alert alert-danger mt-5" role="alert" v-if="this.$store.state.errors.error">
          {{this.$store.state.errors.errorMessage}}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>

</style>
