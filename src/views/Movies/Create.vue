<template>
  <div class="col-6 offset-3">
    <div class="card mt-5">
      <h5 class="card-header">
        Adding movie...
      </h5>
      <div class="card-body">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title"
                   @blur="$v.title.$touch()" :class="{'is-invalid': $v.title.$invalid}"/>

            <div v-if="!$v.title.required || !$v.title.minLen" class="invalid-feedback">
              Title must be required and at least {{$v.title.$params.minLen.min}} characters.
            </div>
          </div>
          <button type="submit" class="btn btn-success" :disabled="$v.$invalid">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'Create',
  data () {
    return {
      title: ''
    }
  },
  validations: {
    title: {
      required,
      minLen: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        title: this.title
      }

      this.$store.dispatch('movies/createMovie', formData)
    }
  }
}
</script>
