<template>
  <post-writer :post="newPost" @save="save"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
import PostWriter from '@/components/PostWriter.vue'
import { Post } from '@/mocks'

export default defineComponent({
  name: 'NewPost',
  components: {
    PostWriter
  },
  setup () {
    const newPost : Post = {
      id: '-1',
      title: 'New post',
      created: moment()
    }

    const save = (post: Post) => {
      console.log('post', post)
    }

    return {
      newPost,
      save
    }
  }
})
</script>

<style scoped>
</style>
