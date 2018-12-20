<template>
    <div class="col-full">
        <h1>Welcome to the Forum</h1>
        <tread-list :threads="threads"/>
    </div>
</template>

<script>
import sourceData from '@/data'
import TreadList from '../components/ThreadList'

export default {
  components: {TreadList},
  data () {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>
