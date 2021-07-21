import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import user from "./modules/user";
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
  },
});
