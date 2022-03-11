//当前这个模块：API进行统一管理
import requests from "./request";
import ajaxMock from "./ajaxMock";
//三级联动请求
//发请求：axios发请求返回的结果是promise对象
export const reqCategoryList = () => {
  return requests({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};

export const reqBannerList = () => {
  return ajaxMock({ url: "/banner", method: "get" });
};

export const reqFloorList = () => ajaxMock({ url: "/floor", method: "get" });

//search模块,当前模块是post请求，一定要有一个参数，至少为空

export const reqGetSearchList = (params) =>
  requests({ url: "/list", method: "post", data: params });

  //这是产品详细页面的请求
export const reqGetDetailList =(skuid) => requests({
  url:`/item/${skuid}`,
  method:"get",
})

 ///api/cart/addToCart/{ skuId }/{ skuNum } 加入购物车POST
 export const reqShopList =(skuId,skuNum) => requests({
   url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'
 })

 //获取购物车数据 查文档 /api/cart/cartList GET
 export const reqCarList =()=> requests ({
   url:'/cart/cartList', method:'get'
 })

//购物车删除商品 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById =(skuId)=> requests({
  url:`/cart/deleteCart/${skuId}`, method:'delete'
})
//切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqChangeCheckedById=(skuId,isChecked)=>requests({
  url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'
})

//获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode=(phone)=>requests({
  url:`/user/passport/sendCode/${phone}`,method:'get'
})

//注册成功 /api/user/passport/register POST
export const reqRegister = (data)=>requests({
  url:'/user/passport/register',data,method:'post'
})

//登陆 /api/user/passport/login post
export const reqLogin = (data)=>requests({
  url:"/user/passport/login",data, method:'post'
})

//获取用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo =()=>requests({
  url:'/user/passport/auth/getUserInfo', method:'get'
})

//退出登陆 /api/user/passport/logout  get
export const reqLogout=()=>requests({
  url:'/user/passport/logout',method:'get'
})