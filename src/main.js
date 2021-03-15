// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick';
import axios from 'axios';
import lrz from 'lrz';
import "./assets/css/adapter.css";
import "./assets/css/common.css";
import 'vue-layer-mobile/need/layer.css';
import layer from 'vue-layer-mobile';
Vue.use(layer)


axios.defaults.timeout = 30000

// 拦截器
axios.interceptors.request.use(function (config) { 
  // 在发送请求之前验证token
  if(localStorage.getItem('token')) {
    var token = localStorage.getItem('token');
    // console.log('打印token');
    // console.log(token);
  }else{
    var token = '';
    // console.log('token为空');
  }

  if(config.method == 'post'){
    if(config.headers['Content-Type'] == 'multipart/form-data'){
      return config;
    }else{
      if(config.data == '') {
        config.data += `token=${token}`;
        const sign = 'ab6fa6fee078d8858e333d950b190877' + parseInt(new Date().getTime()/1000);
        config.data += `&sign=${sign}`;
      }else{
        config.data += `&token=${token}`;
        const sign = 'ab6fa6fee078d8858e333d950b190877' + parseInt(new Date().getTime()/1000);
        config.data += `&sign=${sign}`;
      }
    }
    // console.log(config.data);
  }else if(config.method == 'get'){ 
      
  } 

  // 在发送请求之前加入签名
  // config.headers.sign = 'ab6fa6fee078d8858e333d950b190877' + new Date().getTime()/1000;

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Vue.config.productionTip = false

// fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
