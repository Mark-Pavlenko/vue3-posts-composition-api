<template>
  <div>
    Show post
    {{post}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'ShowPost',
  setup (props) {
    const store = useStore()
    const postId = useRoute().params.id as string
    const post = store.getState().posts.all.get(postId)
    return {
      post
    }
  }
})
</script>

<style scoped>
</style>
