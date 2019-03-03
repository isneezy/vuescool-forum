<template>
  <div class="flex-grid">
    <user-profile-card
      v-if="!edit"
      :user="user"
    />

    <user-profile-card-editor
      v-else
      :user="user"
    />

    <div class="col-7 push-top">

      <div class="profile-header">
        <span class="text-lead">
            {{ user.username }}'s recent activity
        </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr>

      <post-list :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import asyncDataMixin from '@/mixins/asyncDataStatus'
import PostList from '../components/PostList'
import UserProfileCard from '../components/UserProfileCard'
import UserProfileCardEditor from '../components/UserProfileCardEditor'

export default {
  name: 'PageProfile',
  components: {UserProfileCardEditor, UserProfileCard, PostList},
  mixins: [asyncDataMixin],
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
    userPosts () {
      return this.$store.getters.userPosts(this.user['.key'])
    }
  },
  created () {
    this.$store.dispatch('fetchPosts', {ids: this.user.posts})
        .then(this.asyncDataStatus_fetched)
  }
}
</script>

<style scoped>

</style>
