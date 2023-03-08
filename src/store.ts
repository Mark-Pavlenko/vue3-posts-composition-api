import { reactive, readonly } from 'vue'
import axios from 'axios'
import { Post } from '@/mocks'

interface PostsState {
  ids: string[],
  all: Map<string, Post>,
  loaded: boolean
}
interface State {
  posts: PostsState
}

class Store {
  state: State

  constructor (initial: State) {
    this.state = reactive(initial)
  }

  getMockPosts () {
    return readonly(this.state)
  }

  async fetchPosts () {
    const response = await axios.get<Post[]>('/posts')

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
}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false
  }
})

// providing injection
export function useStore () {
  return store
}

// store.getState().posts.all
