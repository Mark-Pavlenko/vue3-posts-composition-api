<template>
  <post-writer :post="newPost"/>
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

    return {
      newPost
    }
  }
})
</script>

<style scoped>
</style>
