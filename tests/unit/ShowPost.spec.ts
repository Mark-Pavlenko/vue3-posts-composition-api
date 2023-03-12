import { mount, flushPromises } from '@vue/test-utils'
import ShowPost from '../../src/components/ShowPost.vue'
import { Store } from '@/store'
import { today } from '@/mocks'
import { routerWithStore } from '@/router'

const wrapperComponentHelper = async (store: Store, toBe: boolean) => {
  const router = routerWithStore(store)
  await router.push(`/posts/${today.id}`)
  await router.isReady()

  const wrapper = mount(ShowPost, {
    global: {
      plugins: [store, router]
    }
  })

  await flushPromises()

  expect(wrapper.find('[data-test="can-edit"]').exists()).toBe(toBe)
}

describe('ShowPost', () => {
  it('does not show edit button when not authenticated', async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true
      },
      authors: {
        ids: [],
        all: new Map(),
        loaded: true,
        currentUserId: undefined
      }
    })

    await wrapperComponentHelper(store, false)
  })

  it('does not show edit button when not authorized', async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true
      },
      authors: {
        ids: ['100000'],
        all: new Map([['100000', {
          id: '100000',
          username: 'username'
        }]]),
        loaded: true,
        currentUserId: undefined
      }
    })
    await wrapperComponentHelper(store, false)
  })

  it('shows edit button when authorized', async () => {
    const store = new Store({
      posts: {
        ids: [today.id],
        all: new Map([[today.id, today]]),
        loaded: true
      },
      authors: {
        ids: ['1'],
        all: new Map([['1', {
          id: '1',
          username: 'username'
        }]]),
        loaded: true,
        currentUserId: '1'
      }
    })

    await wrapperComponentHelper(store, true)
  })
})
