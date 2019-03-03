import { countObjectProerties } from '../utils'

export default {
  authUser: state => state.authId ? state.users[state.authId] : null,
  userThreadsCount: state => id => countObjectProerties(state.users[id].threads),
  userPostsCount: state => id => countObjectProerties(state.users[id].posts),
  threadRepliesCount: state => id => countObjectProerties(state.threads[id].posts) - 1
}
