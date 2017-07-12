/**
* @file
* @author 何文林
* @date 2017/6/21
*/
<template>
	<div id="">
		<h1>{{str}}</h1>
		<button @click="getAjax">点我请求数据</button>
    <button @click="getArticle">获取文章</button>
    <ul>
      <li v-for="item in doneTodosCount">{{item}}</li>
    </ul>
    <hr/>
    <ul>
      <li v-for="item in articels">{{item.title}}</li>
    </ul>
    <hr/>
	</div>
</template>

<script>
  import * as type from '../store/mutation-types'
  export default{
    title () {
      return '测试异步加载和数据请求'
    },
    data () {
      return {
        str: '测试异步加载和数据请求'
      }
    },
    computed: {
      doneTodosCount () {
        return this.$store.getters.cartProducts
      },
      ret () {
        return this.$store.getters.ret
      },
      articels () {
        console.log(this.$store.getters.articles)
        return this.$store.getters.articles
      }
    },
    methods: {
      getAjax () {
        console.log('骗你的')
        this.$store.dispatch('add', 1)
      },
      getArticle () {
        this.$store.dispatch(type.GET_ARTICLE, {page: 0})
      }
    },
    mounted () {
      console.log(this.$store.getters.articels)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>