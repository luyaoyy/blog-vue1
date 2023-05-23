import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from "./router/app"
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/highlightjs/styles/monokai.min.css'//代码块高亮颜色显示样式
import store from "@/store/index";
import 'aplayer/dist/APlayer.min.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'mavon-editor/dist/highlightjs/highlight.min';
import 'wowjs/css/libs/animate.css'
import 'animate.css'
import md5 from 'js-md5';
Vue.prototype.imgBaseUrl="http://localhost:9000"
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
Vue.use(hljs)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
