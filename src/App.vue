<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
  import NProgress from 'nprogress'
  NProgress.configure({showSpinner: false})
  export default {
    computed: {
      progress () {
        return this.$store.getters.progress
      }
    },
    watch: {
      'progress': function (val) {
        if (val === 0) {
          NProgress.set(0)
          NProgress.start()
        } else if (val === 100) {
          NProgress.done()
        } else {
          NProgress.set(val / 100)
          NProgress.start()
        }
      }
    }
  }
</script>

<style>
	@import url('./assets/css/normalize.css');
	@import url('./assets/css/github-gist.css');
	@import url('nprogress/nprogress.css');

	#nprogress .bar {
		background: #3fb76c
	}

	html, body, p, h1, h2, h3, h4, h5, h6, ul, li, input, textarea, img {
		padding: 0;
		margin: 0;
	}

	::selection {
		background: #3fb76c;
		color: #fff;
	}

	::-moz-selection {
		background: #3fb76c;
		color: #fff;
	}

	::-webkit-selection {
		background: #3fb76c;
		color: #fff;
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

	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
	{
		opacity: 0;
	}

	.articlefade-enter-active, .articlefade-leave-active {
		transition: .5s
	}

	.articlefade-enter, .articlefade-leave-to /* .fade-leave-active in <2.1.8 */
	{
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
