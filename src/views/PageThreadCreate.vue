<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <thread-editor
      ref="editor"
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
    name: 'PageThreadCreate',
    components: {ThreadEditor},
    mixins: [asyncDataMixin, createThreadEditorMixin('editor')],
    props: {
      forumId: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return this.$store.state.forums.items[this.forumId]
      }
    },

    methods: {
      ...mapActions('threads', ['createThread']),
      ...mapActions('forums', ['fetchForum']),
      save ({title, text}) {
        this.createThread({
          forumId: this.forum['.key'],
          title,
          text
        }).then(thread => {
          this.threadEditorLeaveConfirmation_saved()
          this.$router.push({name: 'threadShow', params: {id: thread['.key']}})
        })
      },
      cancel () {
        this.$router.push({name: 'forum', params: {id: this.forum['.key']}})
      }
    },
    created () {
      this.fetchForum({id: this.forumId})
        .then(this.asyncDataStatus_fetched)
    }
  }
</script>

<style scoped>

</style>
