<template>
  <div id="swiper">
    <swipe indicator-color="white" :autoplay="2500">
      <swipe-item v-for="item in cbanner">
        <a :href="item.link">
          <img :src="item.image" alt  width="100%" @load="swiperImgLoad" />
        </a>
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";

export default {
  name: "Swiper",
  components: {
    Swipe,
    SwipeItem
  },
  props: {
    cbanner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      isLoad : false
    }
  },
  methods:{
    swiperImgLoad(){
      if(!this.isLoad){
        this.isLoad = true
        this.$emit('swiperLoadOk')        
      }
      
    }
  }
};
</script>

<style scoped>
</style>
