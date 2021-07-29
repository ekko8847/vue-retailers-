import { getUserTempId } from "@/utils/userAbout";
import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api";
const state = {
  //在vuex中保存 避免每次都要从localstorage中拿,造成效率低下
  userTempId: getUserTempId(),
  code: "",
  token: localStorage.getItem("token_key"),
  userInfo: {},
};
const actions = {
  async getCode({ commit }, phone) {
    const result = await reqCode(phone);
    if (result.code === 200) {
      commit("REVICECODE", result.data);
      return result.data;
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async getUserReigster({ commit }, userInfo) {
    const result = await reqRegister(userInfo);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  //第一次登陆的时候后台需要给你返回一个token,得将他保存在localstorage中
  async getUserLogin({ commit }, userInfo) {
    const result = await reqLogin(userInfo);
    if (result.code === 200) {
      commit("REVICETOKEN", result.data.token);
      //当需要进行后续操作时就return(成功或失败的结果)
      localStorage.setItem("token_key", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code === 200) {
      commit("REVICEUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async removeToken({ commit }) {
    localStorage.removeItem("token_key");
    commit("REMOVE_TOKEN");
  },
  async getLogout({ commit, dispatch }) {
    const result = await reqLogout();
    if (result.code === 200) {
      commit("REMOVE_USERINFO");
      dispatch("removeToken");
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
};
const mutations = {
  REVICECODE(state, code) {
    state.code = code;
  },
  REVICETOKEN(state, token) {
    state.token = token;
  },
  REVICEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  REMOVE_TOKEN(state) {
    state.token = "";
  },
  REMOVE_USERINFO(state) {
    state.userInfo = {};
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
