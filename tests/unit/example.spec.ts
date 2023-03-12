import { mount, flushPromises } from '@vue/test-utils'
import TimeLine from '@/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '@/mocks'
import {Author, Store} from '@/store'

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline () {
  const store = new Store({
    authors: {
      all: new Map<string, Author>(),
      ids: [],
      loaded: false,
      currentUserId: undefined
    },
    posts: {
      ids: [],
      all: new Map(),
      loaded: false
    }
  })
  const testComponent = {
    components: { TimeLine },
    template: `
        <suspense>
          <template #default>
            <time-line/>
          </template>
          <template #fallback>
            Loading...
          </template>
        </suspense>
      `
  }
  return mount(testComponent, {
    global: {
      plugins: [store]
    }
  })
}

describe('TimeLine.vue', () => {
  it.only('renders today posts by default', async () => {
    const wrapper = mountTimeline()

    // nextTick -> Vue internal Promises
    // axios - flushPromises
    await flushPromises()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('updates, when the period is clicked', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    // we should wait for the next frame
    await wrapper.get('[data-test="This week"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('updates, when the period is clicked', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    // we should wait for the next frame
    await wrapper.get('[data-test="This month"]').trigger('click')

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})
