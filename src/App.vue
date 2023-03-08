<template>
  <section class="section">
    <div class="container">
      <suspense>
        <template #default>
          <TimeLine :msg="this.msg"/>
        </template>
        <template #fallback>
         <SpinnerComponent/>
        </template>
      </suspense>

    </div>
  </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimeLine from '@/components/Timeline.vue'
import SpinnerComponent from '@/components/Spinner.vue'

export default defineComponent({
  name: 'App',
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
