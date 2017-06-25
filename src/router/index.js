import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import PostListView from '@/views/PostListView'
import PostList from '@/views/PostList'
// import Test from '@/views/test'
Vue.use(Router)
/* eslint-disable import/no-dynamic-require */
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/post',
      component: PostListView,
      children: [
        {
          path: '/',
          component: PostList
        },
      ]
    },
    {
      path: '/test',
      component: (resolve) => {
        require(['@/views/test'], resolve)
      }
    },
    // 路由出错的时候重定向到首页
    {
      path: '*',
      redirect: '/home'
    },
  ]
})
