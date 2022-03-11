//引入uuid
import { v4 as uuidv4 } from 'uuid';
//暴露函数，为了保证游客的id的唯一性，我们需要把他存储到本地存储里面（永久），不能本地会话（临时）
export const getUUID =()=>{
   //先判断本地存储里面是不是有游客id，如果有，直接拿起来用,遮掩个如果没有，就为空
   let uuid_token = localStorage.getItem('UUIDTOKEN')
   //如果没有,新建一个，放到本地存储
   if(!uuid_token){
     uuid_token = uuidv4();
     localStorage.setItem('UUIDTOKEN',uuid_token)
   }
  //函数返回值
  return uuid_token;
}