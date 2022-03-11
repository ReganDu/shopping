//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCarSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart"
//配置路由
//解决多余导航的报错问题，我也不知道为什么
const originalPush =VueRouter.prototype.push;
VueRouter.prototype.push=function push(location){
  return originalPush.call(this, location).catch(err=>err)
}

//new一个router
 let router = new VueRouter({
  //配置路由
  routes: [
    {
      path: "/shopcar", //url对应的地址K,全部小写
      component: ShopCart, //路由所在地点V(KV对应)
      name:'ShopCart',
      meta: {
        show: true,
      },
    },
    {
      path: "/addcarsuccess", //url对应的地址K
      component: AddCarSuccess, //路由所在地点V(KV对应)
      name:'addcarsuccess',
      meta: {
        show: true,
      },
    },
    {
      path: "/home", //url对应的地址K
      component: Home, //路由所在地点V(KV对应)
      name:'home',
      meta: {
        show: true,
      },
    },
    {
      path: "/search/:keyword?",
      //：keyword将会以params里面的参数的形式映射到$route.params里面
      //接受路由传过来的参数，占位，url搜索/:keyword？
      component: Search,
      name: "search",
      meta: {
        show: true,
      },
      //路由是可以给组件传递props的
      //函数的写法才是最重要的
      props:(route)=>({
        keyword:route.params.keyword,
        big:route.query.big
      })
    },
    {
      path: "/login",
      component: Login,
      meta: {
        show: false,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        show: false,
      },
    },

    {
      path: "/detail/:skuid", //url对应的地址K 这里有冒号，只是等于的意思，后面参数不需要加上冒号
      component: Detail, //路由所在地点V(KV对应)
      name:'detail',
      meta: {
        show: true,
      },
      props:(route)=>({
        skuid:route.params.skuid,
       
      })
    },
    //重定向，在项目跑起来的时候，/定位到默认路径
    {
      path: "*",
      redirect: "/home",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});

//全局路由守卫,前置守卫（在路由跳转之前进行判断）
router.beforeEach((to,from,next)=>{
  //to跳转到那个
  //from从那个路由而来
  //next放行函数  next（）全部放行  next(path)放行到指定路由，要加判断
  next()
})


export default router