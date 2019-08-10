<template>
	<section class="heroBox">
		<button class="bubbly-button"
				@click="up"
				:class="btnShow ? 'animate' : ''">我要上墙!</button>
		<div class="heroList">
			<div class="item" v-for="(item, index) in hero" :key="index">
				<div class="time">{{toTime(item.create_time, '-')}}</div>
				<p class="content">{{item.content}}</p>
				<div class="author">——{{item.author.name}}</div>
				<div class="bgcircle"></div>
			</div>
		</div>
		<div class="loadmore more" v-if="hasMore" @click="getHeroData">{{loadText}}</div>
		<div class="nomore" v-else>木有更多鸟</div>
		<transition name="fade">
			<div class="popup"
				 v-show="showUp"
				 @click="hidePopup">
				<div>
					<comment v-on:pushComment="toAddHero"></comment>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
import Comment from '../components/comment'
import FooterMixin from '../utils/footer-mixin'
import TimeMixin from '../utils/time-mixin'
import {getHero, addHero} from '../api'
var timer = null

export default {
	head: {
		title: 'naice | 留言墙'
	},
	layout: 'layout',
	components: {
		Comment
	},
	data () {
		return {
			btnShow: false,
			showUp: false,
			page: 0,
			hasMore: true,
			loadText: '加载中...'
		}
	},
	mixins: [FooterMixin, TimeMixin],
	computed: {
		hero () {
			return this.$store.state.hero.data
		}
	},
	methods: {
		up() {
			this.btnShow = true
			clearInterval(timer)
			timer = setTimeout(() => {
				this.btnShow = false
				this.showUp = true
			}, 500)
		},
		hidePopup() {
			this.showUp = false
		},
		async getHeroData() {
			this.page += 1
			this.loadText = '加载中...'
			const res = await getHero({current_page: this.page})
			if (res.code === 1) {
				let list = res.result.list || []
				if (this.page > 1) {
					list = this.hero.concat(list)
				}
				this.$store.commit('getHero', list)
			}
			if (this.page >= res.result.pagination.total_page) {
				this.hasMore = false
			} else {
				this.hasMore = true
			}
			this.loadText = '加载更多'
			this.$nextTick(() => {
				this.footer()
			})
		},
		async toAddHero(user) {
			const res = await addHero(user)
			if (res.code === 1) {
				this.showUp = false
				this.page = 0
				this.getHeroData()
			}
		}
	},
	mounted () {
		if (this.hero.length === 0) {
			this.getHeroData()
		}
	}
}
</script>

<style scoped>
.heroBox{
	width: 900px;
	overflow: hidden;
	margin: 0 auto;
}
.up{
	width: 100px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid #f1f1f1;
	margin: 0 auto;
	cursor: pointer;
}
.bubbly-button {
  font-family: 'Helvetica', 'Arial', sans-serif;
  display: block;
  font-size: 1em;
  padding: 10px 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #ff0081;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
  margin: 20px auto 30px auto;
}
.bubbly-button:focus {
  outline: 0;
}
.bubbly-button:before, .bubbly-button:after {
  position: absolute;
  content: '';
  display: block;
  width: 140%;
  height: 100%;
  left: -20%;
  z-index: -1000;
  transition: all ease-in-out 0.5s;
  background-repeat: no-repeat;
}
.bubbly-button:before {
	display: none;
	top: -75%;
	background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 20%, #ff0081 20%, transparent 30%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
	background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
}
.bubbly-button:after {
	display: none;
	bottom: -75%;
	background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, transparent 10%, #ff0081 15%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%), radial-gradient(circle, #ff0081 20%, transparent 20%);
	background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
}
.bubbly-button:active {
	transform: scale(0.9);
	background-color: #e60074;
	box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
}
.bubbly-button.animate:before {
	display: block;
	animation: topBubbles ease-in-out 0.75s forwards;
}
.bubbly-button.animate:after {
	display: block;
	animation: bottomBubbles ease-in-out 0.75s forwards;
}

@keyframes topBubbles {
	0% {
		background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
	}
	50% {
		background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
	}
	100% {
		background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
		background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
	}
}
@keyframes bottomBubbles {
	0% {
		background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
	}
	50% {
		background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
	}
	100% {
		background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
		background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
	}
}
.heroList{
	clear: both;
	overflow: hidden;
}
.heroList .item:nth-child(4n) {
	margin-right: 0
}
.item{
	width: 210px;
	height: 210px;
	border: 1px solid #f1f1f1;
	box-sizing: border-box;
	padding: 10px;
	cursor: pointer;
	float: left;
	margin-right: 18px;
	margin-bottom: 18px;
	transition: background 0.3s;
	position: relative;
	overflow: hidden;
}
.bgcircle{
	content: "";
	display: block;
	width: 400px;
	height: 400px;
	position: absolute;
	left: -95px;
	top: -95px;
	background: rgba(241, 241, 241, 0.2);
	border-radius: 200px;
	transition: 0.3s;
	transform: scale(0);
	z-index: -1;
}
.item:hover .bgcircle{
	transform: scale(1);
	background: rgba(241, 241, 241, 1);
}
.time{
	height: 30px;
	color: #7f7f7f;
	font-size: 12px;
}
.content{
	height: 124px;
	overflow: hidden;
	line-height: 24px;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	text-indent: 24px;
	word-wrap: break-word;
}
.author{
	text-align: right;
	color: #7f7f7f;
	margin-top: 14px;
}
.popup{
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.9);
	left: 0;
	top: 0;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
}
.popup > div {
	width: 800px;
	height: 200px;
	/* background: rgba(0, 0, 0, 0.6); */
}
.more{
	text-align: center;
	cursor: pointer;
	color: #878787;
	padding: 20px 0 10px 0;
	clear: both;
	overflow: hidden;
}
.nomore{
	text-align: center;
	cursor: pointer;
	color: #cccccc;
	padding: 20px 0 10px 0;
}
</style>
