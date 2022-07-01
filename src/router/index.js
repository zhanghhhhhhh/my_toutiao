import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: () => import('@/views/Login')
}, {
  path: '/search',
  component: () => import('@/views/Search')
},
{
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [{
    path: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: 'video',
    component: () => import('@/views/Video')
  },
  {
    path: 'question',
    component: () => import('@/views/Question')
  },
  {
    path: 'my',
    name: 'my',
    component: () => import('@/views/My')
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
