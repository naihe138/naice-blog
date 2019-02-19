<template>
	<div class="musicLayoutBox" id="musicLayoutBox">
		<header class="musicHeader" :class="isNavHidden ? 'navUp' : 'navDown'">
			<section class="box header-content">
			<nav>
				<nuxt-link
					v-for="(item, index) in nav"
					:key="index"
					:to="item.path"
					:class="navIndex == index ? 'active' : ''"
					>{{item.text}}</nuxt-link>
			</nav>
			<div class="musicSearchBox">
				<div class="musicSearch"
					:style="showSearch ? {paddingLeft: '5px'} : {paddingLeft: '0'}">
					<div class="text" :class="showSearch ? 'showText' : 'hiddenText'">
						<input type="text"
							v-model="searchStr"
							placeholder="你心所想...">
					</div>
					<div class="searchIcon">
						<i class="iconfont"
							@click="toShowSearch"
							v-if="!showSearch">&#xe603;</i>
						<i class="iconfont rightIcon"
							@click="tohiddenSearch"
							v-else>&#xe640;</i>
					</div>
				</div>
			</div>
			</section>
		</header>
		<div class="musicContent" id="musicContent">
			<nuxt/>
		</div>
		<footer class="musicLayoutFooter">
			© 2018 - <nuxt-link to="/">Naice的博客</nuxt-link>
			 - Powered by Nuxt.js & Koa
		</footer>
	</div>
</template>
<script>

export default {
  	data () {
		return {
			searchStr: '',
			showSearch: false,
			canvasDom: null,
			isNavHidden: false,
			layoutBox: null,
			navIndex: 0,
			nav: [
				{
					path: '/',
					text: '首页'
				},
				{
					path: '/article',
					text: '文章'
				},
				{
					path: '/project',
					text: '项目'
				},
				{
					path: '/about',
					text: '关于'
				},
				{
					path: '/music',
					text: '音乐'
				}
			]
		}
	},
	methods: {
		toShowSearch () {
			this.showSearch = true
		},
		tohiddenSearch () {
			this.$router.push(`/article?keyword=${this.searchStr}`)
			this.searchStr = ''
			this.showSearch = false
		},
		chanrouter(router) {
			let index = 9
			this.nav.forEach((item, i) => {
				if (item.path == router.path) {
					index = i
				}
			})
			this.navIndex = index
		}
	},
	mounted() {
		this.chanrouter(this.$route)
		const userinfo = localStorage.getItem('userInfo')
		if (!userinfo) {
			this.$store.commit('changeAverter', Math.floor(Math.random() * 20))
		} else {
			let info = JSON.parse(userinfo)
			this.$store.commit('changeAverter', info.gravatar)
		}
	},
	watch: {
		$route (router) {
			this.chanrouter(router)
		}
	}
}
</script>
<style>
	.musicLayoutBox{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		left: 0;
		overflow: hidden;
	}
	.navUp {
		transform: translate3d(0, -60px, 0)
	}
	.navDown {
		transform: translate3d(0, 0, 0)
	}
	.musicHeader {
		background: transparent;
		/* border-bottom: 1px solid #191919; */
		color: #909090;
		height: 60px;
		overflow: hidden;
		width: 100%;
		position: fixed;
		z-index: 2;
		transition: 0.3s
	}
	.box {
		width: 900px;
		margin: 0 auto;
	}

	.musicHeader .header-content {
		display: flex;
		height: 59px;
		justify-content: space-between;
	}

  .musicHeader .header-content nav {
		height: 59px;
		line-height: 59px;
		font-size: 20px;
  }

  .musicHeader .header-content nav a {
		display: inline-block;
		height: 59px;
		transition: 0.3s;
		padding: 0 20px;
		position: relative;
		color: #8c8c8c;
		text-decoration: none;
  }

	.musicHeader .header-content nav a:hover {
		color: #099edd
	}

	.musicHeader .header-content nav a.active {
		color: #099edd
	}

	.musicSearchBox{
		display: flex;
		align-items: center;
	}
	.musicSearch{
		height: 30px;
		border-bottom: 1px solid #454545;
		display: flex;
		overflow: hidden;
		padding-left: 5px;

	}
	.musicSearch input{
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		background: transparent;
		color: #099edd;
	}
	.musicSearch .text{
		width: 158px;
		transform-origin: right center;
		transition: 0.3s;
	}
	.musicSearch .showText{
		width: 158px;
	}
	.musicSearch .hiddenText{
		width: 0px;
		padding-left: 0px;
	}
	.musicSearch .searchIcon{
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}
	.rightIcon{
		color: #099edd;
	}
	.musicContent{
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0;
		overflow: hidden;
		width: 100%;
	}
	.musicLayoutFooter{
		position: absolute;
		bottom: 0;
		left: 0;
		height: 30px;
		background: transparent;
		text-align: center;
		line-height: 30px;
		font-size: 10px;
		color: #666;
		width: 100%;
	}
</style>
