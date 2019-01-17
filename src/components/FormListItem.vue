<template>
    <div class="forum-listing">
        <div class="forum-details">
            <router-link class="text-xlarge"
                         :to="{name: 'forum', params: {id: forum['.key']}}"
            >{{ forum.name }}</router-link>

            <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count">
            <p>
                <span class="count">{{ threadsCount }}</span>
                <span>{{ threadsCount === 1 ? 'thread' : 'threads' }}</span>
            </p>
        </div>

        <div class="last-thread">
            <!--todo implement-->
        </div>
    </div>
</template>

<script>
  import { countObjectProerties } from '@/utils'
  export default {
    name: 'FormListItem',
    props: {
      forum: {
        required: true,
        type: Object
      }
    },
    computed: {
      threadsCount () {
        return countObjectProerties(this.forum.threads)
      }
    }
  }
</script>

<style scoped>

</style>
