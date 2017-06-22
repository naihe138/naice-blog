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
											 active-class="menu__item--active">Button
					</router-link>
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
  export default {}
</script>

<style>
	html,body,p,h1,h2,h3,h4,h5,h6,ul,li,input,textarea{
		padding: 0;
		margin: 0;
	}
	li{
		list-style: none;
	}
	input,textarea{
		border: none;
		lighting-color: none;
	}
</style>
