<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form @submit.prevent="signIn" action="" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            @blur="$v.form.email.$touch"
            v-model="form.email"
            id="email" type="text" class="form-input">
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.email.email" class="form-error">This is not valid email</span>
          </template>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            @blur="$v.form.password.$touch"
            v-model="form.password"
            id="password" type="password" class="form-input">
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
          </template>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'register'}">Create an account?</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button @click="auth_signInWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Sign in with Google</button>
      </div>
    </div>
  </div>
</template>

<script>
import {email, required} from 'vuelidate/lib/validators'
import authMixin from '@/mixins/auth'
export default {
  mixins: [authMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    }
  }),
  validations: {
    form: {
      email: {required, email},
      password: {required}
    }
  },
  methods: {
    signIn () {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) return

      this.$store.dispatch('auth/signInWithUsernameAndPassword', this.form)
        .then(this.auth_successRedirect)
        .catch(e => alert(`🤷‍♂️ ${e.message}`))
    }
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>

</style>
