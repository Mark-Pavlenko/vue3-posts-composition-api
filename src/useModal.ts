import { ref } from 'vue'

const show = ref(false)

export function useModal () {
  return {
    show,
    // eslint-disable-next-line no-return-assign
    showModal: () => show.value = true,
    // eslint-disable-next-line no-return-assign
    hideModal: () => show.value = false
  }
}
