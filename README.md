# Koa Vue SSR Blog

>  This Blog built with Vue 2.0, vue-router & vuex  with server-side rendering by koa.

## Build Setup
Requires Node.js 7+
``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3030
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

一把桌子，一台电脑，一瓶红牛，一包纸巾，从白天到黑夜。历经一个多月的时间，从零到构思到设计，从设计到`vue-ssr` 的框架设计，然后再从前端的业务逻辑代码的实现，从 后台`nodejs` 的 `koa2`框架到数据库的设计到后端的业务逻辑的代码实现，从购买阿里云服务器到申请域名，然后到备案，整整一个时间下来，真的不容易。总算是今天成功把自己的孩子托付到阿里云的服务器上面了。下面来分享一些心得。

#### 先来一些截图

![图片描述][1]

![图片描述][2]

![图片描述][3]

![图片描述][4]

![图片描述][5]

![图片描述][6]

![图片描述][7]

### 描述
  
>因为也是刚刚学习 `nodejs`，详细的把所有技术遇到的坑写下来，篇幅肯定很长，所以这里做一个简单的描述，看以后有时间在把开发细节，以及部署方案全部写下来。
  
  一直想做一个自己喜欢的比较强清爽的博客页面，之前用的是 `hexo` 构建，发现还是不太满意。就想着自己设计一个出来。

客户端输出的页面。是用 `vue-ssr `直接用服务器渲染直出页面，中间构建的时候遇到很多坑，之前以为页面出来之后可以直接难道 `window `对象，后面才知道，服务器哪来的的 `window`对象呀。以及后台用户登录的权限控制，跨域，标签分类等等。对于新上手`nodejs` 简直就是一头雾水，所幸在这个网站得到很多帮助，这里 非常谢谢帮助过我的人。


后台的前端就是用 `ant-ui`和 `reudx`来状态管理来构建的，选择 `markdown组件`的时候， 一直没有找到自己的想要的，后面就改了一个。这也花了很多时间。中间还遇到很多很多坑~~~


最后看这自己所部署的三个网站安静的躺在自己租的阿里云上。安逸~~~

安利一波：


博客地址：[http://blog.naice.me/][8]
    

    
博客后台管理： [http://blog.admin.naice.me/][9]

github地址：

博客：[https://github.com/naihe138/naice-blog][10]

后台前端： [https://github.com/naihe138/naice-blog-admin][11]
    
ps：如果对你有一点点帮助的话，请随手丢一个 start，thx。


  [1]: https://segmentfault.com/img/bVRnrV
  [2]: https://segmentfault.com/img/bVRnrW
  [3]: https://segmentfault.com/img/bVRnrX
  [4]: https://segmentfault.com/img/bVRnrY
  [5]: https://segmentfault.com/img/bVRnr3
  [6]: https://segmentfault.com/img/bVRnr4
  [7]: https://segmentfault.com/img/bVRnr5
  [8]: http://blog.naice.me/
  [9]: http://blog.admin.naice.me/
  [10]: https://github.com/naihe138/naice-blog
  [11]: https://github.com/naihe138/naice-blog-admin

## License
MIT
