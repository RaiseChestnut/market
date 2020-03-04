<template>
  <div id="home">
    <top-nav></top-nav>
    <tabs
      @click="tabClick"
      ref="tabs1"
      class="tabs"
      title-active-color="red"
      v-model="active"
      v-show="isFixed"
      color="#fff"
    >
      <tab v-for="item in titles" :title="item"></tab>
    </tabs>
    <scroll
    class="wrapper"
     :pull-up-load="true" ref="scroll" @scrollTop="scrollTop" @pullingUp="lodeMore">
      <swiper :cbanner="banner" @swiperLoadOk="swiperLoadOk"></swiper>
      <check-button></check-button>
      <tabs
        @click="tabClick"
        ref="tabs"
        v-model="active"
        title-active-color="red"
        :border="true"
        type="line"
        color="#fff"
      >
        <tab v-for="item in titles" :title="item"></tab>
      </tabs>
      <good-list :cgoods="showGoods"></good-list>
    </scroll>
    <scroll-top @click.native="scrollTopClick" v-show="isActive"></scroll-top>
  </div>
</template>

<script>
import TopNav from "components/topnav/TopNav";
import Swiper from "components/swiper/Swiper";
import CheckButton from "components/checkButton/CheckButton";
import { Tab, Tabs } from "vant";
import GoodList from "components/goods/GoodList";

import ScrollTop from "components/scrollTop/ScrollTop";

import Scroll from "components/scroll/scroll";

import { getHomeData, getGoods } from "network/home";
export default {
  name: "Home",
  components: {
    Swiper,
    TopNav,
    CheckButton,
    Tab,
    Tabs,
    GoodList,
    Scroll,
    ScrollTop
  },
  data() {
    return {
      banner: [],
      titles: ["流行", "新款", "精选"],
      active: 0,
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      isActive: false,
      tabOffsetTop: 0,
      isFixed: false,
      deactivatedY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getBanner();
    this.getGoodList("pop");
    this.getGoodList("new");
    this.getGoodList("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.scroll.refresh, 500);

    this.$bus.$on("listImgLoad", function() {
      refresh();
    });
  },
  activated() {
    console.log("我显示了");
    this.$refs.scroll.scrollTop(0, this.deactivatedY, 0);
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    console.log("我离开了");
    this.deactivatedY = this.$refs.scroll.scroll.y;
  },
  methods: {
    // 防抖，一脸懵逼
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    getBanner() {
      getHomeData().then(res => {
        this.banner = res.data.data.banner.list;
        // console.log(this.banner);
      });
    },
    getGoodList(type) {
      const page = this.goods[type].page + 1;
      getGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list);
      });
    },
    tabClick(name, title) {
      this.active = name;
      if (name === 0) {
        this.currentType = "pop";
      } else if (name === 1) {
        this.currentType = "new";
      } else if (name === 2) {
        this.currentType = "sell";
      }
      // console.log(title);
      // console.log(this.currentType);
      // console.log(this.active);

      this.getGoodList(this.currentType);
    },
    scrollTopClick() {
      this.$refs.scroll.scrollTop(0, 0, 500);
    },
    scrollTop(position) {
      // console.log(position);
      if (-position.y > 1000) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
      this.isFixed = -position.y > this.tabOffsetTop;
    },
    lodeMore() {
      this.getGoodList(this.currentType);
      this.$refs.scroll.finishPullUp();
      // this.$refs.scroll.scroll.refresh()
    },
    swiperLoadOk() {
      this.tabOffsetTop = this.$refs.tabs.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    }
  }
};
</script>
<style scoped>
.tabs {
  position: relative;
  z-index: 99;
  margin-bottom: 5px;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 46px;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
