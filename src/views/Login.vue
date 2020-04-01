<template>
  <div class="col-6 offset-3 pt-5">
    <div class="card">
      <h5 class="card-header">
        Please provide your data to log in.
      </h5>
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email"
                   @blur="$v.email.$touch()" :class="{'is-invalid': $v.email.$invalid}"/>

            <div v-if="!$v.email.required || !$v.email.email" class="invalid-feedback">
              Please, indicated a valid email address.
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" aria-describedby="password-help"
                   v-model="password" @blur="$v.password.$touch()" :class="{'is-invalid': $v.password.$invalid}"/>
            <div v-if="!$v.password.required || !$v.password.minLen" class="invalid-feedback">
              Password must be have at least {{$v.password.$params.minLen.min}} characters length.
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Log In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('auth/logIn', formData)
    }
  }
}
</script>
