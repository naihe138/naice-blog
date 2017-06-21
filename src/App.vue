<template>
  <div id="app">
    <div class="menu-horizontal">
      <router-link class="menu__heading menu__link" to="/home">Home</router-link>
      <ul class="menu__list">
        <li class="menu__item">
          <router-link class="menu__link" to="/menu" active-class="menu__item--active">Menu</router-link>
        </li>
        <li class="menu__item">
          <router-link class="menu__link" to="/button"
            active-class="menu__item--active">Button</router-link>
        </li>
        <li class="menu__item">
          <router-link class="menu__link" to="/test" active-class="menu__item--active">Tesst</router-link>
        </li>
      </ul>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
}
</script>

<style>
/* normalize */
@import './assets/css/normalize.css';

/* Menu */
@import './components/Menu/base.css';
@import './components/Menu/horizontal.css';

/* Button*/
@import './components/Button/base.css';

html {
  font-size: 62.5%;
}
body {
  font-size: 1.4rem;
}
.view {
  padding: 2rem;
}
</style>
