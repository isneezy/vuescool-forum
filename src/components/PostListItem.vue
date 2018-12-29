<template>
    <div class="post">

        <div class="user-info">
            <a href="#" class="user-name">{{ user.name }}</a>

            <a href="#">
                <img class="avatar-large" :src="user.avatar" :alt="user.name">
            </a>

            <p class="desktop-only text-small">{{ userPostCount }} posts</p>

        </div>

        <div class="post-content">
            <div>
                {{ post.text }}
            </div>
        </div>



        <app-date class="post-date text-faded"
                  :timestamp="post.publishedAt"/>
    </div>
</template>

<script>
  import sourceData from '@/data.json'
  export default {
    name: 'PostListItem',
    props: {
      post: {type: Object, required: true}
    },
    computed: {
      user () {
        return sourceData.users[this.post.userId]
      },
      userPostCount () {
        return Object.keys(this.user.posts).length
      }
    }
  }
</script>

<style scoped>

</style>
