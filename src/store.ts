import { reactive, readonly } from 'vue'
import axios from 'axios'
import { Post, today, thisMonth, thisWeek } from '@/mocks'

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
    console.log('this.state', this.state)
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

const all = new Map<string, Post>()
all.set(today.id, today)
all.set(thisWeek.id, thisWeek)
all.set(thisMonth.id, thisMonth)

const store = new Store({
  posts: {
    all,
    ids: [today.id, thisWeek.id, thisMonth.id],
    loaded: false
  }
})

// providing injection
export function useStore () {
  return store
}

// store.getState().posts.all
