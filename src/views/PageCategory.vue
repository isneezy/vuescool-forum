<template>
  <div v-if="asyncDataStatus_ready" class="col-full">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import CategoryListItem from '../components/CategoryListItem'
  import asyncDataMixin from '../mixins/asyncDataStatus'

  export default {
    name: 'PageCategory',
    components: {CategoryListItem},
    mixins: [asyncDataMixin],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      category () {
        return this.$store.state.categories.items[this.id]
      }
    },
    methods: {
      ...mapActions('categories', ['fetchCategory']),
      ...mapActions('forums', ['fetchForums'])
    },
    created () {
      this.fetchCategory({id: this.id})
        .then(category => this.fetchForums({ids: category.forums}))
        .then(this.asyncDataStatus_fetched)
    }
  }
</script>

<style scoped>

</style>
