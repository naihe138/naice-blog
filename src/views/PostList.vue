/**
* @file
* @author 何文林
* @date 2017/6/24
*/
<template>
	<div id="postlist">
		<ul class="list" v-show="articels.length">
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
		<p class="nothing" v-show="articels.length === 0">nothing...</p>
		<div class="footer">
			<span class="prev iconfont" @click="toPrevPage">&#xe8f4;</span>
			<p class="pageNumber">{{currunPage + 1}}</p>
			<span class="next iconfont" @click="toNextPage">&#xe8f5;</span>
		</div>
		<transition name="slide-fade">
			<div v-if="showMassage" class="toast" v-text="message"></div>
		</transition>
	</div>
</template>

<script>
  import * as type from '../store/mutation-types'
  export default{
    data () {
      return {
        showMassage: false,
        message: '没有更多了'
      }
    },
    computed: {
      articels () {
        return this.$store.getters.articles
      },
      count () {
        let totalPage = Math.floor(this.$store.getters.count / 10)
        if (totalPage === 0) {
          this.showPageBtn = false
        }
        return totalPage
      },
      currunPage () {
        return this.$store.getters.currunPage
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
        const _this = this
        if (this.currunPage + 1 > this.count) {
          this.message = '没有更多了'
          _this.showMassage = true
          setTimeout(() => {
            _this.showMassage = false
          }, 2000)
          return
        }
        this.getArticle(this.currunPage + 1)
        this.$router.push('/articles?page=' + (
                          Number(this.currunPage) + 1))
        this.$store.dispatch('currunPage', this.currunPage + 1)
      },
      toPrevPage () {
        const _this = this
        if (this.currunPage - 1 < 0) {
          this.message = '已经是第一页了'
          _this.showMassage = true
          setTimeout(() => {
            _this.showMassage = false
          }, 2000)
          return
        }
        this.getArticle(this.currunPage - 1)
        this.$store.dispatch('currunPage', this.currunPage - 1)
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (/tag/.test(to.path)) {
          vm.getTags(to.query.tags)
          vm.$store.dispatch('currunPage', 0)
        } else {
          let page = Number(to.query.page) || 0
          vm.getArticle(page)
          vm.$store.dispatch('currunPage', page)
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
	}

	.list li {
		border-bottom: 1px dashed #e4e4e4;
		padding: 10px 25px;
		transition: box-shadow 0.3s;
	}
	.list li:hover{
		box-shadow: 0 0 5px #3fb76c
	}

	.list li .top {
		display: flex;
		justify-content: space-between;
		padding: 10px 0 16px 0;
		position: relative;
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
		font-size: 16px;
		color: var(--fontColor);
		line-height: 2;
		padding: 8px 0;
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
		clear: both;
		padding: 50px 20px;
		position: relative;
		justify-content: space-between;
	}

	.footer span {
		width: 30px;
		height: 30px;
		display: inline-block;
		cursor: pointer;
		transition: 0.3s;
		font-size: 24px;
	}

	.footer .pageNumber {
		font-size: 13px;
		color: #666;
	}

	.footer span:hover {
		transform: scale(1.1);
		color: #3fb76c;
	}

	.nothing {
		text-align: center;
		line-height: 100px;
		color: #666;
	}

	.toast {
		position: fixed;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		font-size: 12px;
		padding: 5px 15px;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter, .slide-fade-leave-to {
		transform: translateY(10px);
		opacity: 0;
	}
</style>