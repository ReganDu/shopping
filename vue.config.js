module.exports = {
    lintOnSave:false,
    //关闭eslint
    //代理跨域
    devServer:{//构建一个服务器
        proxy:{ //代理
            '/api':{
                target:'http://39.98.123.211'
            }
        }
    },
    
 
}