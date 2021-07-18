import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "@/pages/Home";
import Register from "@/pages/Rigister";
import Login from "@/pages/Login";
import Search from "@/pages/Search";

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
