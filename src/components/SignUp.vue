<template>
  <form @submit.prevent="submit">
    <form-input type="text" v-model="username" name="username" :error="usernameStatus.message"/>
    <form-input type="password" v-model="password" name="password" :error="passwordStatus.message"/>
    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid">
      Sign in
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import { required, validate, length, Status } from '@/validation'
import { User, useStore } from '@/store'
import { useModal } from '@/useModal'

export default defineComponent({
  name: 'SignUp',
  components: {
    FormInput
  },
  setup () {
    const store = useStore()
    const modal = useModal()
    const username = ref('Username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [required(), length({ min: 2, max: 20 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [required(), length({ min: 8, max: 40 })])
    })

    const submit = async () => {
      if (!usernameStatus.value.valid || !passwordStatus.value.valid) return

      const newUser: User = {
        id: '-1',
        username: username.value,
        password: password.value
      }

      await store.createUser(newUser)

      modal.hideModal()
    }

    return {
      username,
      password,
      usernameStatus,
      passwordStatus,
      submit
    }
  }
})
</script>

<style scoped>
form {
  padding: 15px;
  background-color: white;
}
</style>
