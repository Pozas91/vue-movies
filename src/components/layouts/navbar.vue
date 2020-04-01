<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/movies" class="navbar-brand">Movies</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav ml-auto">
        <router-link to="/register" active-class="active" tag="li" class="nav-item" v-if="!auth">
          <a class="nav-link">
            Register
            <font-awesome-icon icon="user-plus" />
          </a>
        </router-link>
        <router-link to="/login" active-class="active" tag="li" class="nav-item" v-if="!auth">
          <a class="nav-link">
            Login
            <font-awesome-icon icon="sign-in-alt" />
          </a>
        </router-link>
        <li class="nav-item" v-if="auth">
          <button class="btn btn-outline-danger" type="submit" @click="onLogout">
            Logout
            <font-awesome-icon icon="power-off" />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    auth () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style scoped>

</style>
