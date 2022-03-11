<template>
  <div class="pagination">
      <!-- 上 -->
      <!-- 上一页按钮在页面为1的时候是不能按的，在其它页面，点击传递数据-1 -->
    <button :disabled='pageNo==1' @click="$emit('pageNoIfo',page-1)">上一页</button>
    <!-- 只有当开始页大于1的时候才能显示，动态调试，点击传递数据1 -->
    <button v-if="compPage.start>1" @click="$emit('pageNoIfo',1)" :class='{active:pageNo==1}'>1</button>
    <button v-if="compPage.start>2">···</button>
    <!-- 中 -->
    <!-- v-for遍历连续尾页的数字，动态生成，只显示连续页开始和结尾部分，点击传送点击页面 -->
    <button v-for="(page,index) in compPage.end" :key="index"
      v-show="page>=compPage.start" @click="$emit('pageNoIfo',page)" :class='{active:pageNo==page}'>{{page}}</button>
   
    <!-- 下 -->
    <button  v-if="compPage.end<totalPage-1">···</button>
    <button v-if="compPage.end<totalPage" @click="$emit('pageNoIfo',totalPage)" :class='{active:pageNo==totalPage}'>{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('pageNoIfo',page+1)">上一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
      //计算连续页面的头和尾，需要考虑集中特殊情况
    compPage() {
      const { totalPage, pageNo, continues } = this;
      let start = 0, end = 0;
      //第一种情况，总页面小于连续页面
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      }
      //如果总页面大于连续页面
      else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //第二种情况：判断start小于1  如果pageNo=2, continues= 5
        // 0 1 2 3 4, 这样start 就为0了，continues更大一点就为负数了
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //第三种情况:判断end 大于总页数        27 28 pageNo = 29  30 31
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return {start,end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
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
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
