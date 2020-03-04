<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/tabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
}
ul,
ol,
li {
  list-style: none;
}
img {
  display: block;
}
</style>
