import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/common/home'
import Login from '../view/common/login'
import Theme from '../view/common/theme'
import Main from '../view/main'
import UserManagement from '../view/common/UserManagement';
import DisplayKnowledge from '../view/knowledge/k-watch';
import AddKnowledge from '../view/knowledge/add';
import cWatch from '../view/chapter/c-watch'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {path: '/login', component: Login, name: 'login', meta: {title: '登录'}},
    {
        path: '/',
        component: Main,
        name: 'main',
        redirect: {name: 'home'},
        meta: {title: '主入口整体布局'},
        children: [
            {path: '/home', component: Home, name: 'home', meta: {title: '首页'}},
            {path: '/theme', component: Theme, name: 'theme', meta: {title: '主题'}},
            {path: '/userManagement', component: UserManagement, name: 'userManagement', meta: {title: '账号管理'}},
            {path: '/displayKnowledge', component: DisplayKnowledge, name: 'displayKnowledge', meta: {title: '查看知识点'}},
            {path: '/addKnowledge', component: AddKnowledge, name: 'addKnowledge', meta: {title: '添加知识点'}},
            {path: '/cWatch', component: cWatch, name: 'cWatch', meta: {title: '管理章节'}},
        ]
    }]

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     let userId = store.state.user.userId
//     if(to.name == 'login'){
//         next();
//     }
//     if (!userId) {
//         next({name: 'login'})
//     }
//     next()
// });

export default router
