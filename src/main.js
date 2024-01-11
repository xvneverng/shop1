// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false


// step1：引入 axios
import Axios from 'axios'

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = Axios;

Axios.defaults.withCredentials = true;

// step3：使每次请求都会带一个 /api 前缀
Axios.defaults.baseURL = '/api'


Axios.interceptors.request.use(
  config => {

    const token = sessionStorage.getItem("token")
    const username = sessionStorage.getItem("username")

    console.log(username)

    // if(config.url.indexOf("?") > 0){
    //   config.url = config.url + "&token=" + token + "&username=" + username;
    // }else{
    //   config.url = config.url + "?token=" + token + "&username=" + username;
    // }



    console.log(config.url);

    return config
  },
  error => {
    return Promise.reject(error)
  })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
