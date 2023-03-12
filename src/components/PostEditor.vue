<template>
  Post editor
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PostEditor',
  async setup () {
    const store = useStore()
    const router = useRouter()
    const postId = useRoute().params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all.get(postId)

    if (!post) {
      throw Error('Post was not found!')
    }

    if (post.authorId !== store.getState().authors.currentUserId) {
      await router.push('/')
    }

    console.log('post to edit', post)

    return {
      post
    }
  }
})

</script>
