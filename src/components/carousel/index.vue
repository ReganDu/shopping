<template>
   <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel, index) in list"
              :key="index"
            >
              <img :src="carousel.imgUrl" />
            </div>
         
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'carousel',
    watch:{
    immediate:true,
    list:{handler(newValue,oldValue){
      //监测到数据改变以后，如果直接执行swiper，因为swiper要再数据得到后同时执行函数，但是
      //它还要v-for遍历一遍数据，需要时间，所以swiper再v-for执行之前执行了，也拿不到需要的数据，故而还是不行
      //这里我们要用到nextTick方法，vue自带，它是再保证数据更新v-for执行完后再执行
      //后面我们会多次搭配插件是nextTick,它是保证页面说有东西都搞定了，再来操作DOM
      this.$nextTick(()=>{
         var mySwiper = new Swiper(".swiper-container", {
        // direction: "vertical", // 垂直切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          //小圆点导航
          clickable :true,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
      })}
    }
  },
  props:['list']

}
</script>

<style>

</style>