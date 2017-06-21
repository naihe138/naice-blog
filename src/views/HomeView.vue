<template>
  <div class="home-view">
    <img src="../assets/img/logo.png">
    <h1>Koa Vue SSR Template</h1>
  </div>
</template>

<script>
export default {
  title() {
    return 'Koa Vue SSR'
  }
}
</script>

<style>
.home-view {
  margin-top: 1rem;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

  & h1, & h3 {
    font-weight: normal;
  }
}

</style>
