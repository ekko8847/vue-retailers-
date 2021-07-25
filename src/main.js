import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from "@/store";
import MySwiper from "@/components/MySwiper";
import Pagination from "@/components/Pagination";
import "swiper/css/swiper.css";
Vue.component("TypeNav", TypeNav); //全局注册组件
Vue.component("MySwiper", MySwiper);
Vue.component("Pagination", Pagination);
import "@/mock/mockServer"; //引入接口文件之后本地就部署好接口了

Vue.config.productionTip = false;
// import { reqCategoryList } from "@/api"; //按需引入测试是否请求到数据
// reqCategoryList();
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
// console.log(router);
