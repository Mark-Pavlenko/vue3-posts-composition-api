<template>
  <div>
    Show post
    {{post}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PostViewer',
  async setup () {
    const store = useStore()
    const postId = useRoute().params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all.get(postId)

    if (!post) {
      throw Error('Post was not found!')
    }

    return {
      post
    }
  }
})
</script>

<style scoped>
</style>
