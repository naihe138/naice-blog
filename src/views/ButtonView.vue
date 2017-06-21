<template>
  <div class="button-view">
    <px-button></px-button>
  </div>
</template>

<script>
import PxButton from '@/components/Button'

export default {
  name: 'button-view',
  title() {
    return 'Koa Vue SSR | Button'
  },
  components: {
    PxButton
  }
}
</script>

<style>
</style>
