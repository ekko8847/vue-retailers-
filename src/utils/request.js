import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
const instance = axios.create({
  baseURL: "/api",
  timeout: 20000,
});
//请求拦截器配置NProgress
instance.interceptors.request.use((config) => {
  NProgress.start();
  //携带用户的唯一标识
  //在发请求的时候往请求头里添加一个(名字需要和后端商量)
  let userTempId = store.state.user.userTempId;
  if (userTempId) {
    config.headers.userTempId = userTempId;
  }
  let token = store.state.user.token;
  if (token) {
    config.headers.token = token;
  }
  return config;
});

//响应拦截器添加结束NProgress并返回响应数据
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(new Error(error.message));
  }
);
export default instance;
