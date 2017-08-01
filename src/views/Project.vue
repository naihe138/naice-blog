/**
* @file 项目列表页面
* @author 何文林
* @date 2017/7/21
*/
<template>
	<div id="">
		<div class="container">
			<div class="grid">
				<!--<figure class="effect-lily">-->
					<!--<img src="../assets/img/2.jpg"/>-->
					<!--<figcaption>-->
						<!--<h2>Nice <span>Lily</span></h2>-->
						<!--<p>Lily likes to play with crayons and pencils</p>-->
						<!--<a href="http://gitblog.naice.me/aboutMe/index.html" target="_blank">View more</a>-->
					<!--</figcaption>-->
				<!--</figure>-->
				<figure v-for="item in list" :class="item.effect">
					<img width="100%" :src="item.imageUrl"/>
					<figcaption>
						<h2>{{item.title}}</h2>
						<p>{{item.describe}}</p>
						<a :href="item.hrefStr" target="_blank">View more</a>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
  import * as types from '../store/mutation-types'
  export default{
    computed: {
      list () {
        return this.$store.getters.project
      }
    },
    mounted () {
      this.$store.dispatch(types.GET_PROJECT)
      // this.$store.dispatch('progress', 100)
    }
  }
</script>

<style scoped>
	@import url('../assets/css/component.css');

	.container {
		width: 100%;
		box-sizing: border-box;
		padding-right: 30px;
		overflow: hidden;
	}

	*, *:after, *:before {
		box-sizing: border-box;
	}

	.clearfix:before, .clearfix:after {
		content: '';
		display: table;
	}

	.clearfix:after {
		clear: both;
	}

	body {
		background: #f6f9fa;
		color: #536d76;
		font-weight: 400;
		font-size: 1em;
		font-family: 'Raleway', Arial, sans-serif;
	}

	a {
		color: #4f7f90;
		text-decoration: none;
		outline: none;
	}

	a:hover, a:focus {
		color: #39545e;
	}

	section {
		padding: 1em;
		text-align: center;
	}

	/* Header */
	.codrops-header {
		margin: 0 auto;
		padding: 1em 1em;
		text-align: center;
	}

	.codrops-header h1 {
		margin: 0;
		font-weight: 800;
		font-size: 4em;
		line-height: 1.3;
	}

	.codrops-header h1 span {
		display: block;
		padding: 0 0 0 0.1em;
		font-size: 45%;
		font-weight: 300;
		color: #7e959d;
	}

	/* To Navigation Style */
	.codrops-top {
		width: 100%;
		text-transform: uppercase;
		font-size: 0.69em;
		line-height: 2.2;
	}

	.codrops-top a {
		display: inline-block;
		padding: 0 1em;
		text-decoration: none;
		letter-spacing: 1px;
	}

	.codrops-top span.right {
		float: right;
	}

	.codrops-top span.right a {
		display: block;
		float: left;
	}

	.codrops-icon:before {
		margin: 0 4px;
		text-transform: none;
		font-weight: normal;
		font-style: normal;
		font-variant: normal;
		font-family: 'iconfont';
		line-height: 1;
		speak: none;
		-webkit-font-smoothing: antialiased;
	}

	.codrops-icon-drop:before {
		content: "\e001";
	}

	.codrops-icon-prev:before {
		content: "\e004";
	}

	/* Related demos */
	.related {
		padding: 6em 1em;
		font-size: 120%;
	}

	.related > a {
		border: 1px solid #4f7f90;
		display: inline-block;
		text-align: center;
		margin: 20px 10px;
		padding: 25px;
	}

	.related a:hover {
		border-color: #39545e;
	}

	.related a img {
		max-width: 100%;
		opacity: 0.8;
	}

	.related a:hover img,
	.related a:active img {
		opacity: 1;
	}

	.related a h3 {
		margin: 0;
		padding: 0.5em 0 0.3em;
		max-width: 300px;
		text-align: left;
	}

	@media screen and (max-width: 25em) {

		.codrops-header {
			font-size: 75%;
		}

		.codrops-icon span {
			display: none;
		}

	}
</style>