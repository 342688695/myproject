import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/components/message/message'
import Target from '@/components/target/target'
import Test from '@/components/test/test'
import Baby from '@/components/baby/baby'
import Card from '@/components/card/card'
import Hotkey from '@/components/hotKey/hotKey'
import Fouce from '@/components/fouce/fouce'
import Store from '@/components/store/store'
import Index from '@/components/index/index'
import Login from '@/components/login/login'
import Storedetail from '@/components/storeDetail/storeDetail'
import Sharedetail from '@/components/shareDetail/shareDetail'
import Share from '@/components/share/share'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/target',
      component: Target,
      children: [
        {
          path: '/',
          redirect: 'card'
        },
        {
          path: 'card',
          component: Card
        },
        {
          path: 'hotKey',
          component: Hotkey
        },
        {
          path: 'fouce',
          component: Fouce
        },
        {
          path: 'store',
          component: Store
        }
      ]
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/baby',
      component: Baby
    },
    {
      path: '/goods:id',
      component: Storedetail
    },
    {
      path: '/shareDetail:id',
      component: Sharedetail
    },
    {
      path: '/share',
      component: Share
    }
  ]
})
