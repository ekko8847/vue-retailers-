<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="item"
            >
              {{ item.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @searchTrademark="searchTrademark"
          @searchAttr="searchAttr"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderFlag === '1' }">
                  <a href="javascript:;" @click="changeOrder('1')"
                    >综合
                    <i
                      class="iconfont"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc',
                      }"
                      v-if="orderFlag === '1'"
                    ></i
                  ></a>
                </li>

                <li :class="{ active: orderFlag === '2' }">
                  <a href="javascript:;" @click="changeOrder('2')"
                    >价格
                    <i
                      class="iconfont"
                      :class="{
                        iconup: orderType === 'asc',
                        icondown: orderType === 'desc',
                      }"
                      v-if="orderFlag === '2'"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/' + item.id">
                      <img :src="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${item.id}`">
                      {{ item.title }}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 总页码=总条数/每页数量 -->
          <Pagination
            :currentPage="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="goodsListInfo.total"
            :continuePage="5"
            @changePage="getGoodsList"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      //定义一个搜索对象,里面数据默认为空,以后根据哪种搜索条件去请求数据(在api接口中用data表示)
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        trademark: "",
        props: [],
        order: "1:asc", //初始化默认的排序规则
        pageNo: 1, // 初始化默认的页码
        pageSize: 2, // 初始化默认的每页数量
      },
    };
  },
  components: {
    SearchSelector,
  },
  // beforeMount() {
  //   this.handleSearchParams();
  // },
  // mounted() {
  //   this.getGoodsList();
  // },
  //监听$route对象 里面的params和query一变就发送请求
  //immediate上来就执行一次拿到数据,只不过此时params为空(在一进去search组件就会拿到数据)
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.handleSearchParams();
        this.getGoodsList();
      },
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //mapState在使用vuex模块化时不能使用字符串
    ...mapState({
      goodsListInfo: (state) => state.search.GoodsListInfo,
    }),
    orderFlag() {
      return this.searchParams.order.split(":")[0];
    },
    orderType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  methods: {
    getGoodsList(page = 1) {
      this.searchParams.pageNo = page;
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    //给searchParams数据的函数
    handleSearchParams() {
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      let { keyword } = this.$route.params;
      let newSearchParams = {
        ...this.searchParams, //...是对searchParams的浅拷贝
        category1Id, //给这几个值重新复制
        category2Id,
        category3Id,
        categoryName,
        keyword,
      };
      //Object.keys拿到的是数组的所有索引下标(key)组成的数组
      //这一步的目的是去掉searchParams中的空对象
      Object.keys(newSearchParams).forEach((item) => {
        if (newSearchParams[item] === "") {
          delete newSearchParams[item];
        }
      });
      //将新对象赋给searchParams
      this.searchParams = newSearchParams;
    },
    removeKeyword() {
      //移除的操作就是将searchParams中的属性变为undefined.利用v-if去删除
      this.searchParams.keyword = undefined;
      //改变地址中的路径重新发请求
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
      //利用全局事件总线来移除搜索框中的记录
      //发布一个clear事件(可以携带参数)在header组件中通过回调接收这个参数
      this.$bus.$emit("clear");
    },
    removeCategory() {
      this.searchParams.categoryName = undefined;
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    //数据类型要看接口文档
    searchTrademark(item) {
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getGoodsList();
    },
    //删除面包屑也是通过v-if来完成,修改数据为undefined,bool(undefined)为false
    //然后再次请求数据
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getGoodsList();
    },
    //注意这里需要接收两个参数 都是通过自定义事件传过来的
    searchAttr(item, attr) {
      let newProps = `${attr.attrId}:${item}:${attr.attrName}`;
      //some是遍历数据找到符合条件的返回true(一个就行)
      let isRepeate = this.searchParams.props.some((item) => item == newProps);
      if (isRepeate) return;
      this.searchParams.props.push(newProps);
      this.getGoodsList();
    },
    removeAttr(index) {
      //根据下标去删除
      this.searchParams.props.splice(index, 1);
      this.getGoodsList();
    },
    changeOrder(orderFlag) {
      //获取的排序方式和类型都是你最新修改的
      let originFlag = this.searchParams.order.split(":")[0]; //获取初始的排序类型
      let originType = this.searchParams.order.split(":")[1]; //获取初始的排序方式
      let newOrder = [];
      //如果排序类型不变就将排序方式取反 (相比初始的排序类型)
      if (orderFlag === originFlag) {
        newOrder = `${originFlag}:${originType === "asc" ? "desc" : "asc"}`; //排序方式单纯的取反而已
      } else {
        //排序类型变了就将传过来的类型设置为新的,排序方式为默认的(原来的排序方式)
        // console.log(originType);
        newOrder = `${orderFlag}:asc`;
      }
      this.searchParams.order = newOrder;
      this.getGoodsList();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
