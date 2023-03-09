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
      <div v-html="html" />
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, watchEffect } from 'vue'
import { Post } from '@/mocks'
import { marked } from 'marked'

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
    const html = ref('')

    // called once after component creation and every time when element changed
    watchEffect(() => {
      html.value = marked.parse(content.value)
    })

    // called every time when element was changed
    // watch(content, (newContent) => {
    //   html.value = marked.parse(content.value)
    // }, {
    //   // called also once the component created
    //   immediate: true
    // })

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
      html,
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
