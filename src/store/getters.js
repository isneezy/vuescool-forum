import { countObjectProerties } from '../utils'

export default {
  authUser: state => state.users[state.authId],
  userThreadsCount: state => id => countObjectProerties(state.users[id].threads),
  userPostsCount: state => id => countObjectProerties(state.users[id].posts),
  threadRepliesCount: state => id => countObjectProerties(state.threads[id].posts) - 1
}
