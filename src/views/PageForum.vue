<template>
    <div class="forum-wrapper">
        <div class="col-full push-top">
            <div class="forum-header">
                <div class="forum-details">
                    <h1>{{ forum.name }}</h1>
                    <p class="text-lead">Discuss your passion for food and cooking</p>
                </div>
                <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
            </div>
        </div>

        <div class="col-full push-top">
            <thread-list :threads="threads"/>
        </div>

    </div>
</template>

<script>
  import sourceData from '@/data.json'
  import ThreadList from '../components/ThreadList'
  export default {
    name: 'PageForum',
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return sourceData.forums[this.id]
      },
      threads () {
        return Object.values(sourceData.threads)
          .filter(thread => thread.forumId === this.id)
      }
    },
    components: {ThreadList}
  }
</script>

<style scoped>
 .forum-wrapper {
     width: 100%;
 }
</style>
