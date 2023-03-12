<template>
  <suspense>
    <template #default>
   <PostEditor/>
    </template>
    <template #fallback>
      <SpinnerComponent/>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostEditor from '@/components/PostEditor.vue'
import SpinnerComponent from '@/components/Spinner.vue'

export default defineComponent({
  name: 'EditPost',
  components: {
    PostEditor,
    SpinnerComponent
  }
})

</script>
