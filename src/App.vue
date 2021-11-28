<template>
  <div>
    <!-- 一级路由 显示地方 -->

    <van-nav-bar
      :title="activateTitle"
    />
    <van-tabbar  route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >标签</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >标签</van-tabbar-item
      >
    </van-tabbar>
        <router-view></router-view>
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

<style></style>
