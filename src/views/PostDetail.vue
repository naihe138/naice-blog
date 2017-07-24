/**
* @file
* @author 何文林
* @date 2017/7/12
*/
<template>
	<div id="detail">
		<div class="top">
			<h2 class="title">{{oneArticle.title}}</h2>
			<div class="tags">
				<span v-for="item in oneArticle.tags" @click="toTags(item)">{{item}}</span>
			</div>
			<!--<p class="date">{{oneArticle.meta ? oneArticle.meta.updateAt.substring(0, 10) : ''}}</p>-->
			<div class="markdown" v-html="oneArticle.contentStr"></div>
			<div class="shearBox">
				<a target="_blank" :href="'http://connect.qq.com/widget/shareqq/index.html?url='+url+'&title='+oneArticle.title+'&source=http://img.store.naice.me/averter.jpg#_naice'"  class="iconfont">&#xe602;</a>
				<a target="_blank" :href="'http://service.weibo.com/share/share.php?url='+url+'&title='+oneArticle.title+'&pic=http://img.store.naice.me/averter.jpg#_naice'" class="iconfont">&#xe832;</a>
				<a target="_blank" :href="'https://www.douban.com/share/service?href='+url+'&name='+oneArticle.title+'&image=http://img.store.naice.me/averter.jpg#_naice'" class="iconfont">&#xe663;</a>
				<a target="_blank" :href="'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+oneArticle.title+'&summary=http://img.store.naice.me/averter.jpg#_naice'" class="iconfont">&#xe624;</a>
				<a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=CTo_OTs4PDs6OUl4eCdqZmQ" class="iconfont">&#xe64d;</a>
				<a target="_blank" :href="'http://share.v.t.qq.com/index.php?c=share&a=index&title='+oneArticle.title+'&url='+oneArticle.title+'&pic=http://img.store.naice.me/averter.jpg#_naice'" class="iconfont">&#xe601;</a>
			</div>
			<div class="comment-line"></div>
			<section class="comment">
				<!--<h3>少侠留下你的想法吧</h3>-->
				<div class="commentBox" id="commentBox"></div>
				<!--<div class="commentBox" id="commentBox">-->
				<!--<input class="in_text" type="text" placeholder="少侠大名：">-->
				<!--<input class="in_text" type="text" placeholder="Email：">-->
				<!--<input class="in_text" type="text" placeholder="网站：">-->
				<!--<textarea class="in_text" rows="5" placeholder="idear~~~"></textarea>-->
				<!--<div class="subCommet">发布</div>-->
				<!--</div>-->
			</section>
		</div>
	</div>
</template>

<script>
  import * as types from '../store/mutation-types'
  import Gitment from 'gitment'
  import GitComent from '../config/github-comment'
  export default{
    data () {
      return {
        url: 'http://blog.naice.me/articles/'
      }
    },
    computed: {
      oneArticle () {
        return this.$store.getters.oneArticle
      }
    },
    methods: {
      toTags (tag) {
        this.$router.push(`/tag?tags=${tag}`)
      }
    },
    mounted () {
      const id = this.$route.params.id
      this.$store.dispatch(types.GET_ARTICLEBYID, id)
      const gitment = new Gitment({
        owner: 'naihe138',
        repo: GitComent.comment_repo,
        oauth: {
          client_id: GitComent.client_id,
          client_secret: GitComent.client_secret
        }
      })
      this.$nextTick(() => {
        gitment.render('commentBox')
      })
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$nextTick(() => {
          vm.url = 'http://blog.naice.me/articles/' + to.params.id
          setTimeout(function () {
            if (typeof window !== 'undefined') {
              window.$('pre code').each(function (i, block) {
                window.hljs.highlightBlock(block)
              })
            }
          }, 600)
        })
      })
    }
  }
</script>

<style>
	@import "gitment/style/default.css";

	:root {
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}

	#detail .title {
		text-align: center;
	}

	#detail .date {
		text-align: center;
		font-size: 12px;
		line-height: 20px;
	}

	#detail .tags {
		text-align: center;
		clear: both;
		margin: 10px 0;
	}

	#detail .tags span {
		display: inline-block;
		background: #d7d7d7;
		color: #3e3e3e;
		padding: 6px 15px;
		margin: 0 10px;
		font-size: 12px;
		cursor: pointer;
		transition: .5s;
	}

	#detail .tags span:hover {
		background: #3fb76c;
		color: #ffffff;
	}

	.markdown {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		padding: 20px;
		line-height: 1.5;
	}

	.markdown p {
		font-size: 14px;
		line-height: 1.75;
	}

	.markdown li {
		line-height: 1.8;
		margin-left: 20px;
	}

	.markdown ol li{
		list-style: decimal;
	}

	.markdown ul li {
		list-style: disc;
	}

	.markdown h1,
	.markdown h2,
	.markdown h3,
	.markdown h4,
	.markdown h5,
	.markdown h6 {
		margin: 12px 0;
	}

	.markdown h1,
	.markdown h2 {
		margin-top: 20px;
		padding-bottom: 8px;
		border-bottom: 1px dotted #cccccc;
	}

	.markdown a {
		color: #4682b4;
		text-decoration: none;
	}

	.markdown a:hover {
		color: #0081ff;
	}

	.markdown pre {
		background-color: rgba(0, 0, 0, 0.05);
		color: #555;
		border-radius: 3px;
		padding: 10px;
		overflow: auto;
		border: none;
		font-size: 0.9em;
		line-height: 1.33;
	}

	.markdown pre code {
		font-size: inherit;
		color: inherit;
		padding: 0;
		background-color: transparent;
		font-style: normal;
	}

	.markdown code {
		color: #d82451;
		background-color: #f6f6f6;
		font-size: 0.9em;
		padding: 2px 4px;
		margin: 0 2px;
	}

	.markdown blockquote {
		margin: 0;
		padding: 5px 10px 5px 15px;
		border-left: 5px solid #4682b4;
		background-color: #f5f5f5;
	}

	.markdown table {
		border: 1px solid #cccccc;
	}

	.markdown table thead tr {
		background-color: #eee;
	}

	.markdown table tbody tr {
		border-top: 1px solid #cccccc;
		background-color: #fff;
	}

	.markdown table th,
	.markdown table td {
		padding: 8px;
		border-left: 1px solid #cccccc;
	}

	.markdown hr {
		border-style: solid;
		border-color: #ccc;
	}

	.markdown img {
		max-width: 80%;
	}

	.comment-line {
		width: 90%;
		height: 1px;
		background: #cccccc;
		margin: 10px auto;
	}

	.subEditor {
		margin: 20px 0;
	}

	.subEditor .help-text {
		padding-left: 10px;
	}

	.comment {
		width: 80%;
		margin: 30px auto;
		position: relative;
		padding-bottom: 100px;
	}

	.comment h3 {
		font-size: 16px;
		font-weight: normal;
		color: var(--lineColor);
		text-align: center;
	}

	.in_text {
		display: block;
		border: 1px solid #cccccc;
		margin: 10px auto;
		width: 600px;
		outline: none;
		padding: 5px;
		font-size: 14px;
	}

	.commentBox input {
		height: 26px;
	}

	.commentBox .subCommet {
		width: 100px;
		background: var(--lineColor);
		color: #ffffff;
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: absolute;
		left: 50%;
		margin-left: 200px;
		bottom: 40px;
		cursor: pointer;
	}

	.shearBox {
		margin: 20px 0;
	}

	.shearBox a {
		display: inline-block;
		margin-left: 10px;
		text-decoration: none;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
		background: #666;
		color: #ffffff;
		transition: 0.3s;
	}

	.shearBox a:hover {
		background: #3fb76c;
	}
</style>