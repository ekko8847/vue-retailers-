import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import store from "@/store";
import MySwiper from "@/components/MySwiper";
import Pagination from "@/components/Pagination";

import * as API from "@/api";
import "swiper/css/swiper.css";
Vue.component("TypeNav", TypeNav); //全局注册组件
Vue.component("MySwiper", MySwiper);
Vue.component("Pagination", Pagination);
import "@/mock/mockServer"; //引入接口文件之后本地就部署好接口了

Vue.config.productionTip = false;
// import { reqCategoryList } from "@/api"; //按需引入测试是否请求到数据
// reqCategoryList();

//引入elementui 按需引入
import { Button, MessageBox, Message } from "element-ui";
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

new Vue({
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
    //将所有接口挂载到原型上
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
// console.log(router);
