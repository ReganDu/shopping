import Vue from "vue";
import App from "./App.vue";
//引入三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import carousel from "@/components/carousel";
import Pagination from "@/components/Pagination"
//注册：第一个参数：全局组件的名字 第二个参数：全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(carousel.name, carousel);
Vue.component(Pagination.name,Pagination);
//引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
//引入mockServe.js----mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";

new Vue({
  render: (h) => h(App),
  //注册路由:cv一致,注意小写
  router,
  //创建全局事件总线$bus，我的理解就是创建一个可以在各个组件自有行驶的汽车
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  //注册仓库,组件实例的身上会多一个属性$store属性
  store,
}).$mount("#app");
