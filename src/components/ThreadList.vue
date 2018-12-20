<template>
    <div class="thread-list">

        <h2 class="list-title">Threads</h2>

        <thread-list-item
                :key="thread['.key']"
                v-for="thread in threads"
                :thread="thread"/>
    </div>
</template>

<script>
  import ThreadListItem from './ThreadListItem'
  export default {
    name: 'ThreadList',
    props: {
      threads: {required: true, type: Array}
    },
    components: {ThreadListItem}
  }
</script>

<style scoped>

</style>
