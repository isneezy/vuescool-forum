<template>
  <div class="flex-grid justify-center">
    <div class="col-2">

      <form action="" class="card card-form">
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="form.name" id="name" type="text" class="form-input">
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="form.username" id="username" type="text" class="form-input">
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="email" class="form-input">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="form.password" id="password" type="password" class="form-input">
        </div>

        <div class="form-group">
          <label for="avatar">Avatar</label>
          <input v-model="form.avatar" id="avatar" type="text" class="form-input">
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
import authMixin from '@/mixins/auth'
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
  methods: {
    register () {
      this.$store.dispatch('createUserWithEmailAndPassword', this.form)
        .then(this.auth_successRedirect)
    },
    registerWithGoogle () {
      this.signInWithGoogle()
    }
  },
  created () {
    this.$emit('ready')
  }
}
</script>

<style scoped>
</style>
