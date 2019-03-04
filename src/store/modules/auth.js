import firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubscribeAuthObserver: null
  },

  getters: {
    authUser: (state, getters, rootState) => state.authId ? rootState.users.items[state.authId] : null
  },

  mutations: {
    setAuthId (state, id) {
      state.authId = id
    },
    setUnsubscribeAuthObserver (state, unsubscribeAuthObserver) {
      state.unsubscribeAuthObserver = unsubscribeAuthObserver
    }
  },

  actions: {
    createUserWithEmailAndPassword ({dispatch}, {email, name, username, password, avatar = null}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({user}) => dispatch('users/createUser', {id: user.uid, email, name, username, avatar}, {root: true}))
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
              return dispatch('users/createUser', {id: user.uid, email: user.email, name: user.displayName, username: user.email, avatar: user.photoURL}, {root: true})
                .then(() => dispatch('fetchAuthUser'))
            }
          })
        })
    },

    signOut ({commit}) {
      return firebase.auth().signOut().then(() => commit('setAuthId', null))
    },

    fetchAuthUser ({dispatch, commit}, id) {
      id = firebase.auth().currentUser.uid
      return new Promise(resolve => {
        firebase.database().ref('users').child(id).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', {id}, {root: true})
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

    initAuthentication ({commit, dispatch, state}) {
      return new Promise(resolve => {
        if (state.unsubscribeAuthObserver) state.unsubscribeAuthObserver()
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          commit('setUnsubscribeAuthObserver', unsubscribe)
          console.log('👣 Auth changed')
          if (user) {
            dispatch('fetchAuthUser')
              .then(resolve)
          } else {
            resolve(null)
          }
        })
      })
    }
  }
}
