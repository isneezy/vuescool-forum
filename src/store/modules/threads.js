import Vue from 'vue'
import firebase from 'firebase/app'
import { countObjectProerties } from '../../utils'
import { makeAppendChildToParentMutation } from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    threadRepliesCount: state => id => countObjectProerties(state.items[id].posts) - 1
  },

  mutations: {
    setThread (state, {threadId, thread}) {
      Vue.set(state.items, threadId, thread)
    },
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'})
  },

  actions: {
    createThread ({state, commit, dispatch, rootState}, {text, title, forumId}) {
      const threadId = firebase.database().ref('threads').push().key
      const postId = firebase.database().ref('posts').push().key
      const userId = rootState.auth.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {title, forumId, userId, publishedAt, firstPostId: postId, posts: {}}
      thread.posts[postId] = postId
      const post = {text, publishedAt, threadId, userId}

      const updates = {}
      updates[`threads/${threadId}`] = thread
      updates[`forums/${forumId}/threads/${threadId}`] = threadId
      updates[`users/${userId}/threads/${threadId}`] = threadId

      updates[`posts/${postId}`] = post
      updates[`users/${post.userId}/posts/${postId}`] = postId

      return firebase.database().ref().update(updates).then(() => {
        // update thread
        commit('setItem', {id: threadId, item: thread, resource: 'threads'}, {root: true})
        commit('forums/appendThreadToForum', {parentId: forumId, childId: threadId}, {root: true})
        commit('users/appendThreadToUser', {parentId: userId, childId: threadId}, {root: true})
        // update post
        commit('setItem', {id: postId, item: post, resource: 'posts'}, {root: true})
        commit('appendPostToThread', {parentId: post.threadId, childId: postId})
        commit('users/appendPostToUser', {parentId: post.userId, childId: postId}, {root: true})

        return Promise.resolve(state.items[threadId])
      })
    },
    updateThread ({commit, state, dispatch, rootState}, {id, title, text}) {
      const thread = {...state.items[id], title}
      const post = {...rootState.posts.items[thread.firstPostId], text}

      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: rootState.auth.authId
      }

      const updates = {}
      updates[`posts/${thread.firstPostId}/text`] = text
      updates[`posts/${thread.firstPostId}/edited`] = edited
      updates[`threads/${id}/title`] = title

      return firebase.database().ref().update(updates).then(() => {
        commit('setThread', {threadId: id, thread})
        commit('posts/setPost', {postId: thread.firstPostId, post: {...post, text, edited}}, {root: true})
        return Promise.resolve(thread)
      })
    },
    fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'threads'}, {root: true}),
    fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'threads'}, {root: true})
  }
}
