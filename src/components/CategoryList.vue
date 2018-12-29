<template>
  <div>
    <category-list-item
      v-for="category in categories"
      :key="category['.key']"
      :category="category"
    />
  </div>
</template>

<script>
  import CategoryListItem from './CategoryListItem'
  export default {
    name: 'CategoryList',
    components: {CategoryListItem},
    props: {
      categories: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
