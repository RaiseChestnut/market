<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad: this.pullUpLoad,
      probeType: 3
    });
    this.scroll.on("scroll", position => {
      this.$emit("scrollTop", position);
    });
    this.scroll.on('pullingUp',()=>{
      console.log('加载更多');
      
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTop(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
};
</script>

<style scoped>

</style>
