const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    port:8000,
    proxy: {
      '/api/': {//如果是/api 则请求/api*** 也会走代理， 而/api/则精准匹配
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
      '/weather/':{
        target: 'https://query.asilu.com',
        changeOrigin: true
      },
      '/words':{
        target:'https://api.mcloc.cn',
        changeOrigin:true
      }
    },
  },
})
