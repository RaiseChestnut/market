<template>
  <div class="DetailInfo" v-if="cdetailInfo.detailImage">
    <div class="desc" >{{cdetailInfo.detailImage[0].desc}}</div>
    <div class="key">{{cdetailInfo.detailImage[0].key}}</div>
    <img
      v-for="item in cdetailInfo.detailImage[0].list"
      :src="item"
      alt
      width="100%"
      @load="imgLoadOk"
    />
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    cdetailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoadOk() {
      this.$emit("imgLoad");
    }
  }
};
</script>

<style scoped>
.key {
  text-align: center;
  font-size: 18px;
}
</style>
