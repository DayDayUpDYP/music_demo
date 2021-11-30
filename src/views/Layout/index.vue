<template>
  <div>
    <!-- 一级路由 显示地方 -->

    <van-nav-bar 
    :title="activateTitle"
    fixed
    />
    <div class="main">

          <!-- 二级路由挂载点 -->
    <router-view></router-view>

    </div>

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
    return {
      activateTitle:this.$route.meta.title //顶部导航要显示的标题(默认获取当前路由对象里meta的title值)
    };
  },
  //路由切换 - 侦听$route对象改变 监听器
  
  watch:{
    $route(){
      this.activateTitle = this.$route.meta.title; //提取切换后路由信息对象里的title
    }

  }
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>