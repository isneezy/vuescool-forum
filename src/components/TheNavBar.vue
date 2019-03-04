<template>
  <header class="header" id="header" v-click-outside="closeMobileNav">

    <router-link :to="{name: 'home'}" class="logo">
      <img src="../assets/img/svg/vueschool-logo.svg">
    </router-link>

    <div class="btn-hamburger" @click="mobileNavOpen = !mobileNavOpen">
      <!-- use .btn-humburger-active to open the menu -->
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar" :class="{'navbar-open': mobileNavOpen}">

      <ul v-if="authUser">
        <li class="navbar-user">
          <a @click.prevent="userDropDownActive = !userDropDownActive" v-click-outside="closeUserDropDown">
            <img class="avatar-small" :src="authUser.avatar" :alt="authUser.username">
            <span>
              {{ authUser.name }}
              <img class="icon-profile" src="../assets/img/svg/arrow-profile.svg" alt=""/>
            </span>
          </a>
          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{'active-drop': userDropDownActive}">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{name: 'profile'}">View profile</router-link>
              </li>
              <li class="dropdown-menu-item"><router-link to="logout">Logout</router-link></li>
            </ul>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li class="navbar-user">
          <router-link :to="{name: 'signin'}">Sign In</router-link>
          <router-link :to="{name: 'register'}">Register</router-link>
        </li>
      </ul>

      <ul>
        <!--<li class="navbar-item">-->
          <!--<router-link to="/">Home</router-link>-->
        <!--</li>-->
        <!--<li class="navbar-item">-->
          <!--<a href="category.html">Category</a>-->
        <!--</li>-->
        <!--<li class="navbar-item">-->
          <!--<a href="forum.html">Forum</a>-->
        <!--</li>-->
        <!--<li class="navbar-item">-->
          <!--<a href="thread.html">Thread</a>-->
        <!--</li>-->
        <!-- Show these option only on mobile-->
        <template v-if="authUser">
          <li class="navbar-item mobile-only">
            <router-link :to="{name: 'profile'}">View profile</router-link>
          </li>
          <li class="navbar-item mobile-only">
            <router-link to="logout">Logout</router-link>
          </li>
        </template>
        <template v-else>
          <li class="navbar-item">
            <router-link :to="{name: 'signin'}">Sign In</router-link>
          </li>
          <li class="navbar-item">
            <router-link :to="{name: 'register'}">Register</router-link>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import ClickOutside from '../directives/click-outside'

export default {
  name: 'TheNavBar',
  directives: {ClickOutside},
  data: () => ({
    userDropDownActive: false,
    mobileNavOpen: false
  }),
  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    })
  },
  methods: {
    closeUserDropDown () {
      this.userDropDownActive = false
    },
    closeMobileNav () {
      this.mobileNavOpen = false
    }
  }
}
</script>

<style scoped>

</style>
