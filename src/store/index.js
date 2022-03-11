import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from "./detail"
import shopcar from "./shopcar"
import user from './user'

export default new Vuex.Store ({
    //实现Vuex仓库模块式开发存储数据，modules是一个对象
   modules:{
        home,
        search,
        detail,
        shopcar,
        user,
   }
})
