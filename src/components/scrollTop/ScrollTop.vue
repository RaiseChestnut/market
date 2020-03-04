<template>
  <div class="scrollTop">
    <img src="~assets/img/xia.svg" alt="">
  </div>
</template>

<script>
export default {
     name:'ScrollTop'
}
</script>

<style scoped lang = 'less'>
.scrollTop{
    
    position: fixed;
    bottom: 15%;
    right: 20px;
    background-color: #fff;
    border-radius: 50%;
    transform: rotateZ(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
    }
  
}
</style>
