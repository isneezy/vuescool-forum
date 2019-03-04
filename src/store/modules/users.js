import Vue from 'vue'
import firebase from 'firebase/app'
import { countObjectProerties, removeEmpyProperties } from '../../utils'
import { makeAppendChildToParentMutation } from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    userPosts: (state, getters, rootState) => id => {
      if (state.items[id].posts) {
        return Object.values(rootState.posts.items)
          .filter(post => post.userId === id)
      }
      return []
    },
    userThreadsCount: state => id => countObjectProerties(state.items[id].threads),
    userPostsCount: state => id => countObjectProerties(state.items[id].posts)
  },

  mutations: {
    setUser (state, {userId, user}) {
      Vue.set(state.items, userId, user)
    },
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  },

  actions: {
    createUser ({commit, state}, {id, email, name, username, avatar = null}) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = {avatar, email, name, username, usernameLower, registeredAt}
        firebase.database().ref('users').child(id).set(user).then(() => {
          commit('setItem', {resource: 'users', id, item: user}, {root: true})
          resolve(state.items[id])
        }, reject)
      })
    },
    updateUser ({commit}, user) {
      const updates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(user['.key']).update(removeEmpyProperties(updates))
          .then(() => {
            commit('setUser', {user, userId: user['.key']})
            resolve(user)
          }, reject)
      })
    },
    fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'users'}, {root: true})
  }
}
