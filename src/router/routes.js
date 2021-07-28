import Home from "@/pages/Home";
import Rigister from "@/pages/Register";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import shopCart from "@/pages/ShopCart";
export default [
  {
    path: "/shopCart",
    component: shopCart,
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    path: "/detail/:skuId",
    component: Detail,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/register",
    component: Rigister,
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/search/:keyword?", //使用params参数一定要占位,params是直接写进路径的
    name: "search",
    component: Search,
  },
  {
    path: "/",
    redirect: "/home",
  },
];
