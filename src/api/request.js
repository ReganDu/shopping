//对于axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store"

//1.利用axios对象的create去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //设置游客id到请求头，这样每次我们发请求都会用到这个头，定点存储数据
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token}
    //注册登陆后，后台返回一个token令牌，加入到请求头里面，前面引入了store，可以直接写store
    if(store.state.user.token){
      config.headers.token=store.state.user.token 
    }
    //进度条开始动
    nprogress.start()
  return config;
  //config；配置对象，对象里面有一个属性很重要，header
});

//响应拦截器
requests.interceptors.response.use(
  (res) => {
      //进度条结束
      nprogress.done()
    //成功的回调函数，服务器响应的额数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("fail"));
  }
);

export default requests;
