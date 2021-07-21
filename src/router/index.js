import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "@/pages/Home";
import Register from "@/pages/Rigister";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
const originPush = VueRouter.prototype.push;
const originRepalce = VueRouter.prototype.replace;
//实际思想就是没有错误处理我们给他加一个错误处理
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve === undefined && reject == undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, resolve, reject);
  }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve === undefined && reject == undefined) {
    return originRepalce.call(this, location).catch(() => {});
  } else {
    return originRepalce.call(this, location, resolve, reject);
  }
};

export default new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isHidden: true,
      },
    },
    {
      path: "/search/:keyword?", //使用params参数一定要占位,params是直接写进路径的
      name: "search",
      component: Search,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
