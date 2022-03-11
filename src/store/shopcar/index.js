import { reqCarList, reqDeleteCartById,reqChangeCheckedById } from "@/api";
const state = {
  //数据类型是对象还是数组，查文档得知
  cartList: [],
};
const mutations = {
  CARLIST(state, cartList) {
    state.cartList = cartList;
  },
};

const actions = {
  async getCarList({ commit }) {
    let result = await reqCarList();
    if (result.code == 200) {
      commit("CARLIST", result.data);
    }
  },
  //发delete请求，购物车删除产品
  async deleteCartById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("芭比q了"));
    }
  },
  //修改购物车选中状态
  async changeCheckedById({commit},{skuId,isChecked}){
    let result = await reqChangeCheckedById(skuId,isChecked)
    if (result.code == 200){
      return 'ok'
    } else{
      return Promise.reject(new Error('fail'))
    }
  },
  //删除全部勾选的产品
  delelteAllCheckedCart({dispatch,getters}){
    //获取购物车中全部的产品，是一个数组
    let PromiseAll =[];
    getters.cartList.cartInfoList.forEach(element => {
      let promise = element.isChecked ==1? dispatch('deleteCartById',element.skuId):''
      //将每一次返回的promise添加到数组当中
      PromiseAll.push(promise)
    });
    //只要全部的P1/P2...都成功，返回结果即为成功
    //如果有一个失败，返回结果即为失败
    return Promise.all(PromiseAll)
  },
  //全部商品选中
  updateAllChecked({dispatch,state},isChecked){
      let PromiseAll = [];
      state.cartList[0].cartInfoList.forEach(element => {
        let promise = dispatch('changeCheckedById',{skuId:element.skuId,isChecked})
        PromiseAll.push(promise)
      });
      return Promise.all(PromiseAll)
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
