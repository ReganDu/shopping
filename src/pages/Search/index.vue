<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x">手机</li>
            <!-- 这里用v-if动态显示目录名字，如果参数里面有这个目录，可以显示再bread里面，然后动态显示名字，最后绑定一个点赞事件 -->
            <!-- 当用于点击x的时候，触发事件 -->
            <li class="with-x" v-if="searchParams.categoryName"> {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            <li class="with-x" v-if="searchParams.trademark"> {{searchParams.trademark.tmName}}<i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeword">×</i></li>
            <!-- searchSelector 子组件传过来的属性值的面包屑，这里不能是v-if,因为props是一个数组，要用遍历v-v-for -->
            <li class="with-x" v-for="(attrs,index) in searchParams.props" :key="index">{{ attrs.split(':')[1] }}<i @click="removeAttrs(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector  @trademarkPass='trademarkPass' @sendAttrs='sendAttrs'/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 综合排序板块 -->
              <!-- 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc" -->
              <ul class="sui-nav">
                <!-- 判定是否是1，是1为true,显示，反之则反 -->
                <li :class="{active:isActive}"  @click='changeOrder(1)'> 
                  <!-- 绑定阿里图标类iconfont -->
                  <a href="#" class='iconfont' >综合
                    <!-- 穿件span图标标签，通过判定背景类是否为真来判定箭头是否显示 -->
                    <!-- 通过isAsc判定是否含有asc，含有就上图标，不含有就下图标，这里有两个判定，加了引号 -->
                  <span v-show="isActive" 
                  
                  :class="{'icon-up':isAsc,'icon-down':isAsc == false}"> </span></a> </li>

                    <!--  价格排序板块-->
                <li :class="{active:isActive == false }" @click='changeOrder(2)'> <a href="#" class='iconfont' >价格 
                  <span v-show="isActive == false" :class="{'icon-up':isAsc,'icon-down':isAsc == false}"></span></a> </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">

            <ul class="yui3-g">
              <li
                class="yui3-u-1-5" v-for="(goodsList, index) in goodsList" :key="goodsList.id" >
                <div class="list-wrap">
                  <!-- 产品图片区域，点击图片跳转到详情页面，声明式导航 -->
                  <!-- 动态生成参数：上面动态遍历出来的产品id -->
                  <div class="p-img">
                    <router-link :to="`/detail/${goodsList.id}`"><img :src="goodsList.defaultImg"/></router-link>
                  </div>
                  <!-- @click=‘gosearch2(goodsList.id)’ gosearch2(data){this.$router.push(name:'/push', params:{skuid:this.data}} ) -->
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goodsList.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goodsList.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器，先模拟数据，然后传送真的后台数据，自定义时间接受儿子组件的数据pageNoIfo -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize="searchParams.pageSize" :total="total" :continues="5" @pageNoIfo='pageNoIfo'/>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/pages/Search/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  methods: {
    pageNoIfo(data){
       this.searchParams.pageNo= data;
       this.getData()
    },
    //带参数发请求，渲染页面，就像拿出钥匙打开门，我们发请求去拿出我们需要打开门的钥匙
    //因为要多吃发请求，就把它封装成了一个函数，需要就调用
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //移除目录类名面包屑，同时重新发请求
    removeCategoryName() {
      //用户点击x之后，清除categoryName的面包屑，为空就不显示了
      this.searchParams.categoryName = "";
      //清空id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // this.searchParams.keyword = ""; 很奇怪，我这里根本操控不了keyword
      //同时调函数发请求,从这间房间退出去，把钥匙还了，去拿新的钥匙
      // this.getData();
      //配置的时候自带参数，老师是判断了一次,我也加一个，没有影响
      this.$router.push({ name: "search", params: this.$route.params });
    },
    //移除搜索关键字面包屑，同事重新发请求
    removeKeword() {
      //点击x之后，清除keyword面包屑
      this.searchParams.keyword = '';
      this.$route.params.keyword='';
      // this.getData();
      this.$router.push({ name: "search",query:this.$route.query});
      //search组件上车事件名字‘delete’，携带了一个数据,这里数据为空，毒贩子什么都没带，打算黑吃黑
      this.$bus.$emit('delete')
    },
    //移除trademark面包屑，同时重新发请求
    removeTrademark(){
      this.searchParams.trademark='';
      //trademark不在路由参数里面，所以不能被监听到发请求
      this.getData()
      this.$router.push({name:'search',query:this.$route.query,params: this.$route.params})
    },
    //移除属性值面包屑，应为是数组，所以按需删除
    removeAttrs(index){
      //整理参数
     this.searchParams.props.splice(index,1)
     //发请求
     this.getData()
    },
    //子父通信，接受商标信息
    trademarkPass(trademark){
     this.searchParams.trademark=trademark;
     this.getData()
    },
    //子父通信，接受属性信息
    sendAttrs(attrsList,attrsValue){
//     商品属性的数组: ["属性ID:属性值:属性名"]
// 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
//按照后台给的请求参数模板合并参数
    let props = `${attrsList.attrId}:${attrsValue}:${attrsList.attrName}`
  
    //数组去重
    if(this.searchParams.props.indexOf(props)=== -1){
    //合并参数
    this.searchParams.props.push(props)
    //带参数发请求
    this.getData()
    }},
    // //点击综合背景、箭头改变,我自己的想法，可以实现
    // changeOrderOne(){
    //   if(this.searchParams.order.indexOf('asc') !=-1){
    //     this.searchParams.order = `1:desc`
    //   } else{ this.searchParams.order=`1:asc`}
    //   this.getData()
    // },
    //    //点击价格背景、箭头改变，我自己的想法，可以实现
    // changeOrderTwo(){
    //   if(this.searchParams.order.indexOf('asc') !=-1){
    //     this.searchParams.order = `2:desc`
    //   } else{ this.searchParams.order=`2:asc`}
    //   this.getData()
    // },
    //老师的方法，定义一个函数，用两个不同的实参进行判断
    changeOrder(flag){
      //初始数字
      let orignN = this.searchParams.order.split(':')[0];
      //初始箭头方向
      let orignStr = this.searchParams.order.split(':')[1];
      //创建一个空字符串，用于接受改变后的值，然后传给order
      let newOrder =''
      //如果点击数字等于被选中数字，1=1.2=2，值不变，三元表达式箭头取反
      if(flag==orignN){
          newOrder =`${orignN}:${orignStr=='desc'?'asc':'desc'}`
      //如果点击数字不等于被选中数字，1 ！= 2， 2！=1， 值就去点击穿过来的值，默认箭头向下
      }else{
        newOrder =`${flag}:${"desc"}`
      };
      //传递参数
      this.searchParams.order=newOrder;
      //发请求刷新页面，方法里面有整理参数代码
      this.getData()

    }

    
  },
  components: {
    SearchSelector,
  },
  //在数据挂载之前就整理一次params
  beforeMount() {
    //es6写法，把第一个后面的对象或数组合并到第一个里面，同K替代，无就新增，注意Object首字母大写
    //为什么要先整理数据，是的，我们首先需要拿到数据，用来动态展示search页面，但是用户点进来的时候，他是想看具体某一个分类的的信息，如果
    //请求的时候是一个空参数，返回的也就只是用于vuex的动态展示页面的数据，但是并不能跳转到用户想要看的具体哪一类，所以我们我们请求的时候带上参数
    //这样同事满足vuex(/api/search)也满足用户的观看目标（searchParams）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  }, 
  // //我们用mounted上面调用函数获取数据用于vuex和用户目的，但是如果用户在新的页面有点击三级联动，想要跳转到其它页面，比如看了手机又想看冰箱类，这样
  //我们有需要重新发送请求api，但是整体mounted只能在挂载的时候发送一次请求，后面再怎么点击也不出触发getData函数
  //我们为了满足这个需求，采用watch监听的方式，只要用户点击了目录，就会传递query或者params，那么路由就发生了改变，只要我们监听路由，就可以到我们跳转的目的
  //其实如果监听this.searchParams应该也是可以的吧,实践过，不得行
  watch: {
    $route:{
     
      handler(newValue, oldValue) {
      //我们监听后执行函数，但是beforemount也是只执行一次，也就是说this.searchParams值能识别到用户第一次点击传递的参数，后面的就接受不到了，所以我们需要重新

      //这里清空是因为，1，2，3id可能不会被覆盖，出现同事携带两个或以上的id的情况，但是我们每个目录只能携带一个id,所以要清空
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.category1Id = "";
      //整理合并一次，获取最新的用户信息
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    }},
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //捞取total总共多少条数据的数据
    ...mapState({
      total:state=>state.search.searchList.total
    }),
    isActive(){
      return this.searchParams.order.indexOf(1) != -1
    },
    isAsc(){
      return this.searchParams.order.indexOf(("asc")) != -1
    }
  },
};
</script>

<style lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
