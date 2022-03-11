//引入mockjs模块
import Mock from 'mockjs'
//把创建的对应需要mock数据的模块引入
//json 是默认对外暴露的
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数 url请求地址 第二个参数：请求数据
Mock.mock('/mock/banner',{code:200, data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
//code:200 请求成功  banner floor 上面引入的