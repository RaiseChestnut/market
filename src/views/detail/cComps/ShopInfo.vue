<template>
  <div class="shopInfo">
    <div class="shopLogo">
      <img :src="shop.logo" alt />
      <span class="shopName">{{shop.name}}</span>
    </div>
    <div class="info">
      <div class="left">
        <div class="text">{{shop.sells | isFilters}}</div>
        <div>总销量</div>
      </div>
      <div class="center">
        <div class="text">{{shop.goodsCount}}</div>
        <div>全部宝贝</div>
      </div>
      <div class="right">
        <div v-for="item in shop.score" class="rightItem">
          <span>{{item.name}}</span>
          <span class="score" :class="{'score-better':item.isBetter}">{{item.score}}</span>
          <span class="scoreheight" :class="{'better':item.isBetter}">{{item.isBetter?'高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="gg">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    isFilters(value) {
      if (value > 9000) {
        return (value / 10000).toFixed(1) + "万";
      } else return value;
    }
  }
};
</script>

<style scoped lang ='less'>
.shopInfo{
  padding:  10px 5px;
}
.shopLogo {
  display: flex;
  align-items: center;
  img{
    width:30px ;
    border-radius: 50%;
    margin-right: 8px;
  }
}
.info {
  display: flex;

  .left,
  .center {
    display: flex;
    width: 30%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ddd;
    .text {
      font-size: 18px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 8px;
    .score {
      color: yellowgreen;
    }
    .score-better {
      color: red;
    }
    .scoreheight {
      color: #ffffff;
      background-color: yellowgreen;
    }
    .better {
      background-color: red;
    }
    .rightItem {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
    }
  }
}
.gg{  
  width: 150px;
  height: 40px;
  background-color: #eee;
  margin: 10px   auto ;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #999;
}
</style>
