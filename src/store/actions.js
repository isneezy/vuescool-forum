import firebase from 'firebase/app'
import store from './index'
import { removeEmpyProperties } from '../utils'

export default {
  createPost ({commit, state}, post) {
    const postId = firebase.database().ref('posts').push().key
    post.userId = state.authId
    post.publishedAt = Math.floor(Date.now() / 1000)

    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`threads/${post.threadId}/posts/${postId}`] = postId
    updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
    updates[`users/${post.userId}/posts/${postId}`] = postId

    return firebase.database().ref().update(updates).then(() => {
      commit('setItem', {id: postId, item: post, resource: 'posts'})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendContributorToThread', {parentId: post.threadId, childId: post.userId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})
      return Promise.resolve(state.posts[postId])
    })
  },

  updatePost ({commit, state}, {postId, text}) {
    const post = state.posts[postId]
    const edited = {
      at: Math.floor(Date.now() / 1000),
      by: state.authId
    }

    const updates = {text, edited}

    return firebase.database().ref('posts').child(postId).update(updates).then(() => {
      commit('setPost', {postId, post: {...post, text, edited}})
      return Promise.resolve(post)
    })
  },

  createThread ({state, commit, dispatch}, {text, title, forumId}) {
    const threadId = firebase.database().ref('threads').push().key
    const postId = firebase.database().ref('posts').push().key
    const userId = state.authId
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
      commit('setItem', {id: threadId, item: thread, resource: 'threads'})
      commit('appendThreadToForum', {parentId: forumId, childId: threadId})
      commit('appendThreadToUser', {parentId: userId, childId: threadId})
      // update post
      commit('setItem', {id: postId, item: post, resource: 'posts'})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})

      return Promise.resolve(state.threads[threadId])
    })
  },

  updateThread ({commit, state, dispatch}, {id, title, text}) {
    const thread = {...state.threads[id], title}
    const post = {...state.posts[thread.firstPostId], text}

    const edited = {
      at: Math.floor(Date.now() / 1000),
      by: state.authId
    }

    const updates = {}
    updates[`posts/${thread.firstPostId}/text`] = text
    updates[`posts/${thread.firstPostId}/edited`] = edited
    updates[`threads/${id}/title`] = title

    return firebase.database().ref().update(updates).then(() => {
      commit('setThread', {threadId: id, thread})
      commit('setPost', {postId: thread.firstPostId, post: {...post, text, edited}})
      return Promise.resolve(thread)
    })
  },

  createUser ({commit, state}, {id, email, name, username, avatar = null}) {
    return new Promise((resolve, reject) => {
      const registeredAt = Math.floor(Date.now() / 1000)
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = {avatar, email, name, username, usernameLower, registeredAt}
      firebase.database().ref('users').child(id).set(user).then(() => {
        commit('setItem', {resource: 'users', id, item: user})
        resolve(state.users[id])
      }, reject)
    })
  },

  createUserWithEmailAndPassword ({dispatch}, {email, name, username, password, avatar = null}) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(({user}) => dispatch('createUser', {id: user.uid, email, name, username, avatar}))
  },

  signInWithUsernameAndPassword (context, {email, password}) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },

  signInWithGoogle ({dispatch}) {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
      .then(data => {
        const user = data.user
        firebase.database().ref('users').child(user.uid).once('value', snapshot => {
          if (!snapshot.exists()) {
            return dispatch('createUser', {id: user.uid, email: user.email, name: user.displayName, username: user.email, avatar: user.photoURL})
              .then(() => dispatch('fetchAuthUser'))
          }
        })
      })
  },

  signOut ({commit}) {
    firebase.auth().signOut().then(() => commit('setAuthId', null))
  },

  fetchAuthUser ({dispatch, commit}, id) {
    id = firebase.auth().currentUser.uid
    return new Promise(resolve => {
      firebase.database().ref('users').child(id).once('value', snapshot => {
        if (snapshot.exists()) {
          return dispatch('fetchUser', {id})
            .then(user => {
              commit('setAuthId', id)
              resolve(user)
            })
        } else {
          resolve(null)
        }
      })
    })
  },

  initAuthentication ({commit, state}) {
    return new Promise(resolve => {
      if (state.unsubscribeAuthObserver) state.unsubscribeAuthObserver()
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        commit('setUnsubscribeAuthObserver', unsubscribe)
        console.log('👣 Auth changed')
        if (user) {
          store.dispatch('fetchAuthUser')
            .then(resolve)
        } else {
          resolve(null)
        }
      })
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

  fetchAllCategories ({commit, state}) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const categoriesObject = snapshot.val()
        Object.keys(categoriesObject).forEach(id => {
          commit('setItem', {id, resource: 'categories', item: categoriesObject[id]})
        })
        resolve(state.categories)
      }, reject)
    })
  },

  fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'categories'}),

  fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'forums'}),
  fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'forums'}),

  fetchThreads: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'threads'}),
  fetchThread: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'threads'}),

  fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'users'}),

  fetchPost: ({dispatch}, {id}) => dispatch('fetchItem', {id, resource: 'posts'}),
  fetchPosts: ({dispatch}, {ids}) => dispatch('fetchItems', {ids, resource: 'posts'}),

  fetchItem ({commit, state}, {id, resource, emoji = '📃'}) {
    return new Promise((resolve, reject) => {
      console.log(`🔥 ${emoji}`, id)
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        const item = snapshot.val()
        commit('setItem', {resource, id: snapshot.key, item})
        return resolve(state[resource][id])
      }, reject)
    })
  },
  fetchItems ({dispatch}, {ids, resource, emoji}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
  }
}
