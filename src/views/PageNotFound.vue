<template>
    <div class="col-full"
            :class="$style.centered">
        <h1 :class="$style.headImgLarge">Not Found</h1>
        <p :class="$style.textLarge">Ooops, we couldin't find what you are looking for. whiy don't you
            <router-link :to="{name: 'home'}">go home instead?</router-link>
        </p>
    </div>
</template>

<script>
export default {
  created () {
    this.$emit('ready')
  }
}
</script>

<style module>
    .headImgLarge {
        font-size: 100px;
    }

    .textLarge{
        font-size: 50px;
        font-weight: 100;
    }

    .centered {
        text-align: center;
    }
</style>
