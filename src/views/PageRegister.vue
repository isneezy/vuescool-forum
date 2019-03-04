<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form action="" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            @blur="$v.form.name.$touch()"
            v-model.lazy="form.name"
            id="name" type="text" class="form-input">
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            @blur="$v.form.username.$touch()"
            v-model="form.username"
            id="username" type="text" class="form-input">
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! This username has been taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            @blur="$v.form.email.$touch()"
            v-model.lazy="form.email"
            id="email" type="email" class="form-input">
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.email.email" class="form-error">This is not a valid email address</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! This email has been taken</span>
          </template>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            @blur="$v.form.password.$touch()"
            v-model="form.password"
            id="password" type="password" class="form-input">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.password.minLength" class="form-error">The password must be at least 6 characters long</span>
          </template>
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input
            @blur="$v.form.avatar.$touch()"
            v-model.lazy="form.avatar"
            id="avatar" type="text" class="form-input">
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error">This is not valid url</span>
            <span v-if="!$v.form.avatar.supportedFormat" class="form-error">Image format not supported</span>
            <span v-if="!$v.form.avatar.responseOk" class="form-error">Image does not exists</span>
          </template>
        </div>

        <div class="form-actions">
          <button @click.prevent="register" type="submit" class="btn-blue btn-block">Register</button>
        </div>

      </form>
      <div class="text-center push-top">
        <button @click.prevent="registerWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign up with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
import {required, email, minLength, url} from 'vuelidate/lib/validators'
import authMixin from '@/mixins/auth'
import { responseOk, supportedFormat, uniqueEmail, uniqueUsername } from '../utils/validators'
export default {
  mixins: [authMixin],
  data () {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null
      }
    }
  },
  validations: {
    form: {
      name: {required},
      username: {required, unique: uniqueUsername},
      email: {required, email, unique: uniqueEmail},
      password: {required, minLength: minLength(6)},
      avatar: {url, supportedFormat, responseOk}
    }
  },
  methods: {
    register () {
      this.$v.form.$touch()

      if (this.$v.form.$invalid) return

      this.$store.dispatch('auth/createUserWithEmailAndPassword', this.form)
        .then(this.auth_successRedirect)
    },
    registerWithGoogle () {
      this.auth_signInWithGoogle()
    }
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>
</style>
