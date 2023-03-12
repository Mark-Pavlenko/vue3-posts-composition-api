import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/components/Home.vue'
import NewPost from '@/components/NewPost.vue'
import ShowPost from '@/components/ShowPost.vue'
import { Store } from '@/store'
import EditPost from '@/components/EditPost.vue'

export function routerWithStore (store: Store) {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/posts/:id',
        component: ShowPost
      },
      {
        path: '/posts/new',
        component: NewPost,
        meta: { requiresAuth: true }
      },
      {
        path: '/posts/:id/edit',
        component: EditPost,
        meta: { requiresAuth: true }
      }
    ]
  })

  router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log(`from -> ${from.path} -> to: ${to.path}`)
    const auth = !!store.getState().authors.currentUserId

    if (!to.meta.requiresAuth) {
      next()
      return
    }

    if (to.meta.requiresAuth && auth) {
      next()
    } else {
      next({ path: '/' })
    }
  })

  return router
}
