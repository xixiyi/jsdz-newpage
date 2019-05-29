import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navMenu from './data/navMenu.js'
import commin from './data/commin.js'
import timeUtil from './data/time.js'
import md5 from './data/md5.js'
import util from './data/util.js'
import axios from 'axios'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex'

import router from './router';



// axios.defaults.withCredentials=true
/**
 * 导入全局使用的内容
 */
Vue.prototype.axios = axios;
Vue.prototype.navMenu = navMenu;
Vue.prototype.commin = commin;
Vue.prototype.timeUtil = timeUtil;
Vue.prototype.util = util;
Vue.prototype.md5 = md5;
Vue.prototype.router = router;




Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(ElementUI);

Vue.config.productionTip = false;



const store = new Vuex.Store({
  state: {
    count: 2,
    isloading: false,
    user: "{}",
    vueTitle: "登录",
    vueView: "login_in",
    globMainheight: 0,
    flag:"true",
    checkInven: ""
  },
  mutations: {
    increment(state) {
      state.count++
    },
    changeIsloading(state) {
      state.isloading = !state.isloading
    },
    user(state) {
      state.user = localStorage.user
    },
    changevueTitle(state) {
      state.vueTitle = localStorage.vueTitle
      state.vueView = localStorage.vueView
    },
    globMainheight(state) {
      state.globMainheight = localStorage.globMainheight
    },
    checkInvenClick(state) {
      state.checkInven = localStorage.checkInven
    },
    changecaozuoindex(state) {
      state.flag = localStorage.flag
    }
  }
})




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
