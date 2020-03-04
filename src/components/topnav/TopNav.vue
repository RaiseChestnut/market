<template>
  <div id="topnav">
    <nav-bar class="nav-bar" :border="false">
      <span slot="title">购物街</span>
    </nav-bar>
  </div>
</template>

<script>
import { NavBar } from "vant";
export default {
  name: "TopNav",
  components: {
    NavBar
  }
};
</script>

<style scoped lang= 'less'>
.nav-bar {
  background-color: #fa7ea4;
  span {
    font-size: 14px;
    color: #fff;
  }
}
</style>
