<template>
	<div class="homePage">
		<section id="aside">
			<div class="aside-box">
        <div class="marsk"></div>
        <div class="aside-content">
          <a>
            <img src="../assets/img/averter.jpg" alt="">
          </a>
          <h1>
            <nuxt-link to="/article?page=0">Naice</nuxt-link>
            <p>很多事情不是因为有希望才去坚持，而是坚持了才有希望。</p>
          </h1>
          <slot></slot>
          <div class="aside-icon">
            <a href="https://github.com/naihe138">
              <i class="iconfont">&#xe621;</i>
            </a>
            <a href="https://segmentfault.com/u/naice">
              <i class="iconfont">&#xe610;</i>
            </a>
          </div>
        </div>
      </div>
		</section>
		<div class="home-view">
			<section class="aboutMe">
				<div class="about-nav">
					<nuxt-link to="/">首页</nuxt-link>
					<nuxt-link to="/article">文章</nuxt-link>
				</div>
				<div class="about-nav">
					<nuxt-link to="/about">关于</nuxt-link>
					<nuxt-link to="/project">项目</nuxt-link>
				</div>
				<div class="about-nav"></div>
			</section>
		</div>
	</div>
</template>

<script>
export default {
  head () {
    return {
      title: 'naice | 首页'
    }
  },
  mounted() {
    const userinfo = localStorage.getItem('userInfo')
    if (!userinfo) {
      this.$store.commit('changeAverter', Math.floor(Math.random() * 20))
    } else {
      let info = JSON.parse(userinfo)
      this.$store.commit('changeAverter', info.gravatar)
    }
  }
}
</script>

<style scoped>
	:root {
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}

	.homePage {
		width: 100%;
		height: 100%;
		display: flex;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
	}

	#aside {
		width: 50%;
		height: 100%;
		background: url("../assets/img/aside-bg.jpg") no-repeat center center;
		background-size: 100% 100%;
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
		width: 280px;
		/*border: 1px solid red;*/
		height: 300px;
	}

	.about-nav{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
	}
	.about-nav a{
		width: 100px;
		height: 100px;
		border: 1px solid #ccc;
		border-radius: 50%;
		text-align: center;
		line-height: 100px;
		font-size: 18px;
		color: #333;
		text-decoration: none;
		transition: background 0.3s;
	}
	.about-nav a:hover{
		background: #3fb76c;
		color: #fff;
		border-color: #3fb76c;
	}
  .aside-box {
		/*width: 100%;*/
		overflow: hidden;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.7) url("../assets/img/aside-bg.jpg") no-repeat center center;
		background-size: auto 100%;
	}

	.marsk {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
	}

	.aside-content {
		width: 400px;
		height: 400px;
		/*border: 1px solid red;*/
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.aside-content img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		transition: transform 0.5s;
	}

	.aside-content img:hover {
		transform: rotate(360deg);
	}

	.aside-content h1 {
		color: var(--titleColor);
		font-size: 22px;
		padding-top: 16px;
		padding-bottom: 30px;
	}

	.aside-content h1 a{
		color: var(--titleColor);
		font-size: 22px;
		text-decoration: none;
	}

	.aside-content h1:after {
		content: '';
		display: block;
		height: 1px;
		width: 200px;
		margin: 0 auto;
		background: var(--lineColor);
		margin-top: 15px;
	}

	.aside-content p {
		font-size: 12px;
		padding-top: 10px;
		padding-bottom: 10px;
		color: var(--fontColor);
	}

	.aside-icon {
		clear: both;
		display: flex;
		justify-content: center;
	}

	.aside-icon a {
		width: 34px;
		height: 34px;
		background-color: #5e5e5e;
		margin: 0 10px;
		cursor: pointer;
		transition: background-color 0.3s;
		border-radius: 2px;
		color: #fff;
		text-decoration: none;
		text-align: center;
		line-height: 34px;
	}

	.aside-icon a:hover {
		background-color: var(--lineColor);
	}
</style>
