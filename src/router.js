import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'
import updata from './views/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login

    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '',
        name: 'default',
        component: Main
      },
      {
        path: '/home/comment',
        component: () => import('./views/comment')
      },
      {
        path: '/home/articles',
        component: () => import('./views/articles')
      }, {
        path: '/home/publish', // 发表文章
        component: () => import('./views/publish') // 按需加载的写法
      }, {
        path: '/home/publish/:articleId', // 发表文章
        component: () => import('./views/publish') // 按需加载的写法
      }, {
        path: '/home/fans',
        component: () => import('./views/fans')
      }
      ]
    },
    {
      path: '/updata',
      component: updata
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
