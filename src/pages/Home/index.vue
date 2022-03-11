<template>
  <div>
    <!-- 三级联动全局组件，已经是全局组件了，因此不需要引入了 -->
    <TypeNav />
    <!-- step4 使用组件 -->
    <ListContainer />
    <TodayRecommand />
    <Rank />
    <Like />
    <!-- 这里注意第一个和最后一个一定要相同 floor=floor -->
    <Floor v-for="(floor, index) in floorList" :key="index" :list="floor"/>
    <!-- <Floor/> -->
    <Brand />
  </div>
</template>

<script>
//引入其余的组件
// step2 引入组件
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommand from "@/pages/Home/TodayRecommand";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
// step3 注册组件
export default {
  name: "",
  components: {
    ListContainer,
    TodayRecommand,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    
  },
};
</script>
