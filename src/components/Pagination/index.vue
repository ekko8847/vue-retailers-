<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('changePage', currentPage - 1)"
    >
      上一页
    </button>
    <!-- 这里的按钮1只有start大于1时才会显示, 否则在页面中看到1永远显示是vfor生成的按钮1 -->
    <button v-if="startAndEnd.start > 1" @click="$emit('changePage', 1)">
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      :class="{ active: currentPage === page }"
      v-for="page in startAndEnd.end"
      :key="page"
      v-if="page >= startAndEnd.start"
      @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">
      ···
    </button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('changePage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="currentPage === totalPage"
      @click="$emit('changePage', currentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //接收数据的不同写法
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    continuePage: Number,
    pageSize: Number,
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      let { currentPage, totalPage, continuePage } = this;
      let start, end;
      if (totalPage < continuePage) {
        start = 1;
        end = totalPage;
      } else {
        start = currentPage - Math.floor(continuePage / 2);
        end = currentPage + Math.floor(continuePage / 2);
        if (start < 1) {
          start = 1;
          end = continuePage;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continuePage + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
