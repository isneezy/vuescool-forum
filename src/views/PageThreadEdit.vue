<template>
  <div v-if="thread && text" class="col-full push-top">

    <h1>Editing <i>{{ thread.title }}</i></h1>

    <thread-editor
      ref="editor"
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
  import asyncDataMixin from '../mixins/asyncDataStatus'
  import createThreadEditorMixin from '../mixins/createThreadEditorLeaveConfirmation'
  export default {
    name: 'PageThreadEdit',
    components: {ThreadEditor},
    mixins: [asyncDataMixin, createThreadEditorMixin('editor')],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      thread () {
        return this.$store.state.threads.items[this.id]
      },
      text () {
        const post = this.$store.state.posts.items[this.thread.firstPostId]
        return post ? post.text : null
      }
    },

    methods: {
      ...mapActions('threads', ['updateThread', 'fetchThread']),
      ...mapActions('posts', ['fetchPost']),
      save ({title, text}) {
        this.updateThread({
          id: this.id,
          title,
          text
        }).then(thread => {
          this.threadEditorLeaveConfirmation_saved()
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
        .then(this.asyncDataStatus_fetched)
    }
  }
</script>

<style scoped>

</style>
