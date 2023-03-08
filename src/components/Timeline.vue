<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a>Today</a>
      <a>This week</a>
      <a>This month</a>
    </span>
  </nav>
    <h1>Timeline</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimeLine',

  setup () {
    console.log('component is setup')
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
