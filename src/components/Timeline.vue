<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="(period, index) in periods"
         :key="index"
         :class="{'is-active' : period === currentPeriod }"
         @click="setPeriod(period)"> {{period}}
      </a>
    </span>
<!--    {{currentPeriod}}-->
  </nav>
    <h1>Timeline</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

type Period = 'Today' | 'This week' | 'This month';

export default defineComponent({
  name: 'TimeLine',
  props: {
    msg: String
  },
  setup (props) {
    const periods = ['Today', 'This week', 'This month']
    console.log('props object', props)

    const currentPeriod = ref<Period>('Today')

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
      console.log('setPeriod', currentPeriod.value)
    }

    return {
      periods,
      setPeriod,
      currentPeriod
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
