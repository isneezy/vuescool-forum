import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'
import { countObjectProerties } from '../utils'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {parentId, childId}) => {
    const resource = state[parent][parentId]

    if (!resource[child]) {
      Vue.set(resource, child, {})
    }

    Vue.set(resource[child], childId, childId)
  }

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser: state => state.users[state.authId],
    userThreadsCount: state => id => countObjectProerties(state.users[id].threads),
    userPostsCount: state => id => countObjectProerties(state.users[id].posts),
    threadRepliesCount: state => id => countObjectProerties(state.threads[id].posts) - 1
  },

  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', {postId, post})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})

      return Promise.resolve(state.posts[postId])
    },

    updatePost ({commit, state}, {postId, text}) {
      const post = state.posts[postId]
      commit('setPost', {
        postId,
        post: {
          ...post,
          text,
          edited: {
            at: Math.floor(Date.now() / 1000),
            by: state.authId
          }
        }
      })
      return Promise.resolve(post)
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      const threadId = 'greatThread' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {'.key': threadId, title, forumId, userId, publishedAt}
      commit('setThread', {threadId, thread})
      commit('appendThreadToForum', {parentId: forumId, childId: threadId})
      commit('appendThreadToUser', {parentId: userId, childId: threadId})

      return dispatch('createPost', {text, threadId}).then((post) => {
        commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
        return Promise.resolve(state.threads[threadId])
      })
    },

    updateThread ({commit, state, dispatch}, {id, title, text}) {
      const thread = {...state.threads[id], title}
      const post = {...state.posts[thread.firstPostId], text}
      commit('setThread', {threadId: id, thread})
      return dispatch('updatePost', {postId: thread.firstPostId, text: post.text}).then(() => {
        return Promise.resolve(thread)
      })
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

    setThread (state, {threadId, thread}) {
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }

})
