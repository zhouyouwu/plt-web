import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router/index';
import * as echarts from 'echarts';
import '@/assets/scss/index.scss'
// axios是一个基于 promise 的 HTTP 库
import axios from 'axios';
// 按需导入element ui组件
import './config/elementConfig';
// 在网络请求中加入loading
import {showLoading, hideLoading} from './assets/common/loading';// eslint-disable-line no-unused-vars
import 'core-js';
// 读取js配置文件，然后将url拼接在接口地址上
import cfg from './config/config'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;


/********** axios配置 **********/

// 设置超时时间10min
// axios.defaults.timeout = 0;
// axios 默认不发送cookie，这里需要将cookie带到后台保持会话跟踪
axios.defaults.withCredentials = true;

//指定axios默认的的Content-Type为form-data，它默认的是发送json
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = '';
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
}];

// 配置拦截器，统一处理请求后台异常的情况
// 请求拦截器（请求之前的操作）
axios.interceptors.request.use((req) => {
    return req;
}, err => Promise.reject(err));
// 回应拦截器
axios.interceptors.response.use((res) => {
    //判断是否为登录请求
    if (isIntercept(res.config.url)) {
        hideLoading();
        return res;
    }
    // 与后台约定的返回状态使用axios的拦截器统一处理，目前是res.data.resultStatus和result
    if (res.data.code!==0 && !res.data.state) {
        // 如果是请求后台地址配置文件则放过
        if (res.data.resultCode === 'NOT_LOGINED' || res.data.code === 'NOT_LOGINED') {
            vm.$router.replace({name: 'noLogin'});
        }
        // 根据返回的后台错误信息来显示一个提示框
        vm.$message({
            message: res.data.result,
            type: 'error',
            offset: 300
        });
        res.config.isLoading ? {} : hideLoading();
    } else {
        res.config.isLoading ? {} : hideLoading();
    }
    return res;
}, err => {
    vm.$message({
        message: '网络连接错误!',
        type: 'error',
        offset: 300
    });
    hideLoading();
    return Promise.reject(err);
});

//Vue.use(axios) axios不能用use 只能修改原型链
Vue.prototype.$axios = axios;


//拦截内容
let intercepts = ['login.do'];

//判断是否要跳过请求拦截
function isIntercept(url) {
    let isIntercept = false;
    for (let i in intercepts) {
        if (url.lastIndexOf(intercepts[i]) !== -1) {
            isIntercept = true;
        }
    }
    return isIntercept;
}

function getServerConfig() {
    return new Promise((resolve) => {
        for (let key in cfg.url) {
            cfg.url[key] = cfg.contextPath + cfg.url[key];
        }
        // 将全局配置挂到vue的原型链上，使用的时候直接this.GLOBAL
        Vue.prototype.GLOBAL = cfg.url;

        resolve();
    })
}

let isLogin = false;//是否登录成功

/********** 初始化Vue **********/
let vm;
// 使用async、await机制控制执行请求顺序，最后初始化vue
(async () => {
    await getServerConfig();
    vm = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
    if (!isLogin) {
        await vm.$router.replace({name: 'login'});
    } else {
        await vm.$router.replace({name: 'home'});
    }
})();

