import { reqGetDetailList,reqShopList,reqDeleteCartById } from "@/api";
import {getUUID} from "@/utils/uuid_token"

const state = {
  detailList: {},
  //游客临时id.永久
  uuid_token:getUUID(),
};

const mutations = {
  DETAILLIST(state, data) {
    state.detailList = data;
  },
};

const actions = {
  async getDetailList({ commit }, skuid) {
    let result = await reqGetDetailList(skuid);
    if ((result.code = 200)) {
      commit("DETAILLIST", result.data);
    }
  },
  //购物车带参数发请求
  //这里它只带一个参数，所以写成{skuId,skuNum}对象解构
  async shopList({ commit }, { skuId, skuNum }) {
    //加入购物车返回的解构
    let result = await reqShopList(skuId, skuNum);
    //{code: 200, message: '成功', data: null, ok: true} 数据为空，就不用仓库三连环了
  },
 
};

const getters = {
  categoryView(state) {
    return state.detailList.categoryView || {};
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
