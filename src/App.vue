<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="container-fluid">
      <transition>
        <router-view/>
      </transition>
      <error></error>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/layouts/navbar.vue'
import Error from '@/components/layouts/error.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
    Error
  },
  created () {
    this.$store.dispatch('auth/tryAutoLogin')
  }
}
</script>
