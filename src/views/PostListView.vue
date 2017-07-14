/**
* @file 文章列表
* @author 何文林
* @date 2017/6/24
*/
<template>
	<div id="postListView">
		<section class="aside">
			<a-side></a-side>
		</section>
		<section class="listBox">
			<div class="headerBox">
				<div class="serch">
					<input type="text" placeholder="serch...">
					<span></span>
				</div>
				<div class="postBox">
					<router-link to="/articles">
						<p>文章</p>
					</router-link>
					<a target="_blank" href="https://github.com/naihe138?tab=repositories">
						<p>项目</p>
					</a>
				</div>
			</div>
			<transition name="articlefade" mode="out-in">
				<router-view></router-view>
			</transition>
			<copy-right></copy-right>
		</section>
	</div>
</template>

<script>
  import Aside from '../components/aside'
  import Copyright from '../components/footer.vue'

  export default {
    title () {
      return 'Naice Blog'
    },
    components: {
      'a-side': Aside,
      'copy-right': Copyright
    }
  }
</script>

<style scoped>
	:root{
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}
	#postListView{
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
	}
	.aside {
		width: 380px;
		height: 100%;
		background: #cccccc;
	}
	.listBox{
		flex: 1;
		position: relative;
		box-sizing: border-box;
		padding-left: 30px;
		overflow: auto;
	}
	.headerBox{
		height: 70px;
		position: relative;
		overflow: hidden;
	}
	.headerBox .serch{
		width: 300px;
		height: 28px;
		margin-top: 20px;
		position: relative;
	}
	.headerBox .serch span{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 50%;
		background: #939393;
		transition: width 0.3s;
	}
	.headerBox .serch input{
		outline: none;
		width: 300px;
		height: 28px;
		text-indent: 10px;
		color: var(--fontColor);
	}
	.headerBox .serch input:focus + span{
		width: 100%;
	}
	.headerBox .serch input:focus{
		border-color: green;
	}
	.postBox {
		position: absolute;
		width: 80px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		right: 10px;
		top: 10px;
	}

	.postBox a {
		width: 30px;
		height: 30px;
		text-decoration: none;
		color: #666;
		text-align: center;
		background-image: url('../assets/img/top-icon.png');
		background-size: 60px 60px;
	}
	.postBox a p{
		padding-top: 30px;
	}
	.postBox a:nth-of-type(1){
		 background-position: -30px 0px;
	 }
	.postBox a:nth-of-type(2){
		background-position: 0px 0px;
	}

	.postBox a:nth-of-type(1):hover{
		background-position: -30px 30px;
	}
	.postBox a:nth-of-type(2):hover{
		background-position: -0px -30px;
	}
	.postBox a:hover p{
		color: var(--lineColor);
	}
</style>