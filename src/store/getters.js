import { countObjectProerties } from '../utils'

export default {
  authUser: state => state.authId ? state.users[state.authId] : null,
  userPosts: state => id => {
    if (state.users[id].posts) {
      return Object.values(state.posts)
        .filter(post => post.userId === id)
    }
    return []
  },
  userThreadsCount: state => id => countObjectProerties(state.users[id].threads),
  userPostsCount: state => id => countObjectProerties(state.users[id].posts),
  threadRepliesCount: state => id => countObjectProerties(state.threads[id].posts) - 1
}
