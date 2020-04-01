<template>
  <div class="col-6 offset-3">
    <div class="card mt-5">
      <h5 class="card-header">
        Please provide your data to register.
      </h5>
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="name"
                   @blur="$v.name.$touch()" :class="{'is-invalid': $v.name.$invalid}"/>

            <div v-if="!$v.name.required || !$v.name.minLen" class="invalid-feedback">
              Name must be required and at least {{$v.name.$params.minLen.min}} characters.
            </div>
          </div>
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
            <input type="password" class="form-control" id="password"
                   v-model="password" @blur="$v.password.$touch()" :class="{'is-invalid': $v.password.$invalid}"/>
            <div v-if="!$v.password.required || !$v.password.minLen" class="invalid-feedback">
              Password must be have at least {{$v.password.$params.minLen.min}} characters length.
            </div>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" class="form-control" id="confirm-password"
                   v-model="confirmPassword" @blur="$v.confirmPassword.$touch()"
                   :class="{'is-invalid': $v.confirmPassword.$invalid}"/>
            <div v-if="!$v.confirmPassword.required || !$v.confirmPassword.sameAs" class="invalid-feedback">
              Confirm password must be equals than {{$v.confirmPassword.$params.sameAs.eq}} field.
            </div>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="check" v-model="check"
                   :class="{'is-invalid': $v.check.$invalid}"/>
            <label class="form-check-label" for="check">Accept Terms & Conditions</label>
            <div v-if="!$v.check.sameAs" class="invalid-feedback">
              You must agree before submitting
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">
            Register
            <font-awesome-icon icon="user-plus" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      check: false
    }
  },
  validations: {
    name: {
      required,
      minLen: minLength(6)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    },
    check: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms
      }

      this.$store.dispatch('auth/register', formData)
    }
  }
}
</script>
