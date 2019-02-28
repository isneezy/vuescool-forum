<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <thread-editor
      @save="save"
      @cancel="cancel"
    />

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import ThreadEditor from '@/components/ThreadEditor'
  import asyncDataMixin from '../mixins/asyncDataStatus'

  export default {
    name: 'PageThreadCreate',
    components: {ThreadEditor},
    mixins: [asyncDataMixin],
    props: {
      forumId: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return this.$store.state.forums[this.forumId]
      }
    },

    methods: {
      ...mapActions(['createThread', 'fetchForum']),
      save ({title, text}) {
        this.createThread({
          forumId: this.forum['.key'],
          title,
          text
        }).then(thread => {
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
