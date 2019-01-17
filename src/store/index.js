import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost ({commit}, post) {
      const postId = 'greatpost' + Math.random()
      post['.key'] = postId

      commit('setPost', {postId, post})
      commit('appendPostToThread', {threadId: post.threadId, postId})
      commit('appendPostToUser', {userId: post.userId, postId})
    },

    updateUser ({commit}, user) {
      commit('setUser', {user, userId: user['.key']})
    }
  },

  mutations: {
    setPost (state, {postId, post}) {
      Vue.set(state.posts, postId, post)
    },

    setUser (state, {userId, user}) {
      Vue.set(state.users, userId, user)
    },

    appendPostToThread (state, {threadId, postId}) {
      const thread = state.threads[threadId]
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser (state, {userId, postId}) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    }
  }
})
