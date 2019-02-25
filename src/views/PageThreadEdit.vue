<template>
  <div v-if="thread && text" class="col-full push-top">

    <h1>Editing <i>{{ thread.title }}</i></h1>

    <thread-editor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor'
  export default {
    name: 'PageThreadEdit',
    components: {ThreadEditor},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      thread () {
        return this.$store.state.threads[this.id]
      },
      text () {
        const post = this.$store.state.posts[this.thread.firstPostId]
        return post ? post.text : null
      }
    },

    methods: {
      ...mapActions(['updateThread', 'fetchThread', 'fetchPost']),
      save ({title, text}) {
        this.$store.dispatch('updateThread', {
          id: this.id,
          title,
          text
        }).then(thread => {
          this.$router.push({name: 'threadShow', params: {id: thread['.key']}})
        })
      },
      cancel () {
        this.$router.push({name: 'threadShow', params: {id: this.id}})
      }
    },

    created () {
      this.fetchThread({id: this.id})
        .then(thread => this.fetchPost({id: thread.firstPostId}))
    }
  }
</script>

<style scoped>

</style>
