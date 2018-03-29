<template>
  <div class="shearComponnent"> 
      <a title="qq" target="_blank" :href="`http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`"><i class="iconfont">&#xe602;</i></a>
      <a title="豆瓣" target="_blank" :href="`https://www.douban.com/share/service?url=${url}&title=${title}`"><i class="iconfont">&#xe649;</i></a>
      <a title="qq空间" target="_blank" :href="`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}`"><i class="iconfont">&#xe7dc;</i></a>
      <a title="新浪微博" target="_blank" :href="`http://service.weibo.com/share/share.php?url=${url}&title=${title}`"><i class="iconfont">&#xe63d;</i></a>
      <a title="印象笔记" target="_blank" :href="`https://www.evernote.com/clip.action?url=${url}=&title=${title}`"><i class="iconfont">&#xe764;</i></a>
      <a title="谷歌" target="_blank" :href="`https://plus.google.com/share?url=${url}`"><i class="iconfont">&#xe6b2;</i></a>
      <a title="Facebook" target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"><i class="iconfont">&#xe6e2;</i></a>
      <a title="人人网" target="_blank" :href="`http://widget.renren.com/dialog/share?resourceUrl=${url}&srcUrl=${url}&title=${title}`"><i class="iconfont">&#xe608;</i></a>
      <a title="twitter" target="_blank" :href="`https://twitter.com/intent/tweet?text=${title}&url=${url}`"><i class="iconfont">&#xec9c;</i></a>
      <a title="邮件" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=CTo_OTs4PDs6OUl4eCdqZmQ" target="_blank"><i class="iconfont">&#xe60a;</i></a>
      <a title="复制链接" @click="copy" :data-clipboard-text="url" ref="copy"><i class="iconfont">&#xe609;</i></a>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
    name: "shear",
    props: {
        title: {
            type: String,
            default: 'naice的博客'
        },
        url: {
            type: String,
            default: 'blog.naice.me'
        }
    },
    methods: {
        copy () {
            new Clipboard(this.$refs.copy)
        }
    },
    data () {
        return {
            isPlay: true,
            isMute: false
        }
    }
}
</script>
<style scoped>
    .shearComponnent{
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
    }
    .shearComponnent a{
        display: inline-block;
        padding: 1px 20px;
        background: #eee;
        color: #555;
        cursor: pointer;
    }
    .shearComponnent a i {
        font-size: 20px;
    }
    .shearComponnent a:hover{
        text-decoration: none
    }
    .shearComponnent a:nth-of-type(1):hover{
        background: #e46666;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(2):hover{
        background: #5ece4e;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(3):hover{
        background: #9c27b0;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(4):hover{
        background: #3f51b5;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(5):hover{
        background: #2196f3;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(6):hover{
        background: #00bcd4;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(7):hover{
        background: #8bc34a;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(8):hover{
        background: #ff6f00;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(9):hover{
        background: #e64a19;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(10):hover{
        background: #ad22a5;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(11):hover{
        background: #03a9f4;
        color: #ffffff
    }
    .shearComponnent a:nth-of-type(12):hover{
        background: #e44c1c;
        color: #ffffff
    }
</style>