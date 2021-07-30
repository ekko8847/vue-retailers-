<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cart, index) in shopCartList" :key="index">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cart.cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="updateOneIschecked(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum(-1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              @change="
                changeNum($event.target.value * 1 - cartInfo.skuNum, cartInfo)
              "
              minnum="1"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum(1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(cartInfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalMoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//购物车页面步骤:
/*1,先发请求拿到数据, 
2,再完成单个input框的ischecked值,1为选中,2为未选中
3,完成选中物品数量的修改,发请求修改数据,再请求数据渲染到页面(接口文档参数为差值,商品信息) 
4,删除也是先发请求修改数据库数据,然后请求数据渲染到页面
5,接下来就是多选框和批量删除了(核心思想还是发请求去修改数据,然后再请求数据渲染)
v-model也可用于复选框(收集的是bool值)配合get()和set()使用
get()返回一个bool值,当所有的item的ischecked为1就变为true(实时计算)
set()修改,注意不是直接修改,我们所有的修改都是发请求去修改然后展示(准备好请求所需要的的参数).
 */

/* 关于tempID,不设置tempID的话是请求不到数据的,服务器不会知道你是谁(返回不到数据)
先在工具utils定义一个设置tempID的函数,再在vuex中保存
然后在请求拦截器中加入这个id;
*/
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  computed: {
    ...mapState({
      shopCartList: (state) => state.shopCart.shopCartList,
    }),
    checkNum() {
      return this.shopCartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },
    totalMoney() {
      return this.shopCartList.reduce((prev, item) => {
        prev += item.cartInfoList.reduce((prev1, item1) => {
          if (item1.isChecked) {
            prev1 += item1.skuNum * item1.cartPrice;
          }
          return prev1;
        }, 0);
        return prev;
      }, 0);
    },

    //计算属性的get和set方法 get为读取checkbox的值,set去修改且可以拿到最新状态的值(bool值)
    checkAll: {
      get() {
        return (
          this.shopCartList.every((item) =>
            item.cartInfoList.every((item1) => item1.isChecked)
          ) && this.shopCartList.length > 0
        );
      },
      //val为新值 v-model绑定的input框的bool值
      async set(val) {
        //因为val为bool值,我们需要转化一下为1或者零
        let isChecked = val ? 1 : 0;
        let skuIdList = [];
        //当多选框值为true时找到所有item(一项项去找)ischecked值不相符的item放进一个数组(发请求需要)
        this.shopCartList.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if (item1.isChecked !== isChecked) {
              skuIdList.push(item1.skuId);
            }
          });
        });
        try {
          await this.$store.dispatch("updateAllIsCheck", {
            isChecked,
            skuIdList,
          });
          alert("修改多个购物车状态成功");
          this.getShopCartList();
        } catch (error) {
          alert("修改多个购物车状态失败", error.message);
        }
      },
    },
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    async updateOneIschecked(cartInfo) {
      try {
        await this.$store.dispatch("updateOneIschecked", {
          skuId: cartInfo.skuId,
          isChecked: cartInfo.isChecked ? 0 : 1,
        });
        alert("修改数据成功!");
        //通过修改数据然后请求数据来更新页面
        this.getShopCartList();
      } catch (error) {
        alert("修改数据失败", error.message);
      }
    },
    async changeNum(disNum, cartInfo) {
      if (disNum + cartInfo.skuNum < 1) {
        disNum = 1 - cartInfo.skuNum;
      }
      try {
        await this.$store.dispatch("addShopCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        alert("修改数量成功");
        this.getShopCartList();
      } catch (error) {
        alert("修改购物车数量失败", error.message);
      }
    },
    async deleteOne(cartInfo) {
      try {
        await this.$store.dispatch("deleteOneCart", cartInfo.skuId);
        alert("删除单个成功");
        this.getShopCartList();
      } catch (error) {
        alert("删除单个失败", error.message);
      }
    },
    async deleteAll() {
      let skuIdList = [];
      this.shopCartList.forEach((item) => {
        item.cartInfoList.forEach((item1) => {
          if (item1.isChecked) {
            skuIdList.push(item1.skuId);
          }
        });
      });
      try {
        await this.$store.dispatch("deleteAllCart", skuIdList);
        alert("删除多个成功");
        this.getShopCartList();
      } catch (error) {
        alert("删除多个失败", error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
