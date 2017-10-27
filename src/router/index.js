import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import PostListView from '@/views/PostListView'
// import PostList from '@/views/PostList'
// import PostDetail from '@/views/PostDetail'
// import Test from '@/views/test'
Vue.use(Router)
  /* eslint-disable import/no-dynamic-require */
export default new Router({
  mode: 'history',
  scrollBehavior: (e) => {
    if (window) {
      const listBox = document.querySelector('.listBox')
      if (listBox) {
        listBox.scrollTop = 0
      }
    }
    return ({ y: 0 })
  },
  routes: [{
    path: '/',
    component: HomeView
  }, {
    path: '/articles',
    component: PostListView,
    redirect: '/articles',
    children: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/PostList'], resolve)
      }
    }]
  }, {
    path: '/articles/:id',
    component: PostListView,
    redirect: '/articles',
    children: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/PostDetail'], resolve)
      }
    }]
  }, {
    path: '/tag',
    component: PostListView,
    redirect: '/articles',
    children: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/PostList'], resolve)
      }
    }]
  }, {
    path: '/about',
    component: PostListView,
    redirect: '/',
    children: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/About'], resolve)
      }
    }]
  }, {
    path: '/project',
    component: PostListView,
    redirect: '/',
    children: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/Project'], resolve)
      }
    }]
  }, {
    path: '*',
    redirect: '/'
  }]
})
