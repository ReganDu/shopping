import {reqGetCode,reqRegister,reqLogin,reqUserInfo,reqLogout} from '@/api'

const state ={
    //验证码
    code:'',
        //登陆获取token
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations ={
    GETCODE(state,code){
       state.code=code
    },
        //登陆获取token
    GETLOGIN(state,data){
        state.token = data
    },
    GETUSERINFO(state,data){
        state.userInfo=data
    },
    //退出登陆，清除之前的所有信息
    CLEAR(state){
        state.token='';
        state.userInfo =''
    }
}
const actions ={
    //获取验证码
   async getCode({commit},phone){
       let result = await reqGetCode(phone)
       console.log(result);
       if (result.code == 200){
           commit('GETCODE',result.data)
       } else{
           return Promise.reject(new Error('fail'))
       }
    },
    //用户注册
    async userRegister({commit},data){
      let result =  await reqRegister(data)
      console.log(result);
      if(result.code==200){
          return 'ok'
      }else{
          return Promise.reject(new Error('fail'))
      }
    },
    //登陆获取token
   async  getLogin({commit},data){
     let result = await reqLogin(data)
     console.log(result)
     localStorage.setItem('TOKEN',result.data.token)
     if (result.code==200) {
         commit('GETLOGIN',result.data.token)
         
     }else{
        console.log(result.data.token);
         return Promise.reject(new Error('报错'))
     }
    },
    //获取用户信息
   async getUserInfo ({commit}){
       let result =  await reqUserInfo()
       console.log(result);
       if(result.code==200){
         commit('GETUSERINFO', result.data)
       }
   },
   //退出登陆
   async logout({commit}){
     let result = await reqLogout()
     if(result.code==200){
         commit('CLEAR')
     }
   }
}
const getters ={}
export default {
    state,
    mutations,
    actions,
    getters,
}