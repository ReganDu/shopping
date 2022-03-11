<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex()" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 遍历数据，获取值 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <!-- 这里index使用了，所以没有红线 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!--二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="index"
                  >
                    <!-- 这里index没有使用到，所以有红线 -->
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="index"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"
export default {
  name: "TypeNav",
  data() {
    return {
      //储存用户鼠标移动到哪一个以及分类
      currentIndex: -1,
      //用来控制search模块中商品目录的显示与隐藏
      show: true,
    };
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState(
      { categoryList: (state) => state.home.categoryList }
      // ['categoryList'] 拿不到值
      // {categoryList:'categoryList'} 拿不到值
    ),
  },
  methods: {
    changeIndex:throttle(function(index) {
      this.currentIndex = index;
    },10),
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      //这里event是一个事件状态，我们点击到那个，获取相应的事件
      let element = event.target;
      //这里结构对象，操作结构出来的参数,dataset里面存储了自定义类的值
      //这里id为什么是小写，上面自定义类是大写，因为解析器解析出来是小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //这里经行判定，如果标签中有catagoryname,那么一定是a标签
      if (categoryname) {
        //如果是a标签，就可以创建跳转路由，应为是push方法，该方法可以返回，有history，故而用name
        let location = { name: "search" };
        //这里是携带的参数query，我们携带指定的categoryName, categoryId, 注意浏览器结构出来的值是小写，不是驼峰
        //query是一个对象，里面携带两个KV
        let query = {
          categoryName: categoryname,
          // categoryId: categoryid,
        };
        //这下面老师在视频中讲解的方法，要分成一二三级目录去判定，我发现他们本身的categoryid都是不一样的，所以没有用
        //现在要使用，应为后端的指引是这样写的，要分成一二三级目录
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //这里是合并对象的写法，location.query这里是在location对象里面新增加一个键K--query,
        //后面的等于query 是把我们前面的自定义query的值添加进去
        // 类等于写法location.query=query={categroyName: categoryname,categoryId:categoryid};
        location.query = query;
        location.params = this.$route.params;
        // //编程式导航跳转
        this.$router.push(location);
        
      }
    },
    entershow() {
      this.show = true;
    },
  },
};
</script>
<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        // .item:hover{
        //     background: pink;
        // }
        .cur {
          background: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
      overflow: hidden;
    }
  }
}
</style>
