<template>
	<section class="projectBox">
		<div class="item" v-for="(item, index) in project" :key="index">
			<div class="iconfont icon" :class="item.icon"></div>
			<h3 class="title">{{item.title}}</h3>
			<p class="desc">{{item.descript}}</p>
			<div class="btn">
				<a class="github" target="_blank" :href="item.github"><i class="iconfont">&#xe8b6;</i>github</a>
				<a class="view" target="_blank" :href="item.view"><i class="iconfont">&#xe7b9;</i>view</a>
			</div>
		</div>
	</section>
</template>

<script>
import FooterMixin from '../utils/footer-mixin'
import {getProject} from '../api'
export default {
	head () {
		return {
			title: 'naice | 项目'
		}
	},
	layout: 'layout',
	mixins: [FooterMixin],
	computed: {
		project() {
			return this.$store.state.project.data
		}
	},
	created() {
		if (this.project.length == 0) {
			getProject({}).then(res => {
				if (res.code === 1) {
					this.$store.commit('getProject', res.result.list)
					this.$nextTick(() => {
						this.footer()
					})
				}
      })
		}
	},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
				vm.footer()
			})
    })
  },
}
</script>

<style scoped>
.projectBox{
	width: 900px;
	margin: 0 auto;
	overflow: hidden;
}
.item{
	width: 217px;
	height: 280px;
	background: rgba(0, 0, 0, 0.02);
	border: 1px solid #f1f1f1;
	box-sizing: border-box;
	padding: 10px;
	cursor: pointer;
	transition: background 0.3s;
	float: left;
	margin-right: 10px;
	margin-bottom: 10px;
}
.projectBox .item:nth-child(4n) {
	margin-right: 0;
}
.item:hover{
	background: #ffffff;
}
.item:hover .icon{
	transform: rotate(180deg);
}
.item:hover .title{
	color: #000;
}
.icon{
	height: 120px;
	text-align: center;
	line-height: 120px;
	font-size: 70px;
	transition: transform 0.5s;
}
.title{
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
	height: 32px;
	line-height: 32px;
	overflow: hidden;
	font-size: 16px;
	transition: 0.3s;
}
.desc{
	width: 100%;
	height: 50px;
	margin-top: 10px;
	overflow: hidden;
	line-height: 26px;
	margin-bottom: 10px;
}
.btn{
	border-top: 1px solid #eeeeee;
	display: flex;
	height: 40px;
}
.btn > a{
	width: 50%;
	position: relative;
	text-align: center;
	line-height: 40px;
	box-sizing: border-box;
}
.btn > a:hover{
	color: #8ed53c;
}
.github::before{
	content: "";
	display: block;
	position: absolute;
	right: 0;
	top: 15%;
	width: 1px;
	height: 70%;
	background: #eeeeee;
}
</style>

