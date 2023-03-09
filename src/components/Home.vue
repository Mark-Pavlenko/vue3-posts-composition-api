<template>
      <suspense>
        <template #default>
          <TimeLine :msg="this.msg"/>
        </template>
        <template #fallback>
          <SpinnerComponent/>
        </template>
      </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimeLine from '@/components/Timeline.vue'
import SpinnerComponent from '@/components/Spinner.vue'

export default defineComponent({
  name: 'HomeComponent',
  components: {
    TimeLine,
    SpinnerComponent
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js + TypeScript App'
    }
  }
})
</script>

<style scoped>
</style>
