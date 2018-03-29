<template>
	<div class="music">
		<div class="mControl">
			<span>
				<i class="iconfont">&#xe67f;</i>
			</span>
			<span>
				<i class="iconfont" v-if="isPlay">&#xe60d;</i>
				<i class="iconfont" v-else>&#xe69d;</i>
			</span>
			<span>
				<i class="iconfont">&#xe67d;</i>
			</span>
			<span>
				<i class="iconfont" v-if="isMute">&#xe65e;</i>
				<i class="iconfont" v-else>&#xe637;</i>
			</span>
		</div>
		<p class="mName">放飞自我</p>
	</div>
</template>
<script>
export default {
  name: "player",
  data () {
	return {
		isPlay: true,
		isMute: false
	}
  }
}
</script>
<style lang="css" scoped>
	.music{
		max-width: 250px;
		color: #cccccc
	}
	.mControl, .mName{
		text-align: center;
	}
	.mControl span{
		padding: 0 5px;
	}
	.mControl i{
		font-size: 12px;
	}
</style>