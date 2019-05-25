import Vue from 'vue';
import Router from 'vue-router';
 
import login from './pages/login';
// import regist from './pages/regist';
import index from './pages/index';
// import updateUserinfo from './pages/updateUserinfo'
// 2.通过Vue的use方法注入Router
Vue.use(Router)
// 3.创建 router 实例，然后传 `routes` 配置
const router = new Router({
    // 指定路由选中时的样式类名
    // linkActiveClass: 'active',
    //hashbang: false, // 将路径格式化为#!开头
    mode: 'hash' ,
    history: false, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
    /**
     * 4.@desc 路由配置配置具体的路径
     */
    routes: [
        {
            path: '/login',
            component: login
        },
        // {
        //     path:'/regist',
        //     component: regist
        // },
        {
            path: '/index',
            component: index
        },
        // {
        //     path:'/updateUserinfo',
        //     component:updateUserinfo
        // },
        {
            path:'/',
            redirect:'/login'
        }
        
    ]
})
/**
 * @desc 全局监听路由变化
 */
// router.beforeEach((to, from, next) => {
//     store.dispatch('updateHistoryLength') // 变化时更新路由切换长度
//     next()
// })
// 5.导出路由
export default router
