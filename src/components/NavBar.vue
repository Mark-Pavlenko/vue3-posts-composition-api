<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="show">
          Sign up
        </button>
        <router-link class="button" to="/posts/new">New post</router-link>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <div>Modal</div>
  </teleport>
</template>

<script lang="ts">
import { useModal } from '@/useModal'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  setup () {
    const modal = useModal()
    return {
      show: () => {
        return modal.showModal()
      }
    }
  }
})
</script>

<style scoped>
</style>
