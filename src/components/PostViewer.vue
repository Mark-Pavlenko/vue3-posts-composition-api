<template>
  <div class="columns">
    <div class="column" />

    <div class="column is-two-thirds">
      <router-link
        v-if="canEdit"
        :to="to"
        class="button is-link is-rounded"
        data-test="can-edit"
      >
        Edit
      </router-link>
      <div v-html="post.html" />
    </div>

    <div class="column" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'PostViewer',
  async setup () {
    const store = useStore()
    const router = useRouter()
    const postId = useRoute().params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    console.log('postId', postId)
    console.log(store.getState().posts.all)
    const post = store.getState().posts.all.get(postId)
    console.log('post', post)

    if (!post) {
      throw Error('Post was not found!')
    }

    const canEdit = post.authorId === store.getState().authors.currentUserId

    return {
      post,
      canEdit,
      to: `/posts/${postId}/edit`
    }
  }
})
</script>

<style scoped>
</style>
