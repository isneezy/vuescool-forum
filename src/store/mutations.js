import Vue from 'vue'

const makeAppendChildToParentMutation = ({parent, child}) =>
  (state, {parentId, childId}) => {
    const resource = state[parent][parentId]

    if (!resource[child]) {
      Vue.set(resource, child, {})
    }

    Vue.set(resource[child], childId, childId)
  }

export default {
  setPost (state, {postId, post}) {
    Vue.set(state.posts, postId, post)
  },

  setUser (state, {userId, user}) {
    Vue.set(state.users, userId, user)
  },

  setThread (state, {threadId, thread}) {
    Vue.set(state.threads, threadId, thread)
  },

  setItem (state, {item, resource, id}) {
    item['.key'] = id
    Vue.set(state[resource], id, item)
  },

  setAuthId (state, id) {
    state.authId = id
  },

  appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
  appendContributorToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'contributors'}),
  appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
  appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
  appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
}
