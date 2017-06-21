<template>
  <div class="menu-template">
    <div class="separator">horizontal menu</div>
    <div class="menu-horizontal">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item menu__item--disabled"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item menu__item--active"><a href="#" class="menu__link">Blog</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">horizontal menu with border and separator</div>
    <div class="menu-horizontal menu-border">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__separator"></li>
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Blog</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">menu with border and separator</div>
    <div class="menu" style="border: 1px solid #ccc; width: 150px;">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__separator"></li>
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Blog</a></li>
        <li class="menu__separator"></li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">menu with nested children</div>
    <div class="menu" style="width: 150px;">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item submenu submenu--active">
          <a href="#" class="menu__link">Blog</a>
          <ul class="menu__dropdown-list">
            <li class="menu__item"><a class="menu__link" href="/handlebars">Handlebars Helpers</a></li>
            <li class="menu__item"><a class="menu__link" href="/dust">Dust Helpers</a></li>
            <li class="menu__item"><a class="menu__link" href="/react">React Mixins</a></li>
            <li class="menu__item submenu submenu--allow-hover">
              <a href="#" class="menu__link">More Stuff</a>
              <ul class="menu__dropdown-list">
                <li class="menu__item"><a class="menu__link" href="/handlebars">Foo</a></li>
                <li class="menu__separator"></li>
                <li class="menu__item"><a class="menu__link" href="/dust">Bar</a></li>
                <li class="menu__item"><a class="menu__link" href="/react">Baz</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">horizontal menu with nested children</div>
    <div class="menu-horizontal">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item submenu submenu--allow-hover">
          <a href="#" class="menu__link">Blog</a>
          <ul class="menu__dropdown-list">
            <li class="menu__item"><a class="menu__link" href="/handlebars">Handlebars Helpers</a></li>
            <li class="menu__item"><a class="menu__link" href="/dust">Dust Helpers</a></li>
            <li class="menu__item"><a class="menu__link" href="/react">React Mixins</a></li>
          </ul>
        </li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">horizontal menu scrollable</div>
    <div class="menu-horizontal menu--scrollable">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
    <div class="separator">menu scrollable</div>
    <div class="menu menu--scrollable" style="width: 180px;height: 150px;">
      <a href="#" class="menu__heading menu__link">Title</a>
      <ul class="menu__list">
        <li class="menu__item"><a href="#" class="menu__link">Home</a></li>
        <li class="menu__item"><a href="#" class="menu__link">About</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Contact</a></li>
        <li class="menu__item"><a href="#" class="menu__link">GitHub</a></li>
        <li class="menu__item"><a href="#" class="menu__link">Twitter</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu'
}
</script>

<style>
/*@import './base.css';*/
/*@import './horizontal.css';*/

.menu-template {
  display: block;
  padding: 1rem;
  margin-bottom: 10rem;
}

.separator {
  display: block;
  height: 1rem;
  margin: 1rem;
}

.menu-border {
  border: 1px solid #ccc;
  border-radius: 2px;
  min-width: 480px;
}
</style>
