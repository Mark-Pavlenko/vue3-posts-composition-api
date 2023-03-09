<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInputData"/>
    </div>
    <div class="column">
      {{content}}
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Post } from '@/mocks'

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  setup (props) {
    const title = ref(props.post.title)
    const content = ref('## Title \nEnter your post content...')
    const contentEditable = ref<HTMLDivElement | null>(null)

    const handleInputData = () => {
      if (!contentEditable.value) {
        throw new Error('This can`t be!')
      }

      content.value = contentEditable.value?.textContent || ''
    }

    onMounted(() => {
      if (!contentEditable.value) {
        throw new Error('This can`t be!')
      }
      contentEditable.value.textContent = content.value
    })

    return {
      title,
      content,
      contentEditable,
      handleInputData
    }
  }
})
</script>

<style scoped>
</style>
