<template>
  <div class="col-3 push-top">
    <div class="profile-card">

      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input
          @blur="$v.activeUser.username.$touch"
          v-model.lazy="activeUser.username"
          type="text" placeholder="Username" class="form-input text-lead text-bold">
        <template v-if="$v.activeUser.username.$error">
          <span v-if="!$v.activeUser.username.required" class="form-error">This field is required</span>
          <span v-if="!$v.activeUser.username.unique" class="form-error">This username has been taken</span>
        </template>
      </div>

      <div class="form-group">
        <input
          @blur="$v.activeUser.name.$touch"
          v-model="activeUser.name"
          type="text" placeholder="Full Name" class="form-input text-lead">
        <template v-if="$v.activeUser.name.$error">
          <span v-if="!$v.activeUser.name.required" class="form-error">This field is required</span>
        </template>
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          @blur="$v.activeUser.bio.$touch"
          v-model="activeUser.bio"
          class="form-input" id="user_bio" placeholder="Write a few words about yourself."></textarea>
        <template v-if="$v.activeUser.bio.$error">
          <span v-if="!$v.activeUser.bio.minLength" class="form-error">Your bio needs to be at least 12 characters long</span>
        </template>
      </div>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          @blur="$v.activeUser.website.$touch"
          v-model="activeUser.website"
          autocomplete="off" class="form-input" id="user_website">
        <template v-if="$v.activeUser.website.$error">
          <span v-if="!$v.activeUser.website.url" class="form-error">Website is not valid url</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          @blur="$v.activeUser.email.$touch"
          v-model.lazy="activeUser.email"
          autocomplete="off" class="form-input" id="user_email">
        <template v-if="$v.activeUser.email.$error">
          <span v-if="!$v.activeUser.email.required" class="form-error">Email is required</span>
          <span v-if="!$v.activeUser.email.unique" class="form-error">This email as been taken</span>
        </template>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          @blur="$v.activeUser.location.$touch"
          v-model="activeUser.location"
          autocomplete="off" class="form-input" id="user_location" value="You wish!">
        <template v-if="$v.activeUser.email.$error">
          <!--<span v-if="!$v.activeUser.email.required" class="form-error">Email is required</span>-->
        </template>
      </div>

      <div class="btn-group space-between">
        <button @click.prevent="cancel" class="btn-ghost">Cancel</button>
        <button @click.prevent="save" type="submit" class="btn-blue">Save</button>
      </div>
    </div>

    <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {required, minLength, url} from 'vuelidate/lib/validators'
import { uniqueEmail, uniqueUsername } from '../utils/validators'
export default {
  name: 'UserProfileCardEditor',
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      activeUser: {...this.user}
    }
  },

  validations: {
    activeUser: {
      username: {
        required,
        unique (value) {
          if (value.toLowerCase() === this.activeUser.username) return true
          return uniqueUsername(value)
        }
      },
      email: {
        required,
        unique (value) {
          if (value.toLowerCase() === this.activeUser.email) return true
          return uniqueEmail(value)
        }
      },
      name: {required},
      bio: {minLength: minLength(12)},
      website: {url},
      location: {}
    }
  },

  computed: {
    userThreadsCount () {
      return this.$store.getters['users/userThreadsCount'](this.user['.key'])
    },
    userPostsCount () {
      return this.$store.getters['users/userPostsCount'](this.user['.key'])
    }
  },

  methods: {
    ...mapActions('users', ['updateUser']),
    save () {
      this.$v.activeUser.$touch()
      if (this.$v.activeUser.$invalid) return
      this.updateUser({...this.activeUser})
      this.$router.push({name: 'profile'})
    },

    cancel () {
      this.$router.push({name: 'profile'})
    }
  }
}
</script>

<style scoped>

</style>
