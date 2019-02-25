<template>
    <div class="col-full push-top">
        <h1>Welcome to the Forum</h1>
        <category-list :categories="categories"/>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import CategoryList from '../components/CategoryList'

export default {
  components: {CategoryList},
  computed: {
    ...mapState({
      categories: state => Object.values(state.categories)
    })
  },
  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])
  },
  created () {
    this.fetchAllCategories()
      .then(categories => {
        Object.values(categories).forEach(category => this.fetchForums({ids: category.forums}))
      })
  }
}
</script>
