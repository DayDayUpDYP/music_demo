import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout'
import Play from '@/views/Play'
import Home from '@/views/Home'
import Search from "@/views/Search";
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/layout',
        
    },
    {
        path:'/layout',
        name:"Layout",
        component:Layout,
        redirect:'/layout/home',
        children:[
            {
                path:'home',
                name:"Home",
                component:Home,
                meta:{ // 元信息-给当前路由对象绑定值
                    title:"首页"
                }
            },
            {
                path:'search',
                name:"Search",
                component:Search,
                meta:{
                    title:"搜索"
                }
            }
        ]
    },
    {
        path:'/play',
        name:'Play',
        component:Play
    }
    
]

// 生成路由对象
const router = new VueRouter({
    routes
})

export default router