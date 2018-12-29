<template>
    <form @submit.prevent="save">
        <div class="from-group">
                <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        class="form-input"
                        v-model="text"
                ></textarea>
        </div>
        <div class="form-actions">
            <button class="btn-blue">Submit Post</button>
        </div>
    </form>
</template>

<script>
  export default {
    name: 'PostEditor',

    props: {
      threadId: {required: true, type: String},
      userId: {required: true, type: String}
    },

    data () {
      return {
        text: ''
      }
    },
    methods: {
      save () {
        const post = {
          text: this.text,
          publishedAt: Math.floor(Date.now() / 1000),
          threadId: this.threadId,
          userId: this.userId
        }

        this.text = ''

        this.$emit('save', {post})
        this.$store.dispatch('createPost', post)
      }
    }
  }
</script>

<style scoped>

</style>
