<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
  export default {}
</script>

<style>
	@import url('./assets/css/normalize.css');

	html, body, p, h1, h2, h3, h4, h5, h6, ul, li, input, textarea, img {
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
	}

	input, textarea {
		border: none;
		lighting-color: none;
	}

	#app {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
	}
</style>
