<template>
	<div class="homePage">
		<section id="aside">
			<a-side></a-side>
		</section>
		<div class="home-view">
			<section class="aboutMe">
				<h3>关于我</h3>
				<p>“对酒当歌,人生几何。譬如朝露,去日苦多”。生命是天际划过的流星，那么短暂，而我们的青春更是如此。作为一个前端开发者。在以后的日子里，需要不断学习，不断进步，保持良好的技术热情，不断成长。做一个有道德，有理想，有纪律，有文化的四有前端开发者。</p>
			</section>
			<div class="postBox">
				<router-link to="/articles">
					<img src="../assets/img/post.png" alt="">
					<p>文章</p>
				</router-link>
				<router-link to="/post">
					<img src="../assets/img/project.png" alt="">
					<p>项目</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
  import Aside from '../components/aside'

  export default {
    title () {
      return 'Naice Blog'
    },
    components: {
      'a-side': Aside
    }
  }
</script>

<style scoped>
	:root {
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}
	.homePage{
		width: 100%;
		height: 100%;
		display: flex;
	}
	#aside {
		width: 50%;
		height: 100%;
		background: url("../assets/img/aside-bg.jpg") no-repeat center center;
		background-size: cover;
		transition: width 0.3s;
	}
	.home-view {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.aboutMe {
		width: 400px;
		/*border: 1px solid red;*/
		height: 250px;
	}

	.aboutMe h3 {
		color: var(--titleColor);
		font-size: 22px;
		padding-bottom: 16px;
	}

	.aboutMe h3:after {
		content: '';
		display: block;
		height: 1px;
		width: 100px;
		background: var(--lineColor);
		margin-top: 15px;
	}

	.aboutMe p {
		font-size: 14px;
		line-height: 20px;
	}

	.postBox {
		position: absolute;
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		right: 10px;
		top: 10px;
	}

	.postBox a {
		text-decoration: none;
		color: #cccccc;
		text-align: center;
	}

	.postBox img {
		width: 30px;
		height: 30px;
	}
</style>
