const isProd = process.env.NODE_ENV === 'production'
let bastUrl = ''
if (isProd) {
  bastUrl = 'http://127.0.0.1:8902/api/front'
} else {
  bastUrl = 'http://127.0.0.1:3030/api/front'
}
export default {
  // 获取文章列表
  getArticles: bastUrl + '/article',
  serchArticles: bastUrl + '/article/serch',
  // 标签
  tag: bastUrl + '/article/tag'
}
