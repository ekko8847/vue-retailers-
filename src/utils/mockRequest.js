import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const instance = axios.create({
  //   baseURL: "/api",
  baseURL: "/mock",
  timeout: 20000,
});
//请求拦截器配置NProgress
instance.interceptors.request.use((config) => {
  NProgress.start();
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
