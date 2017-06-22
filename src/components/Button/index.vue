<template>
  <div class="button-template">
    <div class="button">default</div>
    <div class="button" disabled>disabled</div>
    <div class="ccc">ccc</div>
  </div>
</template>

<script>
export default {
  name: 'button'
}
</script>

<style scoped>
:root {
  --testColor: {
    color: blue;
  };
}
.button {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
.ccc {
  margin-right: 1rem;
  margin-bottom: 1rem;
  @apply --testColor;
}
</style>
