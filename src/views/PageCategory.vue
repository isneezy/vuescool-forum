<template>
  <div v-if="category" class="col-full">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
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
    },
    methods: {
      ...mapActions(['fetchCategory', 'fetchForums'])
    },
    created () {
      this.fetchCategory({id: this.id})
        .then(category => this.fetchForums({ids: category.forums}))
    }
  }
</script>

<style scoped>

</style>
