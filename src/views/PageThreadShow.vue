<template>
  <div class="col-large push-top">
    <template v-if="thread && user">
      <h1>{{ thread.title }}
        <router-link
          :to="{name: 'threadEdit', params: {id: this.id}}"
          class="btn-green btn-small"
          tag="button">
          Edit Thread
        </router-link>
      </h1>

      <p>
        By <a href="#" class="link-unstyled">{{ user.name }}</a>, 2 hours ago.
        <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ repliesCount }} replies by {{ contributorsCount }} contributors</span>
      </p>

      <post-list :posts="posts"/>
      <post-editor
        :thread-id="id"
        user-id="7uVPJS9GHoftN58Z2MXCYDqmNAh2"/>
    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {countObjectProerties} from '../utils'
  import PostList from '../components/PostList'
  import PostEditor from '../components/PostEditor'

  export default {
    components: {PostEditor, PostList},
    props: {
      id: {required: true, type: String}
    },
    computed: {
      thread () {
        return this.$store.state.threads[this.id]
      },
      repliesCount () {
        return this.$store.getters.threadRepliesCount(this.thread['.key'])
      },

      user () {
        return this.$store.state.users[this.thread.userId]
      },

      contributorsCount () {
        return countObjectProerties(this.thread.contributors)
      },
      posts () {
        const postIds = Object.keys(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    },
    methods: {
      ...mapActions(['fetchThread', 'fetchPosts', 'fetchUser'])
    },
    created () {
      this.fetchThread({id: this.id}).then(thread => {
        this.fetchUser({id: thread.userId})
        this.fetchPosts({ids: Object.keys(thread.posts)}).then(posts => {
          posts.forEach(post => {
            this.fetchUser({id: post.userId})
          })
        })
      })
    }
  }
</script>

<style scoped>
</style>
