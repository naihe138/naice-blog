/**
* @file 关于我
* @author 何文林
* @date 2017/7/20
*/
<template>
	<div id="about">
		<h3>关于作者</h3>
		<p><span class="title">姓名：</span>何文林</p>
		<p><span class="title">年龄：</span>1991</p>
		<p><span class="title">职业：</span>前端开发</p>
		<p><span class="title">专业：</span>计算机科学与技术</p>
		<p><span class="title">Github：</span><a target="_blank" href="https://github.com/naihe138">@naice</a></p>
		<p class="skills">
			<span class="title">技能：</span>
			<span>
				HTLM5+CSS3<br/>
				NodeJs<br/>
				Vue<br/>
				React<br/>
				Gulp<br/>
				Webpack<br/>
			</span>
		</p>
		<h3>关于网站</h3>
		<p style="padding-bottom: 60px">
			本站服务端采用 koa2.0 + mongoDB 搭建, 网站分成前后端。<br/>
			前端客户端采用 Vue2.0-SSR 的服务端渲染搭建，<br/>
			后台客户端 React+ant-ui做的单页面应用，<br/>
			主要功能包括: 管理员, 用户, 分类, 文章, 评论, 分享<br/>
			主要技术栈: koa2，mongoose，vue2，vue2-router，vuex，vue2-ss，react，react-router4，redux，ant-ui, webpack，babel，eslint，nginx
		</p>
	</div>
</template>

<script>
  export default{
    mounted () {
      this.$store.dispatch('progress', 100)
    }
  }
</script>

<style>
	#about h3 {
		font-size: 16px;
		line-height: 1.75;
		color: #3fb76c;
		padding: 15px 0;
	}

	#about p {
		padding-left: 30px;
		display: flex;
		line-height: 1.8;
		color: #333;
	}

	#about p .title {
		padding-right: 20px;
		width: 60px;
	}

	#about .skills {

	}
</style>