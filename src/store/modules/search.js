import { reqGoodsList } from "@/api";
const state = {
  GoodsListInfo: {},
};
const actions = {
  //第一个searchParams是组件dispatch传过来的,然后再调用接口请求函数将搜索参数传过去
  async getGoodsListInfo({ commit }, searchParams) {
    const result = await reqGoodsList(searchParams);
    if (result.code === 200) {
      commit("REVICEGOOSLIST", result.data);
    }
  },
};
const mutations = {
  REVICEGOOSLIST(state, GoodsList) {
    state.GoodsListInfo = GoodsList;
  },
};
//简化数据操作 根据返回的数据决定(嵌套太深)
const getters = {
  goodsList(state) {
    return state.GoodsListInfo.goodsList || []; //防止没数据getters拿不到会报错,影响后面程序执行
  },
  attrsList(state) {
    return state.GoodsListInfo.attrsList || [];
  },
  trademarkList(state) {
    return state.GoodsListInfo.trademarkList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
