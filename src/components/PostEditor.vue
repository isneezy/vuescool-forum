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
            <button @click.prevent="cancel" v-if="isUpdate" class="btn btn-ghost">Cancel</button>
            <button class="btn-blue">{{ isUpdate ? 'Update post' : 'Submit Post'}}</button>
        </div>
    </form>
</template>

<script>
  export default {
    name: 'PostEditor',

    props: {
      threadId: {
        type: String
      },
      post: {
        type: Object,
        validator: obj => {
          const keyIsValid = typeof obj['.key'] === 'string'
          const textIsValid = typeof obj.text === 'string'
          const valid = keyIsValid && textIsValid
          if (!keyIsValid) {
            console.error('The post prop object must include a `key` attribute.')
          }
          if (!textIsValid) {
            console.error('The post prop object must include a `text` attribute.')
          }
          return valid
        }
      }
    },

    data () {
      return {
        text: this.post ? this.post.text : ''
      }
    },
    computed: {
      isUpdate () {
        return !!this.post
      }
    },
    methods: {
      save () {
        this.persist()
          .then((post) => {
            this.$emit('save', {post})
          })
      },

      create: function () {
        const post = {
          text: this.text,
          threadId: this.threadId
        }

        this.text = ''

        return this.$store.dispatch('createPost', post)
      },
      update () {
        return this.$store.dispatch('updatePost', {
          postId: this.post['.key'],
          text: this.text
        })
      },
      persist () {
        return this.isUpdate ? this.update() : this.create()
      },

      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

</style>
