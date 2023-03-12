<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input v-model="title" class="input" type="text"/>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div ref="contentEditable" contenteditable @input="handleInputData"/>
    </div>
    <div class="column">
      <div v-html="html"/>
    </div>
  </div>

  <button @click="save" class="button is-primary is-pulled-right">Submit</button>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Post } from '@/mocks'
import { marked } from 'marked'
import highlight from 'highlight.js'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'PostWriter',
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  emits: {
    save: (post: Post) => {
      // validation
      return true
    }
  },
  setup (props, ctx) {
    const title = ref(props.post.title)
    const content = ref('## Title \nEnter your post content...')
    const html = ref('')

    const parseHtml = (str: string) => {
      html.value = marked.parse(str, {
        gfm: true,
        breaks: true,
        highlight (code: string) {
          return highlight.highlightAuto(code).value
        }
      })
    }

    watch(content, debounce(parseHtml, 250), { immediate: true })

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

      content.value = contentEditable.value?.innerText || ''
    }

    onMounted(() => {
      if (!contentEditable.value) {
        throw new Error('This can`t be!')
      }
      contentEditable.value.innerText = content.value
    })

    const save = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value
      }

      ctx.emit('save', newPost)
      // 1. Creating post
      // 2. Emitting an event
    }

    return {
      html,
      title,
      content,
      contentEditable,
      handleInputData,
      save
    }
  }
})
</script>

<style scoped>
.column {
  overflow-y: scroll;
}
</style>
