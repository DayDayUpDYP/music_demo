<template>
  <div>
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" />

    <!-- 搜索容器 -->

    <div class="search_wrap">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_warp">
        <!-- 热搜关键词容器 -->
        <span class="hot_item" 
        v-for="(obj, index) in hotArr" 
        :key="index"
        @click="fn(obj.first)">
          {{obj.first}}</span>

      </div>
    </div>
  </div>
</template>

<script>
// 目标 铺设 热搜关键字
import { hotSearchAPI } from "../../api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], // 热搜关键字
    };
  },
  methods:{
    fn(val){
      this.value = val // 吧选中的关键词 显示到搜索框
    } 
  },
  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
    console.log(res);
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>