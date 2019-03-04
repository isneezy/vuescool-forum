import Vue from 'vue'
import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {},

  mutations: {
    setPost (state, {postId, post}) {
      Vue.set(state.items, postId, post)
    }
  },

  actions: {
    createPost ({commit, state, rootState}, post) {
      const postId = firebase.database().ref('posts').push().key
      post.userId = rootState.auth.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      const updates = {}
      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
      updates[`users/${post.userId}/posts/${postId}`] = postId

      return firebase.database().ref().update(updates).then(() => {
        commit('setItem', {id: postId, item: post, resource: 'posts'}, {root: true})
        commit('threads/appendPostToThread', {parentId: post.threadId, childId: postId}, {root: true})
        commit('threads/appendContributorToThread', {parentId: post.threadId, childId: post.userId}, {root: true})
        commit('users/appendPostToUser', {parentId: post.userId, childId: postId}, {root: true})
        return Promise.resolve(state.items[postId])
      })
    },
    updatePost ({commit, state, rootState}, {postId, text}) {
      const post = state.items[postId]
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: rootState.auth.authId
      }

      const updates = {text, edited}

      return firebase.database().ref('posts').child(postId).update(updates).then(() => {
        commit('setPost', {postId, post: {...post, text, edited}})
        return Promise.resolve(post)
      })
    },
    fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'posts'}, {root: true}),
    fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'posts'}, {root: true})
  }
}
