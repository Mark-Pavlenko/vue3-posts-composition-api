<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal">
        Here will be Modal content
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="modal.hideModal()">
    </button>
  </div>

  <section class="section">
    <div class="container">
      <form-input v-model="username" name="Marko" type="text" error="There is an error"/>
      {{ username }}
      <NavBar/>
      <router-view/>
    </div>
  </section>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import FormInput from '@/components/FornInput.vue'
import { useModal } from '@/useModal'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    FormInput
  },
  setup () {
    const modal = useModal()
    const username = ref('Pavlenko')

    const style = computed(() => {
      return {
        display: modal.show.value === true ? 'block' : 'none'
      }
    })

    return {
      style,
      modal,
      username
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
