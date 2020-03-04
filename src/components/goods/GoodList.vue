<template>
  <div id="goodList">
    <good-list-item v-for="item in cgoods" :listItem='item'></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "components/goods/GoodListItem";
export default {
  name: "GoodList",
  props:{
    cgoods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
};
</script>

<style scoped lang= 'less'>
#goodList {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 8px 0 0 8px;
  color: #666
}
</style>
