<template>
  <div id="maintabbar">
    <tabbar v-model="active"  active-color="#ff4040">
      <tabbar-item icon='wap-home' to='/home'>首页</tabbar-item>
      <tabbar-item icon='bars' to='/sort'>分类</tabbar-item>
      <tabbar-item icon='cart' to='/cart'>购物车</tabbar-item>
      <tabbar-item icon='manager' to='/user'>个人</tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "MainTabBar",
  components: {
    Tabbar,
    TabbarItem
  },
  data(){
    return {
      active:0
    }
  }
};
</script>

<style scoped>
</style>
