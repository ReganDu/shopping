//search 模块的的小仓库
//引入api
import { reqGetSearchList } from "@/api";
const state = {
  //这个数据倒是第对象还是数组，需要到search模块中去执行一次
  searchList: {},
};
const mutations = {
  SEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    
    let result = await reqGetSearchList(params);
    if (result.code == 200) {
      commit("SEARCHLIST", result.data);
    }
 
  },
};
const getters = {
  //当前state是这个小仓库中的state,不是大仓库中的
  //我们需要需要返回的部分数据，我们可以用getters捞去其中具体的数据
  attrsList(state) {
    return state.searchList.attrsList||[];
  },
  goodsList(state) {
    return state.searchList.goodsList||[];
  },
  trademarkList(state) {
    return state.searchList.trademarkList||[];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
