<template>
  <div class="button-template">
    <div class="button">default</div>
    <div class="button button--active">active</div>
    <div class="button" disabled>disabled</div>
    <!--  Buttons with different status -->
    <div>
      <div class="button button--primary">primary</div>
      <div class="button button--success">success</div>
      <div class="button button--error">error</div>
      <div class="button button--warning">warning</div>
    </div>
    <!-- Buttons with different colors-->
    <div>
      <div class="button button--blue">blue</div>
      <div class="button button--yellow">yellow</div>
      <div class="button button--black">black</div>
      <div class="button button--green">green</div>
      <div class="button button--round button--red">red</div>
      <div class="button button--round button--purple">purple</div>
      <div class="button button--round button--orange">orange</div>
      <div class="button button--round button--indigo">indigo</div>
    </div>
    <!--Buttons with different sizes-->
    <div>
      <a class="button button--xsmall button--purple">xsmall</a>
      <a class="button button--small button--orange">small</a>
      <div class="button">regular</div>
      <a class="button button--large button--indigo">large</a>
      <a class="button button--xlarge button--red">xlarge</a>
    </div>
    <!--button-group-->
    <div class="button-group">
      <div class="button button--blue">blue</div>
      <div class="button button--yellow">yellow</div>
      <div class="button button--black">black</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'button'
}
</script>

<style>
/*@import './base.css';*/

.button-template {
  display: block;
  padding: 1rem;
  margin-bottom: 10rem;
}

.button {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
