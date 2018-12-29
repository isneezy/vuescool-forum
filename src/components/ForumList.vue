<template>
  <div>
    <form-list-item
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </div>
</template>

<script>
import FormListItem from './FormListItem'

export default {
  name: 'ForumList',
  components: {FormListItem},
  props: {
    forums: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
