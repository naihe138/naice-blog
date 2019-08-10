<template>
	<div class="layoutBox" id="layoutBox">
		<canvas id="canvas" width="1011" height="803"></canvas>
		<header class="header" :class="isNavHidden ? 'navUp' : 'navDown'">
			<section class="box header-content">
			<nav>
				<nuxt-link
					v-for="(item, index) in nav"
					:key="index"
					:to="item.path"
					:class="navIndex == index ? 'active' : ''"
					>{{item.text}}</nuxt-link>
			</nav>
			<div class="searchBox">
				<div class="search"
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
		<div class="mailContent" id="mailContent">
			<nuxt/>
		</div>
		<footer class="layoutFooter" :class="footerFixed ? 'footerFixed' : ''">
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
	computed: {
		footerFixed() {
			return this.$store.state.footerFixed
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
		bgCanvas () {
			let canvas = null
			if (!this.canvasDom) {
				this.canvasDom = document.querySelector('#canvas')
				canvas = this.canvasDom
			} else {
				canvas = this.canvasDom
			}
			let ctx = canvas.getContext("2d")
			let cw = canvas.width = window.innerWidth
			let cx = cw / 2
			let ch = canvas.height = window.innerHeight
			let	cy = ch / 2

			ctx.fillStyle = "#ccc";
			const linesNum = 16;
			let linesRy = [];
			let requestId = null;

			function Line(flag) {
				this.flag = flag;
				this.a = {};
				this.b = {};
				if (flag == "v") {
					this.a.y = 0;
					this.b.y = ch;
					this.a.x = randomIntFromInterval(0, ch);
					this.b.x = randomIntFromInterval(0, ch);
				} else if (flag == "h") {
					this.a.x = 0;
					this.b.x = cw;
					this.a.y = randomIntFromInterval(0, cw);
					this.b.y = randomIntFromInterval(0, cw);
				}
				this.va = randomIntFromInterval(25, 100) / 100;
				this.vb = randomIntFromInterval(25, 100) / 100;

				this.draw = function() {
					ctx.strokeStyle = "#f4f4f4";
					ctx.beginPath();
					ctx.moveTo(this.a.x, this.a.y);
					ctx.lineTo(this.b.x, this.b.y);
					ctx.stroke();
				}

				this.update = function() {
					if (this.flag == "v") {
						this.a.x += this.va;
						this.b.x += this.vb;
					} else if (flag == "h") {
						this.a.y += this.va;
						this.b.y += this.vb;
					}

					this.edges();
				}

				this.edges = function() {
					if (this.flag == "v") {
						if (this.a.x < 0 || this.a.x > cw) {
							this.va *= -1;
						}
						if (this.b.x < 0 || this.b.x > cw) {
							this.vb *= -1;
						}
					} else if (flag == "h") {
						if (this.a.y < 0 || this.a.y > ch) {
							this.va *= -1;
						}
						if (this.b.y < 0 || this.b.y > ch) {
							this.vb *= -1;
						}
					}
				}

			}

			for (var i = 0; i < linesNum; i++) {
				var flag = i % 2 == 0 ? "h" : "v";
				var l = new Line(flag);
				linesRy.push(l);
			}

			function Draw() {
				requestId = window.requestAnimationFrame(Draw);
				ctx.clearRect(0, 0, cw, ch);

				for (var i = 0; i < linesRy.length; i++) {
					var l = linesRy[i];
					l.draw();
					l.update();
				}
				for (var i = 0; i < linesRy.length; i++) {
					var l = linesRy[i];
					for (var j = i + 1; j < linesRy.length; j++) {
						var l1 = linesRy[j]
						Intersect2lines(l, l1);
					}
				}
			}

			function Init() {
				linesRy.length = 0;
				for (var i = 0; i < linesNum; i++) {
					var flag = i % 2 == 0 ? "h" : "v";
					var l = new Line(flag);
					linesRy.push(l);
				}

				if (requestId) {
					window.cancelAnimationFrame(requestId);
					requestId = null;
				}

				cw = canvas.width = window.innerWidth;
				cx = cw / 2;
				ch = canvas.height = window.innerHeight;
				cy = ch / 2;

				Draw();
			};

			setTimeout(function() {
				Init();
				addEventListener('resize', Init, false);
			}, 15);

			function Intersect2lines(l1, l2) {
				var p1 = l1.a,
					p2 = l1.b,
					p3 = l2.a,
					p4 = l2.b;
				var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
				var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
				var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
				var x = p1.x + ua * (p2.x - p1.x);
				var y = p1.y + ua * (p2.y - p1.y);
				if (ua > 0 && ub > 0) {
					markPoint({
						x: x,
						y: y
					})
				}
			}

			function markPoint(p) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
				ctx.fillStyle = "#eeeeee";
				ctx.fill();
			}

			function randomIntFromInterval(mn, mx) {
				return ~~(Math.random() * (mx - mn + 1) + mn);
			}
		},
		scroll() {
			window.addEventListener('scroll', (e) => {
        const top = $(document).scrollTop()
				if (top >= 100) {
					this.isNavHidden = true
				} else {
					this.isNavHidden = false
				}
			})
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
		this.$nextTick(function () {
			window.scrollTop = 0
			this.bgCanvas()
			this.scroll()
		})
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
	#canvas{
		position: fixed;
		left: 0;
		top: 0;
		z-index: -1;
	}
	.layoutBox{
		/* position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		left: 0; */
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.navUp {
		transform: translate3d(0, -60px, 0)
	}
	.navDown {
		transform: translate3d(0, 0, 0)
	}
	.header {
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
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

	.header-content {
		display: flex;
		height: 59px;
		justify-content: space-between;
	}

  	.header-content nav {
		height: 59px;
		line-height: 59px;
		font-size: 20px;
  	}

  	.header-content nav a {
		display: inline-block;
		height: 59px;
		transition: 0.3s;
		padding: 0 20px;
		position: relative;
		color: #8c8c8c;
		text-decoration: none;
  	}

	.header-content nav a:hover {
		color: #3fb76c
	}

	.header-content nav a.active {
		color: #3fb76c
	}

	.searchBox{
		display: flex;
		align-items: center;
	}
	.search{
		height: 30px;
		border-bottom: 1px solid #dddddd;
		display: flex;
		overflow: hidden;
		padding-left: 5px;

	}
	.search input{
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		background: transparent;
	}
	.search .text{
		width: 158px;
		transform-origin: right center;
		transition: 0.3s;
	}
	.search .showText{
		width: 158px;
	}
	.search .hiddenText{
		width: 0px;
		padding-left: 0px;
	}
	.search .searchIcon{
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}
	.rightIcon{
		color: #3fb76c
	}
	.mailContent{
		padding-top: 70px;
		padding-bottom: 20px;
	}
	.layoutFooter{
		height: 50px;
		background: rgba(255, 255, 255, 1);
		border-top: 1px solid #f1f1f1;
		text-align: center;
		line-height: 50px;
		font-size: 12px;
		color: #666;
		width: 100%;
	}
	.footerFixed {
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
