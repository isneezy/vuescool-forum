<template>
  <div class="col-large push-top">
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
  </div>
</template>

<script>
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
        // find replies
        const replies = Object.keys(this.thread.posts)
          .filter(postId => postId !== this.thread.firstPostId)
          .map(postId => this.$store.state.posts[postId])
        // get user ids
        const usersIds = replies.map(post => post.userId)
        // count unique ids
        return usersIds.filter((userId, index) => index === usersIds.indexOf(userId)).length
      },
      posts () {
        const postIds = Object.keys(this.thread.posts)
        return Object.values(this.$store.state.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    }
  }
</script>

<style scoped>
</style>
