/**
* @file 文章列表
* @author 何文林
* @date 2017/6/24
*/
<template>
  <div id="postListView">
    <section class="aside">
      <a-side>
        <div class="nav">
          <router-link class="btn-8" to="/">首&nbsp;&nbsp;&nbsp;页</router-link>
          <router-link class="btn-8" :to="'/articles?page=' + currunPage">文&nbsp;&nbsp;&nbsp;章</router-link>
          <router-link class="btn-8" to="/project">项&nbsp;&nbsp;&nbsp;目</router-link>
          <router-link class="btn-8" to="/about">关&nbsp;&nbsp;&nbsp;于</router-link>
        </div>
      </a-side>
    </section>
    <section class="listBox">
      <div class="listWrap">
        <div class="headerBox">
          <div class="serch">
            <input v-model="title" @keyup.enter="serch" type="text" placeholder="serch...">
            <span></span>
          </div>
          <div class="postBox">
            <router-link to="/">
              <p><i class="iconfont">&#xe73a;</i></p>
            </router-link>
            <!--<a target="_blank" href="https://github.com/naihe138?tab=repositories">-->
            <!--<p>项目</p>-->
            <!--</a>-->
          </div>
        </div>
        <transition name="articlefade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <copy-right></copy-right>
    </section>
  </div>
</template>

<script>
import Aside from '../components/aside'
import Copyright from '../components/footer.vue'
import * as type from '../store/mutation-types'

export default {
  data () {
    return {
      title: 'naice blog'
    }
  },
  computed: {
    currunPage () {
      return this.$store.getters.currunPage
    }
  },
  components: {
    'a-side': Aside,
    'copy-right': Copyright
  },
  methods: {
    serch () {
      if (this.title) {
        this.$store.dispatch(type.GET_SERCH, {title: this.title})
        this.$router.push(`articles?serch=${this.title}`)
      }
    }
  }
}
</script>

<style scoped>
  :root {
    --fontColor: #5e5e5e; /*文字颜色*/
    --titleColor: #3e3e3e; /*标题颜色*/
    --lineColor: #3fb76c; /*线条绿色*/
  }

  #postListView {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
  }

  .aside {
    width: 380px;
    height: 100%;
    background: #cccccc;
    padding: 0;
    margin: 0;
  }

  .listBox {
    flex: 1;
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #f5f5f5;
  }

  .listWrap{
    background: #fff;
    padding: 20px 0;
  }

  .headerBox {
    height: 70px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 20px;
  }

  .headerBox .serch {
    width: 300px;
    height: 28px;
    margin-top: 20px;
    position: relative;
  }

  .headerBox .serch span {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 50%;
    background: #939393;
    transition: width 0.3s;
  }

  .headerBox .serch input {
    outline: none;
    width: 300px;
    height: 28px;
    text-indent: 10px;
    color: var(--fontColor);
    background: transparent;
  }

  .headerBox .serch input:focus + span {
    width: 100%;
  }

  .headerBox .serch input:focus {
    border-color: green;
  }
  .postBox {
    position: absolute;
    width: 80px;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    right: 10px;
    top: 10px;
  }

  .postBox a {
    width: 30px;
    height: 30px;
    text-decoration: none;
    color: #999;
    text-align: center;
  }
  .postBox a:hover p {
    color: var(--lineColor);
  }
  .nav{
    margin-bottom: 30px
  }
  .nav a{
    width: 100px;
    margin: 5px auto;
    display: block;
    text-decoration: none;
    line-height: 1.8;
    color: #fff;
    background: rgba(0,0,0, 0.2);
    font-size: 16px;
    cursor: pointer;
    position: relative;
    border-radius: 2px;
  }
  /* btn-8 */
.btn-8{
  overflow: hidden;
  position: relative;
}

.btn-8:before, .btn-8:after{
  content: "";
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 0;
  top: 0;
  background-color: #3fb76c;
  -webkit-transition: all .4s;
  transition: all .4s;
}

.btn-8:before{
  left: -30px;
  transform: skew(-45deg, 0);
}
.btn-8:after{
  right: -30px;
  transform: skew(-45deg, 0);
}
.btn-8:hover{
  color: #fff !important;
}

.btn-8:hover:before, .btn-8:hover:after{
  width: 85%;
}
</style>