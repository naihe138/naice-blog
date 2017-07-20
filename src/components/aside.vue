/**
* @file 通用侧边栏
* @author 何文林
* @date 2017/6/22
*/
<template>
	<div class="aside-box">
		<div class="marsk"></div>
		<div class="aside-content">
			<router-link to="/articles">
				<img src="../assets/img/averter.jpg" alt="">
			</router-link>
			<h1>Naice &nbsp;Blog</h1>
			<p>每一个不曾起舞的日子，都是对生命的辜负。</p>
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
</template>

<script>
  export default{}
</script>

<style scoped>
	:root{
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}

	.aside-box {
		/*width: 100%;*/
		height: 100%;
		background: rgba(255, 255, 255, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		background: url("../assets/img/aside-bg.jpg") no-repeat center center;
	}
	.marsk{
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.5);
	}
	.aside-content {
		width: 300px;
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

	.aside-content img:hover{
		transform: rotate(360deg);
	}

	.aside-content h1 {
		color: var(--titleColor);
		font-size: 22px;
		padding-top: 16px;
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
	.aside-content p{
		font-size: 12px;
		padding-top: 10px;
		padding-bottom: 20px;
		color: var(--fontColor);
	}
	.aside-icon{
		clear: both;
		display: flex;
		justify-content: center;
	}
	.aside-icon a{
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
	.aside-icon a:hover{
		background-color: var(--lineColor);
	}
</style>