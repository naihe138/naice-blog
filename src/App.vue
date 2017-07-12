<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
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
	::selection {
			background:#3fb76c; 
			color:#fff;
	}

	::-moz-selection {
			background:#3fb76c; 
			color:#fff;
	}

	::-webkit-selection {
			background:#3fb76c; 
			color:#fff;
	}
	li {
		list-style: none;
	}

	input, textarea {
		border: none;
		lighting-color: none;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0;
	}
	.articlefade-enter-active, .articlefade-leave-active {
		transition: .5s
	}
	.articlefade-enter, .articlefade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0;
		transform: translateY(20px);
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
