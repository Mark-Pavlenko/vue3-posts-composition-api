import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import 'highlight.js/styles/an-old-hope.css'
import { random } from 'lodash'
import { Post, thisMonth, thisWeek, today } from '@/mocks'
import axios from 'axios'
import { store, storeKey, User, Author } from '@/store'

function delay () {
  // eslint-disable-next-line promise/param-names
  return new Promise(res => {
    setTimeout(res, 500)
  })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
  if (url === '/posts') {
    await delay()
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === '/posts') {
    console.log('payload', payload)
    const id = random(100, 10000)
    await delay()
    const post: Post = {
      ...payload,
      id: id.toString(),
      title: payload.title,
      created: payload.created,
      authorId: payload.authorId
    }
    return Promise.resolve<{ data: Post }>({
      data: post
    })
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.post = async (url: string, user: User) => {
  if (url === '/users') {
    const id = random(100, 10000)
    await delay()
    const author: Author = {
      id: id.toString(),
      username: user.username
    }
    return Promise.resolve({
      data: author
    })
  }
}

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
