export default {
  methods: {
    auth_signInWithGoogle () {
      this.$store.dispatch('auth/signInWithGoogle')
        .then(this.auth_successRedirect)
        .catch(e => alert(`🤷‍♂️ ${e.message}`))
    },
    auth_successRedirect () {
      const redirectTo = this.$route.query.redirectTo || {name: 'home'}
      this.$router.push(redirectTo)
    }
  }
}
