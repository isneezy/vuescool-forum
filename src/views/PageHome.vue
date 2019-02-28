<template>
    <div v-if="asyncDataStatus_ready" class="col-full push-top">
        <h1>Welcome to the Forum</h1>
        <category-list :categories="categories"/>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import CategoryList from '../components/CategoryList'
import asyncDataMixin from '../mixins/asyncDataStatus'

export default {
  components: {CategoryList},
  mixins: [asyncDataMixin],
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
      .then(categories => Promise.all(Object.values(categories).map(category => this.fetchForums({ids: category.forums}))))
      .then(this.asyncDataStatus_fetched)
  }
}
</script>
