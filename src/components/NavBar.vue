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
    <SignUp/>
  </teleport>
</template>

<script lang="ts">
import { useModal } from '@/useModal'
import { defineComponent } from 'vue'
import SignUp from '@/components/SignUp.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    SignUp
  },
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
