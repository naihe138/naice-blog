/**
* @file 通用侧边栏
* @author 何文林
* @date 2017/6/22
*/
<template>
	<div class="aside-box">
		<div class="aside-content">
			<router-link to="/articles">
				<img src="../assets/img/averter.jpg" alt="">
			</router-link>
			<h1>Naice &nbsp;Blog</h1>
			<p>每一个不曾起舞的日子，都是对声明的辜负。</p>
			<div class="aside-icon">
				<a href="http://naice.me"></a>
				<a href="http://naice.me"></a>
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
	}

	.aside-content {
		width: 300px;
		height: 400px;
		/*border: 1px solid red;*/
		text-align: center;
	}
	.aside-content img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
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
		width: 30px;
		height: 30px;
		background-color: #5e5e5e;
		background-size: 90% 90%;
		background-position: center center;
		background-repeat: no-repeat;
		margin: 0 10px;
		cursor: pointer;
	}
	.aside-icon a:nth-of-type(1){
		background-image: url("../assets/img/github.png");
	}
	.aside-icon a:nth-of-type(2){
		background-image: url("../assets/img/segmentfault.png");
	}
</style>