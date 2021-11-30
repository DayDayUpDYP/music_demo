<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />

    <!-- 搜索容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_warp">
        <!-- 热搜关键词容器 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
        >
          {{ obj.first }}</span
        >
      </div>
    </div>

    <!-- 结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <!-- 使用list组件 实现 瀑布流 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
          center
          v-for="obj in resultList"
          :key="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.7rem" />
          </template>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
// 目标 铺设 热搜关键字

// 目标2 铺设搜索结果
// 1 找到搜索结果API 定义请求接口
// 2 再定义methods里getListFn方法(获取数据)
// 3 在点击事件方法里调用getListFn方法拿到搜索结果的数据
// 4 铺设页面 与首页 van-cell 标签一样
// 5 把数据保存到data后，循环van-cell使用即可
// 6 互斥选择关键词
import { hotSearchAPI, searchResultListAPI } from "../../api";
export default {
  data() {
    return {
      value: "",
      hotArr: [], // 热搜关键字
      resultList: [], //搜索结果
      loading: false, //加载状态 只有为false才能触底自动触发onload方法
      finished: false, // 未加载全部 如果设置为true 底部就不会再次执行onload
      page: 1, //当前搜索结果的页码
      timer: null, //输入框防抖定时器
    };
  },

  async created() {
    const res = await hotSearchAPI();
    this.hotArr = res.data.result.hots;
    console.log(res);
  },
  methods: {
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20, //公式
      }); //原地return Promise结果
      //  ====一个难点=====
      // async修饰函数 -> 默认返回一个全新Promise对象
      // 这个Promise对象的结果==》就是async函数内return的值
      // 其意思就是 getListFn的返回值用await提取结果
    },
    async fn(val) {
      this.page = 1; //点击重新获取第一页的数据
      this.value = val; // 吧选中的关键词 显示到搜索框
      this.finished = false; //可能有新的数据
      const res = await this.getListFn();
      console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    // 输入框值改变
    async inputFn() {
      // 引入 防抖功能
      // 什么是防抖:
      // 防抖是 计时n秒，最后执行一次，如果再次触发，重新计时
      // 效果  用户在n秒内不触发这个事件，才会执行逻辑代码
      this.page = 1; //点击重新获取第一页的数据
      if (this.timer) clearTimeout(this.timer) // 当马上执行的时候 需要清除定时器 就不会立刻执行逻辑代码
        this.timer = setTimeout(async () => {
          this.page = 1;
          this.finished = false;
          if (this.value.length === 0) {
            //判断搜索关键词如果为空就直接阻止网络请求
            this.resultList = [];
            return;
          }
          const res = await this.getListFn();
          if (res.data.result.songs === undefined) {
            //没有数据
            this.resultList = [];
            return;
          }
          this.resultList = res.data.result.songs;
          this.loading = false;
        }, 900);
    },

    // 加载更多
    async onLoad() {
      //触底事件  需要加载下一页的数据 内部会自动把loading改为true
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        //没有数据
        this.finished = true; //只要设置true,list再次触发就不会执行onLoad函数
        // 这里 finished 变为true 后 再次执行 其他的 函数 如 inputFn函数时 也会只显示第一页
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false; ///保证加载完毕 保证下一次还能触发onload
    },
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