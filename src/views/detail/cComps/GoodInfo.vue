<template>
  <div class="GoodInfo">            
    <p class="goodTitle">{{goods.title}}</p>     
    <div class="price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns">
      <span v-for="item in goods.columns">{{item}}</span>
    </div>
    <div class="services">
      <div v-for="item in goods.services" class="servicesItem">
        <img :src="item.icon" alt />
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped lang='less'>
.GoodInfo{
     padding: 0 5px;
}
.goodTitle {
  font-size: 16px;
}
.price {
  display: flex;
  align-items: center;
  .newPrice {
    color: red;
    font-size: 18px;
    margin-right: 5px;
  }
  .oldPrice {
    text-decoration: line-through;
  }
  .discount {
    color: #fff;
    margin-left: 5px;
    font-weight: bold;
    background-color: red;
    padding: 2px 5px;
    border-radius: 15px;
  }
}
.columns {
  display: flex;
  justify-content: space-between;
  color: #666;
  margin: 8px 0;
}
.services {
  display: flex;
  justify-content: space-between;
  .servicesItem {
     display: flex;
     img{
          width: 15px;
     }
  }
}
</style>
