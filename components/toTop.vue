<template>
  <div class="sideIcon">
	  <i class="iconfont" @click="mail">&#xe654;</i>
	  <i class="iconfont" @click="scroll(1)">&#xe638;</i>
	  <i class="iconfont" @click="scroll(0)">&#xe635;</i>
  </div>
</template>

<script>
export default {
	data() {
		return {
			scrollDom: null,
			scrollNum: 0
		}
	},
	computed: {
		scrollTop () {
			return this.$store.state.scrollTop
		}
	},
	methods: {
		scroll(dir) {
			if (dir === 1) {
				this.scrollNum += 400
			} else {
				this.scrollNum = 0
			}
			$("html,body").animate({scrollTop:`${this.scrollNum}px`}, 300);
		},
		mail() {
			window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=CTo_OTs4PDs6OUl4eCdqZmQ', '_blank')
		}
	},
	watch: {
		scrollTop (val) {
			this.scrollNum = val
		}
	}
}
</script>

<style scoped>
.sideIcon{
	position: fixed;
	width: 42px;
	height: 126px;
	background: hsla(0,0%,77%,.4);
	bottom: 100px;
	left: 50%;
	margin-left: 500px;
}
.sideIcon i{
	display: block;
	height: 42px;
	text-align: center;
	line-height: 42px;
	cursor: pointer;
	box-sizing: border-box;
	font-size: 20px;
}
.sideIcon i:nth-of-type(1){
	border-bottom: 1px solid #f1f1f1;
}
.sideIcon i:nth-of-type(2){
	border-bottom: 1px solid #f1f1f1;
}
.sideIcon i:hover{
	background: #8ed53c;
	color: #ffffff;
}
</style>

