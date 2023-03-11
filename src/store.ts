import { reactive, readonly, provide, inject, App } from 'vue'
import axios from 'axios'
import { Post, today, thisMonth, thisWeek } from '@/mocks'

export interface User {
  id: string,
  username: string,
  password: string
}

interface PostsState {
  ids: string[],
  all: Map<string, Post>,
  loaded: boolean
}
interface State {
  posts: PostsState
}

export const storeKey = Symbol('store')

class Store {
  state: State

  constructor (initial: State) {
    this.state = reactive(initial)
  }

  install (app: App) {
    app.provide(storeKey, this)
  }

  getMockPosts () {
    return readonly(this.state)
  }

  async createPost (post: Post) {
    const response = await axios.post<Post>('/posts', post)
    this.state.posts.all.set(post.id, response.data)
    this.state.posts.ids.push(post.id)
  }

  async fetchPosts () {
    const response = await axios.get<Post[]>('/posts')

    console.log('response', response)

    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true
    }

    for (const post of response.data) {
      postsState.ids.push(post.id)
      postsState.all.set(post.id, post)
    }
    this.state.posts = postsState
  }

  async createUser (user: User) {
    console.log('user', user)
    // const response = await axios.post<User>('/posts', user)
    // this.state.posts.all.set(post.id, response.data)
    // this.state.posts.ids.push(post.id)
  }
}

const all = new Map<string, Post>()
all.set(today.id, today)
all.set(thisWeek.id, thisWeek)
all.set(thisMonth.id, thisMonth)

export const store = new Store({
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
})

// providing injection
export function useStore (): Store {
  const _store = inject<Store>(storeKey)
  if (!_store) {
    throw Error('You have forgotten to call a provide')
  }
  return _store
}

// store.getState().posts.loaded
