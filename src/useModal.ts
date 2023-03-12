import { ref } from 'vue'

const show = ref(false)
const component = ref()

export function useModal () {
  return {
    component,
    show,
    // eslint-disable-next-line no-return-assign
    showModal: () => show.value = true,
    // eslint-disable-next-line no-return-assign
    hideModal: () => show.value = false
  }
}
