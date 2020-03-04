<template>
  <div id="detail">
    <nav-bar left-arrow @click-left="onClickLeft">
      <tabs v-model="active" slot="title" scrollspy @change="onChange">
        <tab v-for="item in detailArr" :title="item"></tab>
      </tabs>
    </nav-bar>
    <scroll class="wrapper" ref="scroll" @scrollTop="contentScroll">
      <swipe class="my-swipe" :autoplay="3000" indicator-color="white" height="300">
        <swipe-item v-for="item in detailTopImg">
          <img :src="item" alt width="100%"/>
        </swipe-item>
      </swipe>
      <good-info :goods="goods"></good-info>
      <shop-info :shop="shop"></shop-info>
      <detail-info :cdetailInfo="detailInfo" @imgLoad="imgLoad"></detail-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list :cgoods="recommends" ref="recommed"></good-list>
    </scroll>
    <goods-action>
      <goods-action-icon icon="chat-o" text="客服"/>
      <goods-action-icon icon="cart-o" text="购物车" info=""/>
      <goods-action-icon icon="shop-o" text="店铺" info=""/>
      <goods-action-button type="warning" text="加入购物车"/>
      <goods-action-button type="danger" text="立即购买"/>
    </goods-action>
  </div>
</template>

<script>
  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from "network/detail";

  import {NavBar} from "vant";
  import {Tab, Tabs} from "vant";
  import {Swipe, SwipeItem} from "vant";
  import GoodInfo from "./cComps/GoodInfo";
  import ShopInfo from "./cComps/ShopInfo";
  import DetailInfo from "./cComps/DetailInfo";
  import DetailParamInfo from "./cComps/DetailParamInfo";
  import DetailCommentInfo from "./cComps/DetailCommentInfo";
  import GoodList from "components/goods/GoodList";
  import {GoodsAction, GoodsActionIcon, GoodsActionButton} from "vant";

  import Scroll from "components/scroll/scroll";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        active: 0,
        detailArr: ["商品", "参数", "评论", "推荐"],
        detailTopImg: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        index: 0,
        isScroll: false
      };
    },
    components: {
      NavBar,
      Tab,
      Tabs,
      Swipe,
      SwipeItem,
      GoodInfo,
      ShopInfo,
      DetailInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      Scroll,
      GoodsAction,
      GoodsActionIcon,
      GoodsActionButton
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result;
        this.detailTopImg = data.itemInfo.topImages;
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // console.log(this.goods);
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // console.log(this.paramInfo);
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
          // console.log(this.commentInfo);
        }
        /*
        this.$nextTick(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommed.$el.offsetTop);
        })
         */
      });
      getRecommend().then(res => {
        // console.log(res.data);
        this.recommends = res.data.data.list;
        // console.log(this.recommends);
      });
    },
    mounted() {

    },
    updated() {

    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      imgLoad() {
        // console.log("加载玩了");
        this.$refs.scroll.scroll.refresh();

        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommed.$el.offsetTop);
        // console.log(this.themeTopYs)
      },
      onChange(index) {
        // console.log(index)


        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        this.isScroll = !this.isScroll

      },
      contentScroll(position) {
        this.isScroll = true;
        // console.log(position);

        const positionY = -position.y
        // console.log(positionY)
        const length = this.themeTopYs.length
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if (this.index !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
            || (i === length - 1 && positionY > this.themeTopYs[i]))) {
            // console.log(i)
            this.index = i;
            this.active = this.index;
            this.$refs.scroll.scroll.refresh()
            this.isScroll = false;
          }
        }
      }
    }

  };
</script>

<style scoped lang='less'>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .wrapper {
    position: absolute;
    overflow: hidden;
    width: 100%;
    top: 46px;
    bottom: 50px;
  }
</style>
