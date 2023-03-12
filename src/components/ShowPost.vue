<template>
  <suspense>
    <template #default>
      <post-viewer/>
    </template>
    <template #fallback>
      <SpinnerComponent/>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostViewer from '@/components/PostViewer.vue'
import SpinnerComponent from '@/components/Spinner.vue'

export default defineComponent({
  name: 'ShowPost',
  components: {
    PostViewer,
    SpinnerComponent
  }
})
</script>

<style scoped>
</style>
