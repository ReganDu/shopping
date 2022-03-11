//引入函数
import { reqCategoryList } from "@/api";
import { reqBannerList, reqFloorList} from "@/api";
//home模块的小仓库
const state = {
  //state中数据默认初始值不要瞎写，服务器返回对象，服务器放回返回数组。【根据接口返回值初始化】
  categoryList: [],
  bannerList: [],
  floorList:[],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList.slice(0, 16);
  },
  BANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  FLOORLIST(state,floorList){
    state.floorList = floorList
  }
};
//处理异步的action
const actions = {
  //通过API里面的接口涵数调用，向服务器法请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },

  async getBannerList({ commit }) {
    let result = await reqBannerList();

    if (result.code == 200) {
      commit("BANNERLIST", result.data);
    }
  },
  async getFloorList({commit}){
    let result = await reqFloorList ()
    if(result.code==200){
      commit('FLOORLIST', result.data)
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
