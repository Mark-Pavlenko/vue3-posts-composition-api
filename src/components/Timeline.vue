<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="(period, index) in periods"
         :key="index"
         :class="{'is-active' : period === currentPeriod }"
         :data-test="period"
         @click="setPeriod(period)"> {{ period }}
      </a>
    </span>
    <a
      v-for="post in posts"
      :key="post.id"
      class="panel-block"
    >
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM') }}</div>
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import { today, thisWeek, thisMonth } from '@/mocks'

type Period = 'Today' | 'This week' | 'This month';

export default defineComponent({
  name: 'TimeLine',
  props: {
    msg: String
  },
  setup (props) {
    console.log('props object', props)
    const periods = ['Today', 'This week', 'This month']
    const currentPeriod = ref<Period>('Today')

    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter(post => {
        if (currentPeriod.value === 'Today') {
          return post.created.isAfter(moment().subtract(1, 'day'))
        }
        if (currentPeriod.value === 'This week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }
        if (currentPeriod.value === 'This month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }
        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
      console.log('setPeriod', currentPeriod.value)
    }

    return {
      periods,
      setPeriod,
      currentPeriod,
      posts
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
