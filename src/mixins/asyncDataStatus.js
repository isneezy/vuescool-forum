export default {
  data: () => ({
    asyncDataStatus_ready: false
  }),

  methods: {
    asyncDataStatus_fetched () {
      this.asyncDataStatus_ready = true
      this.$emit('ready')
      return Promise.resolve(this.asyncDataStatus_ready)
    }
  }
}
