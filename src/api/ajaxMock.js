//对于axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";


//1.利用axios对象的create去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
//实列名字修改一下
const ajaxMock = axios.create({
  //路径修改一下
  baseURL: "/mock",
  timeout: 5000,
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发出去之前做一些事情
ajaxMock.interceptors.request.use((config) => {

    //进度条开始动
    nprogress.start()
  return config;
  //config；配置对象，对象里面有一个属性很重要，header
});

//响应拦截器
ajaxMock.interceptors.response.use(
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

//暴露改一下名字
export default ajaxMock;
