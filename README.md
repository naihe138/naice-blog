一直以来都想用自己所想的技术做一些个人小项目，之前的[博客](https://segmentfault.com/a/1190000010301516)觉从视觉上和交互上得有点小小不满足，所以想着做一些小小的重构。陆陆续续花了两个多月的时间，原因是工作特别的忙（为自己懒惰找借口），所以知道今天才发布上线。

博客地址：[naice-blog](https://github.com/naihe138/naice-blog)

博客管理：[naice-blog-admin](https://github.com/naihe138/naice-blog-admin)

博客后台：[node-koa](https://github.com/naihe138/naice-blog-koa)


### 相关截图:


![首页](https://user-gold-cdn.xitu.io/2018/4/1/1627f9d60ba1bb5d?w=1440&h=877&f=png&s=259281)

![文章](https://user-gold-cdn.xitu.io/2018/4/1/1627f9dd172c24fb?w=1440&h=877&f=png&s=294054)

![文章详情](https://user-gold-cdn.xitu.io/2018/4/1/1627fa172d40b56e?w=1500&h=1055&f=png&s=644818)


![评论](https://user-gold-cdn.xitu.io/2018/4/1/1627fa1d85695f5d?w=1500&h=1055&f=png&s=299251)

![项目](https://user-gold-cdn.xitu.io/2018/4/1/1627f9eaa9113bbc?w=1440&h=877&f=png&s=232679)

![留言](https://user-gold-cdn.xitu.io/2018/4/1/1627f9f2b869f78d?w=1440&h=877&f=png&s=175663)


![归档](https://user-gold-cdn.xitu.io/2018/4/1/1627fa33c4308b1d?w=1440&h=877&f=png&s=285072)


![关于](https://user-gold-cdn.xitu.io/2018/4/1/1627fa36c72e2f13?w=1440&h=877&f=png&s=345397)


### 后台相关截图：


![登录](https://user-gold-cdn.xitu.io/2018/4/1/1627fa3f064f0ee8?w=1440&h=877&f=png&s=329202)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa43c165b475?w=1440&h=877&f=png&s=208579)

![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa5294b9a912?w=1440&h=877&f=png&s=120206)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa4ae6d40b0e?w=1440&h=877&f=png&s=156066)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa4d5d8e492e?w=1440&h=877&f=png&s=119976)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa4fa0e57b2a?w=1440&h=877&f=png&s=113900)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa591ac6e1d8?w=1440&h=877&f=png&s=108352)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa6d0b7668d4?w=1440&h=877&f=png&s=231570)
![](https://user-gold-cdn.xitu.io/2018/4/1/1627fa676b537062?w=1440&h=877&f=png&s=118632)

### 相关技术栈：

+ vue + vuex + vue-router +nuxt
+ react + redux + react-router + ant design
+ token控制
+ 按需加载，ssr
+ ....


### server

+ node + koa + mongoose
+ 路由用了装饰器包装，鉴别参数是否正确
+ 登录权限jwt
+ 百度sro推送，邮件通知
+ pm2自动化部署
+ nginx + ssl + http2
+ 缓存
+ ....


### 未来可能加入

+ 网易云音乐
+ 移动适配
+ 页面数据可视化统计
+ react-native
+ ....


### 启动


#### clone
````
git clone git@github.com:naihe138/naice-blog.git

````

#### install
````
yarn

````

#### dev

````

npm run dev

````

#### build

````
npm run build
````

#### view build

````
npm start
````

如在浏览中遇到任何的bug，请留言我，我会第一时间修复，就此先谢谢
