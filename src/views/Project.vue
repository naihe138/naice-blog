/**
* @file 项目列表页面
* @author 何文林
* @date 2017/7/21
*/
<template>
	<div id="">
		<div class="container">
			<div class="grid">
				<figure class="effect-lily">
					<img src="../assets/img/2.jpg"/>
					<figcaption>
						<h2>Nice <span>Lily</span></h2>
						<p>Lily likes to play with crayons and pencils</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-sadie">
					<img src="../assets/img/2.jpg" alt="img02"/>
					<figcaption>
						<h2>Holy <span>Sadie</span></h2>
						<p>Sadie never took her eyes off me. <br>She had a dark soul.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-layla">
					<img src="../assets/img/2.jpg" alt="img04"/>
					<figcaption>
						<h2>Crazy <span>Layla</span></h2>
						<p>When Layla appears, she brings an eternal summer along.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-oscar">
					<img src="../assets/img/2.jpg" alt="img08"/>
					<figcaption>
						<h2>Warm <span>Oscar</span></h2>
						<p>Oscar is a decent man. He used to clean porches with pleasure.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-marley">
					<img src="../assets/img/2.jpg" alt="img09"/>
					<figcaption>
						<h2>Sweet <span>Marley</span></h2>
						<p>Marley tried to convince her but she was not interested.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-ruby">
					<img src="../assets/img/2.jpg" alt="img10"/>
					<figcaption>
						<h2>Glowing <span>Ruby</span></h2>
						<p>Ruby did not need any help. Everybody knew that.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-roxy">
					<img src="../assets/img/2.jpg" alt="img03"/>
					<figcaption>
						<h2>Charming <span>Roxy</span></h2>
						<p>Roxy was my best friend. She'd cross any border for me.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-bubba">
					<img src="../assets/img/2.jpg" alt="img06"/>
					<figcaption>
						<h2>Fresh <span>Bubba</span></h2>
						<p>Bubba likes to appear out of thin air.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-romeo">
					<img src="../assets/img/2.jpg" alt="img05"/>
					<figcaption>
						<h2>Wild <span>Romeo</span></h2>
						<p>Romeo never knows what he wants. He seemed to be very cross about something.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-dexter">
					<img src="../assets/img/2.jpg" alt="img12"/>
					<figcaption>
						<h2>Strange <span>Dexter</span></h2>
						<p>Dexter had his own strange way. You could watch him training ants.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-sarah">
					<img src="../assets/img/2.jpg" alt="img13"/>
					<figcaption>
						<h2>Free <span>Sarah</span></h2>
						<p>Sarah likes to watch clouds. She's quite depressed.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-chico">
					<img src="../assets/img/2.jpg" alt="img15"/>
					<figcaption>
						<h2>Silly <span>Chico</span></h2>
						<p>Chico's main fear was missing the morning bus.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
				<figure class="effect-milo">
					<img src="../assets/img/2.jpg" alt="img11"/>
					<figcaption>
						<h2>Demo <span>demo</span></h2>
						<p>Milo went to the woods. He took a fun ride and never came back.</p>
						<a href="/" target="_blank">View more</a>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
  export default{
    mounted () {
      this.$store.dispatch('progress', 100)
    }
  }
</script>

<style scoped>
	@import url('../assets/css/component.css');
	.container{
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