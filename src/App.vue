<template>
  <div id="app">
    <keep-alive include="Article">
      <router-view></router-view>
    </keep-alive>
    <keep-alive>
      <Aplayer></Aplayer>
    </keep-alive>
  </div>
</template>

<script>
import Aplayer from "@/components/Aplayer";
import {getMusicListById} from "@/api";

export default {
  name: 'App',
  components: {
    Aplayer
  },
  mounted() {
    this.$notify.success("本站已开放留言板功能，欢迎前往留下您的足迹!")
  },
}
</script>

<style>
@import url("./assets/css/App.css");

</style>
