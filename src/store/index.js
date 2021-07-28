import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import user from "./modules/user";
import search from "./modules/search";
import detail from "./modules/detail";
import shopCart from "./modules/shopCart";
Vue.use(Vuex);
const state = {};
const actions = {};
const mutations = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    home,
    user,
    search,
    detail,
    shopCart,
  },
});
