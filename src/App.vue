<template>
  <div id="app">
    <the-nav-bar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TheNavBar from './components/TheNavBar'
export default {
  components: {TheNavBar}
}
</script>

<style>
@import "assets/css/style.css";
</style>
