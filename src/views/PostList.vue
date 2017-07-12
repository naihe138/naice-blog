/**
* @file
* @author 何文林
* @date 2017/6/24
*/
<template>
	<div id="postlist">
		<ul class="list">
			<li v-for="item in articels">
				<div class="top">
					<h2><a href="javascript:void(0)" @click="goDetail(item._id)">{{item.title}}</a></h2>
					<span>{{item.meta ? item.meta.updateAt.substring(0, 10) : ''}}</span>
				</div>
				<div class="conten">
					<p v-text="item.describe"></p>
				</div>
				<div class="tag">
					<div>
						<span v-for="item2 in item.tags"
									@click="goTag(item2)">{{item2}}</span>
					</div>
					<a href="javascript:void(0)" @click="goDetail(item._id)">阅读全文</a>
				</div>
			</li>
		</ul>
		<div class="footer">
			<a href="">prev</a>
			<a href="">next</a>
		</div>
	</div>
</template>

<script>
  import * as type from '../store/mutation-types'
  export default{
    computed: {
      articels () {
        return this.$store.getters.articles
      }
    },
    methods: {
      goTag (tag) {
        this.getTags(tag)
        if (/tag/.test(this.$router.path)) {
          this.getTags(tag)
        }
        this.$router.push(`/tag?tags=${tag}`)
      },
      getArticle (page) {
        this.$store.dispatch(type.GET_ARTICLE, {page})
      },
      getTags (tags) {
        this.$store.dispatch(type.GET_TAGS, {tags})
      },
      goDetail (id) {
        this.$router.push(`/articles/${id}`)
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (/tag/.test(to.path)) {
          vm.getTags(to.query.tags)
        } else {
          vm.getArticle(0)
        }
      })
    }
  }
</script>

<style scoped>
	:root {
		--fontColor: #5e5e5e; /*文字颜色*/
		--titleColor: #3e3e3e; /*标题颜色*/
		--lineColor: #3fb76c; /*线条绿色*/
	}

	#postlist {
		width: 100%;
	}

	.list {
		width: 100%;
		box-sizing: border-box;
		padding-right: 20px;
	}

	.list li {
		border-bottom: 1px solid #e4e4e4;
		margin-bottom: 10px;
	}

	.list li .top {
		display: flex;
		justify-content: space-between;
		padding: 10px 0 16px 0;
	}

	.list li .top h2 {
		flex: 1;
	}

	.list li .top a {
		color: var(--titleColor);
		font-size: 20px;
		text-decoration: none;
	}

	.list li .top span {
		width: 100px;
		font-size: 12px;
		text-align: center;
		color: var(--lineColor);
	}

	.list li .conten {
		font-size: 14px;
		color: var(--fontColor);
		line-height: 1.8;
	}

	.list li .tag {
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
	}

	.list li .tag > div {
		flex: 1;
	}

	.list li .tag span {
		background: #d7d7d7;
		color: var(--titleColor);
		padding: 6px 15px;
		margin: 0 10px;
		font-size: 12px;
		cursor: pointer;
		transition: 0.5s;
	}

	.list li .tag span:hover {
		background: #3fb76c;
		color: #ffffff;
	}

	.list li .tag a {
		color: var(--lineColor);
		font-size: 12px;
		text-decoration: none;
		width: 100px;
		text-align: center;
	}

	.list li .tag a:hover {
		text-decoration: underline;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		padding: 20px 20px 20px 0;
	}
</style>