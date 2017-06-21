/**
* @file
* @author 何文林
* @date 2017/6/21
*/
<template>
	<div id="">
		<h1>{{str}}</h1>
		<button @click="getAjax">点我请求数据</button>
	</div>
</template>

<script>
  export default{
    title() {
      return '测试异步加载和数据请求'
    },
    data() {
      return {
        str: '测试异步加载和数据请求'
      }
    },
    methods: {
      getAjax() {
        console.log('骗你的')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>