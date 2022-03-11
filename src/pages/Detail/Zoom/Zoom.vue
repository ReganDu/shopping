<template>
  <div class="spec-preview" >
     <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref='big'/>
    </div>
    <div class="mask" ref='mask'></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        currentIndex:0,
      }
    },
    props:['skuInfo'],
    computed:{
      //假报错：服务器延迟，仓库拿不到数据，为空，一层套一层
      skuImageList(){
        return this.skuInfo.skuImageList || []
      },
      imgObj(){
        return this.skuImageList[this.currentIndex]||[]
      }
    },
    mounted() {
      this.$bus.$on('getIndex',(index)=> this.currentIndex =index
      )},
    methods: {
    //绑定鼠标移动时间，获取鼠标坐标点event
      handler(event){
        //获取上面绿色遮盖层dom
        let mask = this.$refs.mask;
        //技术算遮盖的left,top值
        let left = event.offsetX-mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        //限定范围
        if(left <0) left =0;
        //这里两个蒙版就等于大盒子的宽度，如果不是，还要计算
        if(left>mask.offsetWidth) left = mask.offsetWidth
        if(top < 0) top =0
        //也是二倍关系
        if (top > mask.offsetHeight) top = mask.offsetHeight
        //修改位置，移动遮盖层
        mask.style.left=left+'px';
        mask.style.top =top+'px';
        //获取大图的dom
        let big = this.$refs.big
        //修改大图的位置，大图是小图的两倍，乘以2，他们是反的加上-
        big.style.left = -2*left +'px';
        big.style.top = -2*top+'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>