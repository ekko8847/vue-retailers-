import {
  reqAddShopCart,
  reqShopCartList,
  reqUpdateOneIschecked,
  reqUpdateAllIschecked,
  reqDeleteOneCart,
  reqDeleteAllCart,
} from "@/api";

const state = {
  shopCartList: [],
};
const mutations = {
  REVICESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  //数据为空
  async addShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("REVICESHOPCARTLIST", result.data);
    }
  },
  async updateOneIschecked({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateOneIschecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async updateAllIschecked({ commit }, { skuId, skuIdList }) {
    const result = await reqUpdateAllIschecked(skuId, skuIdList);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async deleteOneCart({ commit }, skuId) {
    const result = await reqDeleteOneCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async updateAllIsCheck({ commit }, { isChecked, skuIdList }) {
    const result = await reqUpdateAllIschecked(isChecked, skuIdList);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
    }
  },
  async deleteAllCart({ commit }, skuIdList) {
    const result = await reqDeleteAllCart(skuIdList);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("FF"));
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
