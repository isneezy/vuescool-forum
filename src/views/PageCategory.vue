<template>
  <div class="col-full">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
  import CategoryListItem from '../components/CategoryListItem'

  export default {
    name: 'PageCategory',
    components: {CategoryListItem},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    }
  }
</script>

<style scoped>

</style>
