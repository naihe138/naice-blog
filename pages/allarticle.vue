<template>
  <section class="allArticleBox">
	  <div class="tags">
		  <nuxt-link 
		  	:to="`/article?tag=${item._id}`"
		  	v-for="(item, index) in tags.result.list" 
			:key="index">{{item.name}}<span>({{item.count}})</span></nuxt-link>
	  </div>
	  <div class="articleList" v-if="article.length > 0">
		  <div class="item" v-for="(item, index) in article" :key="index">
			  <div  v-for="(article, j) in item.monthList" :key="j">
				  	<h2>{{item.year}}/{{article.month}}</h2>
					<div class="itemLink">
						<nuxt-link :to="`/article/${a._id}`" v-for="(a,i) in article.articleList" :key="i">{{a.title}}</nuxt-link>
					</div>
			  </div>
		  </div>
	  </div>
  </section>
</template>

<script>
import FooterMixin from '../utils/footer-mixin'
import {getArticleAll, getTag} from '../api'

export default {
	head: {
		title: 'naice | 归档'
	},
	layout: 'layout',
	mixins: [FooterMixin],
	async asyncData ({ params }) {
        const tags = await getTag()
        return {tags}
	},
	data() {
		return {
			article: []
		}
	},
	created () {
		getArticleAll().then(res => {
			this.article = res.result || []
		})
		this.$nextTick(() => {
			this.footer()
		})
	}
}
</script>

<style scoped>
.allArticleBox{
	margin: 0 auto;
	width: 900px;
	overflow: hidden;
}
.tags{
	width: 100%;
	overflow: hidden;
	border: 1px solid #f1f1f1;
	padding: 20px;
}
.tags a{
	display: inline-block;
	padding: 5px 10px;
}
.articleList{
	border: 1px solid #f1f1f1;
	padding: 20px;
	margin-top: 20px;
}
.item{
	margin-bottom: 20px;
}
.itemLink{
	box-sizing: border-box;
	width: 100%;
	padding-top: 5px;
}
.itemLink a{
	display: block;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	height: 32px;
	line-height: 32px;
	padding-left: 20px;
}
.itemLink a::before{
	content: "•";
	display: inline-block;
	padding-right: 5px;
}
</style>
