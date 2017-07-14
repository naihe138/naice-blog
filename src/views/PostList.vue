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
		<div class="footer" v-if="showPageBtn">
			<span class="prev" v-if="showPrev"></span>
			<span class="next" v-if="showNext" @click="toNextPage()"></span>
		</div>
		<span>{{currunPage}}{{count}}</span>
	</div>
</template>

<script>
  import * as type from '../store/mutation-types'
  export default{
    data () {
      return {
        showPageBtn: true,
        showPrev: true,
        showNext: true
      }
    },
    computed: {
      articels () {
        return this.$store.getters.articles
      },
      count () {
        let totalPage = Math.floor(this.$store.getters.count / 10)
        console.log(totalPage)
        if (totalPage === 0) {
          this.showPageBtn = false
        }
        return totalPage
      },
      currunPage () {
        let cPage = this.$store.getters.currunPage
        if (cPage === 0) {
          this.showPrev = false
        } else if (cPage >= this.count) {
          this.showNext = false
        }
        return cPage
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
      },
      toNextPage () {
        console.log(this.currunPage)
        console.log(this.count)
        if (this.currunPage + 1 > this.count) {
          alert('没有更多了')
          return
        }
        this.getArticle(this.currunPage + 1)
      },
      toPrevPage () {
        if (this.currunPage - 1 < this.count) {
          alert('已经是第一页了')
          return
        }
        this.getArticle(this.currunPage - 1)
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

	.list li:last-child {
		border: none;
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
		display: block;
		clear: both;
		padding: 30px 20px 20px 0;
		position: relative;
	}

	.footer span {
		width: 30px;
		height: 30px;
		display: inline-block;
		background-size: cover;
		cursor: pointer;
		transition: 0.3s;
		position: absolute;
	}

	.footer span.prev {
		background-image: url("../assets/img/prev.png");
		left: 0;
	}

	.footer span.prev:hover {
		transform: rotate(-45deg);
	}

	.footer span.next:hover {
		transform: rotate(45deg);
	}

	.footer span.next {
		background-image: url("../assets/img/next.png");
		right: 30px;
	}
</style>