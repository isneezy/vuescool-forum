<template>
    <div class="col-full">
        <h1>{{ thread.title }}</h1>
        <post-list :posts="posts"/>
        <post-editor
                :thread-id="id"
                user-id="7uVPJS9GHoftN58Z2MXCYDqmNAh2"
                @save="addPost"/>
    </div>
</template>

<script>
  import sourceData from '@/data'
  import PostList from '../components/PostList'
  import PostEditor from '../components/PostEditor'
  export default {
    components: {PostEditor, PostList},
    props: {
      id: {required: true, type: String}
    },
    data () {
      return {
        thread: sourceData.threads[this.id]
      }
    },

    computed: {
      posts () {
        const postIds = Object.keys(this.thread.posts)
        return Object.values(sourceData.posts)
          .filter(post => postIds.includes(post['.key']))
      }
    },

    methods: {
      addPost ({post}) {
        const postId = post['.key']
        this.$set(sourceData.posts, postId, post)
        this.$set(this.thread.posts, postId, postId)
        this.$set(sourceData.users[post.userId].posts, postId, postId)
      }
    }
  }
</script>

<style scoped>
</style>
