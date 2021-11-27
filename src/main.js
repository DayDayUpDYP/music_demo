import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"
import "@/styles/reset.css"
import router from '@/router'

Vue.config.productionTip = false

// 引入 与组成 Tabbar相关组件
import { Tabbar, TabbarItem,NavBar,Col, Row, Image as VanImage} from 'vant';
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar)
Vue.use(VanImage)

// 测试封装的api方法

// 目标：封装网络请求
// 1 src/utils/request.js 设置基本地址 导出axios函数
// 2 src/api/Home.js 请求方法axios({url:"具体"})
// 3 src/api/index.js 吧Home.js 里 函数引入过来统一导出
// 4 具体逻辑页面 引入api/index.js 请求方法  async  await 等到

import { recommendMusicAPI } from './api'
async function testRecommendMusicAPI(){
  const res = await recommendMusicAPI() //api原地会得到axios请求再原地的Promise对象(里面有一个ajax请求)
  console.log("执行了 这个方法");
  console.log(res);
}


new Vue({
  router, //来自与router组件
  render: h => h(App),
}).$mount('#app')
