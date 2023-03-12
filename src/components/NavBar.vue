<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" to="/posts/new">New post</router-link>
        <button class="button" @click="signOut">
          Sign out
        </button>
      </div>
      <div class="buttons" v-else>
        <button class="button" @click="signUp">
          Sign up
        </button>
        <button class="button" @click="signIn">
          Sign in
        </button>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <component :is="component"/>
  </teleport>
</template>

<script lang="ts">
import { useModal } from '@/useModal'
import { useStore } from '@/store'
import { computed, defineComponent, h, markRaw } from 'vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    SignIn,
    SignUp
  },
  setup () {
    const modal = useModal()
    const store = useStore()

    const auth = computed(() => {
      return !!store.state.authors.currentUserId
    })

    // console.log(SignUp)

    const signIn = () => {
      // const Demo = defineComponent({
      //   setup () {
      //     const SignInNode = h('div', 'Demo value 123333')
      //
      //     return {
      //       SignInNode
      //     }
      //   }
      // })
      // modal.component.value = markRaw(Demo)
      modal.component.value = markRaw(SignIn)
      modal.showModal()
    }
    const signUp = () => {
      modal.component.value = markRaw(SignUp)
      modal.showModal()
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const signOut = () => {

    }

    return {
      component: modal.component,
      auth,
      signIn,
      signUp,
      signOut
      // signUp: () => {
      //   return modal.showModal()
      // }
    }
  }
})
</script>

<style scoped>
</style>
