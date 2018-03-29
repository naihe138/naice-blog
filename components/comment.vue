<template>
	<div class="arcComment" v-on:click.stop.prevent="() => {}">
		<div v-if="!reply" class="averter">
			<img :src="avarterArr[averterNum]" alt="">
		</div>
		<div class="inputBox" :style="isShowBtn ? {height: '180px'} : null">
			<div class="user" v-if="showUserSet">
				<input type="text" v-model="userinfo.name" placeholder="称呼*" />
				<input type="email" v-model="userinfo.email" placeholder="邮箱(不会公开)*" />
				<input type="text" v-model="userinfo.site" placeholder="网站（http, https:// 开头)" />
				<span class="confirm" v-if="showReset" @click="conform"><i class="iconfont">&#xe640;</i></span>
			</div>
			<div class="hasuser" v-else>
				<span class="name">{{userinfo.name}}</span>
				<div class="userSet">
					<div class="setBtn"><i class="iconfont">&#xe60e;</i>账户设置</div>
					<div class="setCon">
						<p @click="editeInfo"><i>•</i>编辑信息</p>
						<p @click="clearInfo"><i>•</i>清空信息</p>
					</div>
				</div>
			</div>
			<div class="comContent">
				<textarea v-model="content"
						  @focus="contenFocus"
						  @blur="contenBlur"
						  :placeholder="at.name ? `回复 ${at.name}:` : '这位大侠说说你的看法~'"
						  :style="reply ? {height: '43px'} : null"
						  ></textarea>
				<div v-if="reply" class="rBtn">
					<span @click="concleReply" v-if="at.name && !content">取消</span>
					<span @click="submit" v-else>评论</span>
				</div>
			</div>
			<transition name="fade">
				<div class="submit" v-show="isShowBtn" @click="submit">
					<span>评论</span>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import {avarterArr} from '../utils/blowser'
export default {
	props: {
		reply: {
			type: String,
			default: ''
		},
		at: {
			type: Object,
			default: () => {
				return {}
			}
		},
		cid: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			content: '',
			isShowBtn: false,
			userinfo: {
				name: '',
				email: '',
				site: '',
				gravatar: ''
			},
			regexs: {
				email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
				url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
			},
			showUserSet: true,
			showReset: false,
			avarterArr
		}
	},
	computed: {
		averterNum () {
			return this.$store.state.averterNum
		}
	},
	methods: {
		contenFocus() {
			if (!this.reply) {
				this.isShowBtn = true
			}
		},
		contenBlur() {
			if (!this.content && !this.reply) {
				this.isShowBtn = false
			}
		},
		validate() {
			const {name, email, site} = this.userinfo
			if (!name.trim()) {
				alert('请输入昵称哦~~');
				return false
			}
			if (!email.trim()) {
				alert('请输入邮箱哦~~');
				return false
			}
			if (!this.regexs.email.test(email)) {
				alert('请输入正确邮箱格式哦~~');
				return false
			}
			if (site && !this.regexs.url.test(site)) {
				alert('请输入正确网址格式哦~~');
				return false
			}
			return true
		},
		submit() {
			if (this.validate()){
				if (!this.content.trim()) {
					alert('请输入评论内容哦~~');
					return false
				}
				this.userinfo.gravatar = this.averterNum
				localStorage.setItem('userInfo', JSON.stringify(this.userinfo))
				const user = {
					content: this.content
				}
				if (this.reply) {
					if (this.at.name) {
						user.to = this.at
					}
					user.from = this.userinfo
					user.cid = this.cid
				} else {
					user.author = this.userinfo
				}
				this.showUserSet = false
				this.showReset = false
				this.$emit('pushComment', user)
				setTimeout(()=> {
					this.content = ''
					this.isShowBtn = false
				}, 500)
			}
		},
		editeInfo() {
			this.showUserSet = true
			this.showReset = true
		},
		clearInfo() {
			this.showUserSet = true
			this.showReset = true
			this.userinfo = {
				name: '',
				email: '',
				site: '',
				averter: this.averterNum
			}
			localStorage.setItem('userInfo', '')
		},
		conform() {
			if (this.validate()){
				localStorage.setItem('userInfo', JSON.stringify(this.userinfo))
				this.showUserSet = false
				this.showReset = false
			}
		},
		concleReply() {
			this.$emit('concleReply')
		}
	},
	mounted() {
		const userinfo = localStorage.getItem('userInfo')
		if (userinfo) {
			this.userinfo = JSON.parse(userinfo)
			this.showUserSet = false
		}
	}
}
</script>

<style scoped>
/* 评论输入组件 */
.arcComment{
	box-sizing: border-box;
	display: flex;
}
.averter{
	width: 60px;
	height: 50px;
}
.averter img {
	width: 50px;
	height: 50px;
	display: block;
	margin-top: 40px;
}
.inputBox{
	flex: 1;
}
.user{
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
}
.user input{
	outline: none;
	display: block;
	font-size: 14px;
	text-indent: 5px;
	width: 220px;
	height: 30px;
	border: 1px solid #f1f1f1;
}
.user input:focus{
	border-color: #0f9db7;
}
.confirm{
	width: 50px;
	background: red;
	text-align: center;
	height: 28px;
	line-height: 28px;
	background: hsla(0,0%,77%,.4);
	cursor: pointer;
}
.confirm:hover{
	background: #51ce23;
	color: #ffffff;
}
.comContent{
	display: flex;
	margin-top: 10px;
}
.comContent textarea {
	flex: 1;
	outline: none;
	height: 100px;
	box-sizing: border-box;
	padding: 10px;
	resize: none;
	font-size: 14px;
	border: 1px solid #f1f1f1;
}
.comContent textarea:focus{
	border-color: #0f9db7;;
}
.submit{
	clear: both;
	overflow: hidden;
}
.submit span{
	float: right;
	margin-top: 10px;
	margin-right: 10px;
	height: 36px;
	width: 70px;
	background: #0f9db7;
	color: #ffffff;
	text-align: center;
	line-height: 36px;
	cursor: pointer;
}
.hasuser{
	display: flex;
	justify-content: flex-end;
	height: 30px;
	font-size: 14px
}
.hasuser .name{
	font-weight: bold;
	padding-right: 10px;
	line-height: 30px;
}
.hasuser .userSet{
	position: relative;
	cursor: pointer;
	color: #333333;
}
.hasuser .userSet:hover .setCon{
	display: block
}
.hasuser .setBtn{
	line-height: 30px;
	width: 100px;
}
.hasuser .setBtn i {
	font-size: 14px;
	padding-right: 10px;
}
.hasuser .setCon{
	position: absolute;
	width: 100%;
	display: none;
}
.hasuser .setCon p{
	line-height: 30px;
	box-sizing: border-box;
	padding-left: 4px;
}
.hasuser .setCon p:hover{
	background: rgba(0, 0, 0, 0.08);
	width: 100%;
}
.hasuser .setCon i {
	padding-right: 12px;
}
.rBtn{
	background: #0f9db7;
	color: #ffffff;
	line-height: 41px;
	font-size: 16px;
	margin-left: 20px;
	width: 80px;
	text-align: center;
	cursor: pointer;
}
</style>

