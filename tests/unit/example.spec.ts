import { mount, flushPromises } from '@vue/test-utils'
import TimeLine from '@/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '@/mocks'

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline () {
  return mount({
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
  })
}

describe('TimeLine.vue', () => {
  it('renders today posts by default', async () => {
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
