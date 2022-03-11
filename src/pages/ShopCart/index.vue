<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 商品详细 -->
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <!-- 这里绑定的是change事件，输入框失去焦点后触发 -->
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0" @change="updateAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delelteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle"

export default {
  name: "ShopCart",
  //挂载获取购物车数据，展示出来
  mounted() {
    this.getData();
  },
  methods: {
    //发请求从服务器获取购物车详情数据，用于页面展示
    getData() {
      this.$store.dispatch("getCarList");
    },
    //购物车产品数量加减,防止用户过度操作，加了一个节流阀
    handler:throttle(async function(type, disNum, cart) {
      //type:为了区分这三个元素
      //disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
      //cart:哪一个产品【身上有id】
      //向服务器发请求，修改数量
      switch (type) {
        case "add":
          disNum = 1;
          break;
        //判断产品的个数大于1，才可以传递给服务器-1
        //如果出现产品的个数小于等于1，传递给服务器个数0（原封不动）
        case "minus":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        //这里change的参数是$event.target.value，是用户在输入框输入的值，所以变化量我们要重新计算
        case "change":
          //用户输入进来的最终量，如果非法的（带有汉字|出现负数），带给服务器数字零
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          }
          //属于正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
          else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      //成功后派发action,这里是一个ajax请求，是一个promise,所以我们用await拿到成功后的值，然后再发请求
      try {
        await this.$store.dispatch("shopList", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //发请求，更新数据
        this.getData();
      } catch (error) {}
    }, 200),
  
    //删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        //如果删除成功再次发请求获取新的数据进行展示
        await this.$store.dispatch("deleteCartById", cart.skuId);
        this.getData();
      } catch (error) {
        console.log(error.message + "删除失败了");
      }
    },
    //修改产品被选中状态
     async updateChecked(cart,$event){
       //这里事件本身的勾选，和isChecked不同的参数
      //  console.log($event.target.checked)
       try{
         let isChecked = $event.target.checked ? "1" :"0"
        //  console.log(isChecked)
          await this.$store.dispatch("changeCheckedById",{skuId:cart.skuId,isChecked})
          this.getData();
          console.log('修改成功了');
       } catch(error){
         console.log(error.message);
       }
    },
    //删除所有选中商品
    async delelteAllCheckedCart(){
      try{
        await this.$store.dispatch('delelteAllCheckedCart')
        this.getData();
      } catch(error){
        console.log(error.message);
      }
    },
      //全部勾选，event可以直接拿
     async updateAllChecked(event){
         try{
           let isChecked = event.target.checked ? '1' :'0'
            await this.$store.dispatch('updateAllChecked',isChecked)
          this.getData()
        } catch(error){
          console.log(error.message);
        }
    }
  
  },
  computed: {
    ...mapGetters(["cartList"]),
    //购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //计算购买产品总价
    totalPrice() {
      let sum = 0;
      //遍历所有产品，加上他们的总价
      this.cartInfoList.forEach((item) => (sum += item.skuNum * item.skuPrice));
      return sum;
    },
    //判断是否全部商品被选中
    isAllChecked() {
      //遍历数组，如果全部数组里面的isChecked =1,返回true，否则false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 17%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
