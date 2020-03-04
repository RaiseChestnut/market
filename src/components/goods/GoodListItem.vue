<template>
  <div id="goodListItem" @click="itemClick">
    <img :src="showImage" alt @load="imgLoad" />
    <p>{{listItem.title}}</p>
    <div class="priceAndLike">
      <span class="price">{{listItem.price}}</span>
      <span class="like">★ {{listItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      // console.log('图片加载完了');
      this.$bus.$emit("liteImgLoad");
    },
    itemClick() {
      // console.log(this.listItem.iid);
      // console.log(this.$router);
      console.log(this.listItem.item_id);

      this.$router.push(
        "/detail/" + this.listItem.iid
        
      );
    }
  },
  computed: {
    // 商品详情页推荐信息 复用 这个组件
    showImage() {
      return this.listItem.image || this.listItem.show.img;
    }
  }
};
</script>

<style scoped lang='less'>
#goodListItem {
  width: 50%;
  box-sizing: border-box;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    border-radius: 3px;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .priceAndLike {
    display: flex;
    justify-content: center;
    align-items: center;
    .price {
      display: inline-block;
      margin: 5px;
      color: #ed002f;
    }
    .like {
      display: inline-block;
      margin: 5px;
    }
  }
}
</style>
