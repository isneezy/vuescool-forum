<template>
  <div class="flex-grid">
    <user-profile-card
      v-if="!edit"
      :user="user"
      :user-posts-count="userPostsCount"
      :user-threads-count="userThreadsCount"
    />

    <user-profile-card-editor
      v-else
      :user="user"
      :user-posts-count="userPostsCount"
      :user-threads-count="userThreadsCount"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
        <span class="text-lead">
            Joker's recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <post-list :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
  import PostList from '../components/PostList'
  import { mapGetters } from 'vuex'
  import { countObjectProerties } from '@/utils'
  import UserProfileCard from '../components/UserProfileCard'
  import UserProfileCardEditor from '../components/UserProfileCardEditor'

  export default {
    name: 'PageProfile',
    components: {UserProfileCardEditor, UserProfileCard, PostList},
    props: {
      edit: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'authUser'
      }),
      userThreadsCount () {
        return countObjectProerties(this.user.threads)
      },
      userPostsCount () {
        return countObjectProerties(this.user.posts)
      },

      userPosts () {
        if (this.user.posts) {
          return Object.values(this.$store.state.posts)
            .filter(post => post.userId === this.user['.key'])
        }
        return []
      }
    }
  }
</script>

<style scoped>

</style>
