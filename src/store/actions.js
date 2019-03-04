import firebase from 'firebase/app'

export default {

  fetchItem ({commit, state}, {id, resource, emoji = '📃'}) {
    return new Promise((resolve, reject) => {
      console.log(`🔥 ${emoji} ${resource}`, id)
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        const item = snapshot.val()
        commit('setItem', {resource, id: snapshot.key, item})
        return resolve(state[resource].items[id])
      }, reject)
    })
  },
  fetchItems ({dispatch}, {ids, resource, emoji}) {
    if (!ids) ids = {}
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
  }
}
