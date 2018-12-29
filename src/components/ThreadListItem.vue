<template>
    <div class="thread">
        <div>
            <p>
                <router-link :to="{name: 'threadShow', params: {id: thread['.key']}}">{{ thread.title }}</router-link>
            </p>
            <p class="text-faded text-xsmall">
                By <a href="#">{{ user.name }}</a>, <app-date :timestamp="thread.publishedAt"/>.
            </p>
        </div>

        <div class="activity">
            <p class="replies-count">
                {{ repliesCount }} replies
            </p>

            <!--<img class="avatar-medium" :src="user.avatar" alt="">-->

            <!--<div>-->
                <!--<p class="text-xsmall">-->
                    <!--<a href="#">Bruce Wayne</a>-->
                <!--</p>-->
                <!--<p class="text-xsmall text-faded">2 hours ago</p>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ThreadListItem',
    props: {
      thread: {required: true, type: Object}
    },
    computed: {
      repliesCount () {
        return Object.keys(this.thread.posts).length - 1
      },
      user () {
        return this.$store.state.users[this.thread.userId]
      }
    }
  }
</script>

<style scoped>

</style>
