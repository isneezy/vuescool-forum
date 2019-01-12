<template>
    <div class="col-full push-top">
        <h1>Welcome to the Forum</h1>
        <category-list :categories="categories"/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CategoryList from '../components/CategoryList'

export default {
  components: {CategoryList},
  computed: {
    ...mapState({
      categories: state => Object.values(state.categories)
    })
  }
}
</script>
