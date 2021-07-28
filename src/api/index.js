import Ajax from "@/utils/request";
import mockAjax from "@/utils/mockRequest";
export const reqCategoryList = () => {
  return Ajax({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};
export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};
export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};
export const reqGoodsList = (params) => {
  return Ajax({
    url: "/list",
    method: "post",
    data: params,
  });
};
export const reqGoodsDetail = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: "get",
  });
};
//购物车是否添加成功
export const reqAddShopCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};
export const reqShopCartList = () => {
  return Ajax({
    url: "/cart/cartList",
    method: "get",
  });
};
export const reqUpdateOneIschecked = (skuId, isChecked) => {
  return Ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};
export const reqUpdateAllIschecked = (isChecked, skuIdList) => {
  return Ajax({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: "post",
    data: skuIdList,
  });
};

export const reqDeleteOneCart = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};
export const reqDeleteAllCart = (skuIdList) => {
  return Ajax({
    url: `/cart/batchDeleteCart`,
    method: "delete",
    data: skuIdList,
  });
};
export const reqCode = (phone) => {
  return Ajax({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};
export const reqRegister = (userInfo) => {
  return Ajax({
    url: `/user/passport/register`,
    method: "post",
    data: userInfo,
  });
};
export const reqLogin = (userInfo) => {
  return Ajax({
    url: `/user/passport/login`,
    method: "post",
    data: userInfo,
  });
};
export const reqUserInfo = () => {
  return Ajax({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
  });
};
export const reqLogout = () => {
  return Ajax({
    url: `/user/passport/logout`,
    method: "get",
  });
};
