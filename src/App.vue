<template>
  <div>
    <!-- step4使用组件 -->
    <!-- 使用header组件 -->
    <Header></Header>
    <!--路由（非全局组件）pages下面组件出口的地方-->
    <router-view></router-view>
    <!-- 使用footer组件 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//step2 引入组件
import Header from "./components/Header";
import Footer from "./components/Footer";
//step3 注册组件
export default {
  name: "",
  components: {
    Header, //KV一致，省略V  (es6)
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
    this.$store.dispatch('getUserInfo')
  },
};
</script>

<style></style>
