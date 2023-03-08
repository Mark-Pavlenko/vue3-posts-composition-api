// import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import TimeLine from '@/components/Timeline.vue'
import { today, thisWeek, thisMonth } from '../../src/mocks'

describe('TimeLine.vue', () => {
  it('renders today posts by default', () => {
    const wrapper = mount(TimeLine)
    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('updates, when the period is clicked', async () => {
    const wrapper = mount(TimeLine)

    // we should wait for the next frame
    await wrapper.get('[data-test="This week"]').trigger('click')

    // await nextTick()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('updates, when the period is clicked', async () => {
    const wrapper = mount(TimeLine)

    // we should wait for the next frame
    await wrapper.get('[data-test="This month"]').trigger('click')

    // or we can do it in such ways
    // await nextTick()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})
