import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  RECIVECATEGORY(state, categoryList) {
    state.categoryList = categoryList;
  },
  REVICEBANNER(state, bannerList) {
    state.bannerList = bannerList;
  },
  REVICEFLOOR(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  async getCategory({ commit }) {
    const result = await reqCategoryList();
    if (result.code === 200) {
      commit("RECIVECATEGORY", result.data);
    }
  },
  async getBanner({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("REVICEBANNER", result.data);
    }
  },
  async getFloor({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("REVICEFLOOR", result.data);
    }
  },
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
