import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

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

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let userInfo = store.state.user.userInfo;
  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (userInfo.name) {
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          await store.dispatch("removeToken");
          next("/login");
        }
      }
    }
  } else {
    next();
  }
});
export default router;
