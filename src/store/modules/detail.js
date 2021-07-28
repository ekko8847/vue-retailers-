import { reqGoodsDetail } from "@/api";
const state = {
  goodsDetailInfo: {},
};
const actions = {
  async getgoodsDetail({ commit }, skuId) {
    const result = await reqGoodsDetail(skuId);
    if (result.code === 200) {
      commit("REVICEGOODSDETAIL", result.data);
    }
  },
};
const mutations = {
  REVICEGOODSDETAIL(state, goodsDetailInfo) {
    state.goodsDetailInfo = goodsDetailInfo;
  },
};
const getters = {
  categoryView(state) {
    return state.goodsDetailInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsDetailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsDetailInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
