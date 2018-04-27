import Vue from 'vue'
import Router from 'vue-router'

const Message = resolve => {
  import('@/components/message/message').then(module => {
    resolve(module)
  })
}

const Target = resolve => {
  import('@/components/target/target').then(module => {
    resolve(module)
  })
}
const Test = resolve => {
  import('@/components/test/test').then(module => {
    resolve(module)
  })
}
const Baby = resolve => {
  import('@/components/baby/baby').then(module => {
    resolve(module)
  })
}
const Card = resolve => {
  import('@/components/card/card').then(module => {
    resolve(module)
  })
}

const Hotkey = resolve => {
  import('@/components/hotKey/hotKey').then(module => {
    resolve(module)
  })
}
const Fouce = resolve => {
  import('@/components/fouce/fouce').then(module => {
    resolve(module)
  })
}
const Store = resolve => {
  import('@/components/store/store').then(module => {
    resolve(module)
  })
}
const Index = resolve => {
  import('@/components/index/index').then(module => {
    resolve(module)
  })
}
const Login = resolve => {
  import('@/components/login/login').then(module => {
    resolve(module)
  })
}
const Storedetail = resolve => {
  import('@/components/storeDetail/storeDetail').then(module => {
    resolve(module)
  })
}
const Sharedetail = resolve => {
  import('@/components/shareDetail/shareDetail').then(module => {
    resolve(module)
  })
}
const Share = resolve => {
  import('@/components/share/share').then(module => {
    resolve(module)
  })
}

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
