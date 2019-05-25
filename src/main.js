import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navMenu from './data/navMenu.js'
import commin from './data/commin.js'
import timeUtil from './data/time.js'
import md5 from './data/md5.js'
import axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex'

import router from './router';
/**
 * 导入全局使用的内容
 */
Vue.prototype.axios = axios ;
Vue.prototype.navMenu = navMenu;
Vue.prototype.commin = commin;
Vue.prototype.timeUtil = timeUtil;
Vue.prototype.md5 = md5
Vue.prototype.router = router;




Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false;



const store = new Vuex.Store({
  state: {
    count: 2,
    isloading:false,
    user:"{}",
    vueTitle:"登录",
    vueView:"login_in",
    globMainheight:0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    changeIsloading(state){
      state.isloading = !state.isloading
    },
    user(state){
      state.user = localStorage.user
    },
    changevueTitle(state){
      console.log("chufa")
      state.vueTitle = localStorage.vueTitle
      state.vueView = localStorage.vueView
    },
    globMainheight(state){
      state.globMainheight = localStorage.globMainheight
    }
  }
})




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
