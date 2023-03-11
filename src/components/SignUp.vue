<template>
  <form @submit="submit">
    <form-input type="text" v-model="username" name="username" :error="usernameStatus.message"/>
    <form-input type="password" v-model="password" name="password" :error="passwordStatus.message"/>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import FormInput from '@/components/FormInput.vue'
import { required, validate, length, Status } from '@/validation'

export default defineComponent({
  name: 'SignUp',
  components: {
    FormInput
  },
  setup () {
    const username = ref('Username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [required(), length({ min: 2, max: 20 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [required(), length({ min: 8, max: 40 })])
    })

    const submit = (event: Event) => {
      //
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
