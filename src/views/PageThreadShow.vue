<template>
    <div class="col-full">
        <h1>{{ thread.title }}</h1>
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
    data () {
      return {
        thread: this.$store.state.threads[this.id]
      }
    },

    computed: {
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
