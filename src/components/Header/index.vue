<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->

    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if='!userName'>
            <span>请</span>
            <!-- <a href="@/pages/login">登录</a> -->
            <!-- 编程式导航，格式会乱，为什么？ -->
            <router-link to="/login">登陆</router-link>
            <!-- 声明式导航，务必要有to -->
            <!-- <a href="/register" class="register"></a> -->
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a > {{userName}}</a>
            <a class="register" @click="logout">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a> -->
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            v-model="keyword"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="gosearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      keyword: "",
      //不使用return包裹的数据会照成变量污染，全局可见，包裹后只是当前组件可用
    };
  },
  methods: {
    //搜索按钮的回调函数：需要向serach路由经行跳转
    gosearch() {
      //路由传参
      //第一种：字符串方式(params+query)
      // this.$router.push("/search/" + this.keyword+ "?k="+this.keyword.toUpperCase());
      //第二种：模板字符串写法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //第三种：对象(推荐用，比较明了)
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      location.query = this.$route.query;
      this.$router.push(location);
    },
    async logout(){
     try {
        this.$store.dispatch('logout')
        //退出登陆，回到首页
      this.$router.push('/home')
     } catch (error) {
       
     }
    }
  },
  //组件一挂载就监听，这里没有携带数据，毒贩子什么都没带，买家被黑吃黑，keyword给人抢了，为空
  mounted(){
     this.$bus.$on('delete',()=>{
            this.keyword='';
     })
  },
  //这里用监听路由清空keyword不得行，因为我们输入keyword 的时候，点击搜索也会实现路由跳转，清空keyword

    // watch:{
    //   $route:{
    //     deep:true,
    //     handler(newValue,oldValue){
    //       this.$nextTick(()=>{
    //         this.keyword="";
    //       console.log(1234)
    //       });
    //     }
    //   }
    // }
    computed:{
      userName(){
        return this.$store.state.user.userInfo.name
      }
    }
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
