/**
* @file 关于我
* @author 何文林
* @date 2017/7/20
*/
<template>
  <section id="about">
    <div class="aboutContent">
      <h3>关于作者</h3>
      <p><span class="title">姓名：</span>何文林</p>
      <p><span class="title">年龄：</span>1991</p>
      <p><span class="title">地址：</span>深圳-南山区</p>
      <p><span class="title">职业：</span>前端开发</p>
      <p><span class="title">专业：</span>计算机科学与技术</p>
      <p><span class="title">Github：</span><a target="_blank" href="https://github.com/naihe138">@naice</a></p>
      <p class="skills">
        <span class="title">技能：</span>
        <span>
          HTLM5+CSS3<br/>
          NodeJs<br/>
          Vue<br/>
          React<br/>
          Gulp<br/>
          Webpack<br/>
        </span>
      </p>
      <h3>博客前台展示</h3>
      <p><span class="title">地址：</span><a target="_blank" href="https://blog.naice.me/">https://blog.naice.me/</a></p>
      <h3>关于本网站</h3>
      <p style="padding-bottom: 60px">
        本站服务端采用 koa2.0 + mongoDB 搭建, 网站分成前后端。<br/>
        前端客户端采用 Vue2.0-SSR 的 nuxt 框架的服务端渲染搭建，<br/>
        主要功能包括: 用户, 标签, 文章, 评论, 分享<br/>
        主要技术栈: koa2，mongoose，vue2，nuxt，vue2-router，vuex，vue2-ss，webpack，babel，eslint，nginx，pm2，http2，ssl
      </p>
      <h3>博客后台管理系统</h3>
      <p><span class="title">地址：</span><a target="_blank" href="https://blog.admin.naice.me/">https://blog.admin.naice.me/</a></p>
      <h3>关于后台管理系统</h3>
      <p style="padding-bottom: 60px">
        后台管理系统采用express框架直出的方式直接读取打包好的静态文件，<br/>
        后台管理系统主要用到 React+ant-ui做的单页面应用，<br/>
        主要功能包括: 文章的增、删、改、查；项目的增、删、改、查；游客和管理员的权限控制<br/>
        主要技术栈: react，react-router4，redux，ant-ui, webpack，babel，eslint，nginx，pm2，http2，ssl
      </p>
    </div>
  </section>
</template>
<script>
  import Aside from '../components/aside'
  export default {
    layout: 'content',
    transition: 'articlefade',
    head () {
      return {
        title: 'about naice'
      }
    },
    components: {
      'a-side': Aside
    }
  }
</script>
<style scoped>
#about{
  width: 100%;
  display: flex;
}
.aside{
  width: 350px
}
.aboutContent{
  flex: 1;
  padding: 30px;
  margin: 1px 20px;
  background: #fff;
}
.aboutContent h3 {
	font-size: 16px;
	line-height: 1.75;
	color: #3fb76c;
	padding: 15px 0;
}
.aboutContent p{
	padding-left: 30px;
	display: flex;
	line-height: 2.2;
	color: #333;
}
.aboutContent .title{
	padding-right: 20px;
	width: 60px;
}
</style>