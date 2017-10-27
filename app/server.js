/* eslint-disable import/no-unresolved */
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const LRU = require('lru-cache')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const mongoose = require('mongoose')
const cors = require('koa-cors')
  // mongodb连接
const config = require('./config')
mongoose.Promise = require('bluebird')
mongoose.connect(config.dbUrl)
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to: ${config.dbUrl}`)
})

// 引入相关模型
require('./models/adminUser')
require('./models/article')
require('./models/comment')
require('./models/project')

// 引入路由
const adminUserRouter = require('./router/adminUser')
const articleRouter = require('./router/article')
const uploadFile = require('./router/upload')
const projects = require('./router/project')

const fArticleRouter = require('./router/fArticle')
const fProjectRouter = require('./router/fProject')

// 环境区分
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const microCache = LRU({
  max: 100,
  maxAge: 1200
})
const titles = {
  '/': 'naice',
  '/articles': 'naice'
}
const cacheUrls = ['/', '/articles']
const isCacheable = ctx => cacheUrls.indexOf(ctx.url) >= 0 && useMicroCache
const resolve = file => path.resolve(__dirname, file)

// 创建 koa 实例
const app = new Koa()

// 全局中间件
app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(cors({
  'origin': 'http://localhost:3030',
  'credentials': true
}))

// 静态资源缓存函数
const serve = (filepath, cache) => require('koa-static')(resolve(filepath), {
  maxage: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

// 渲染模板
const template = fs.readFileSync(resolve('../src/index.template.html'), 'utf-8')

// 创建渲染
function createRenderer(bundle, options) {
  return require('vue-server-renderer').createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('../dist'),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  readyPromise = require('../build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/favicon.ico'))
app.use(serve('../public', true))
app.use(serve('../dist', true))

// 渲染中间件
function render(ctx, next) {
  const start = Date.now()
  console.log('url:', ctx.url)
  ctx.type = 'html'
  ctx.set('X-Powered-By', 'Koa Vue SSR')
    // set ctx.body as stream
  const PassThrough = require('stream').PassThrough
  ctx.body = new PassThrough()
  if (!renderer) {
    console.log('renderer is not found')
    return ctx.body.end('waiting for compilation... refresh in a moment.')
  }
  // hit micro cache
  const cacheable = isCacheable(ctx)
  if (cacheable) {
    const html = microCache.get(ctx.url)
    if (html) {
      if (!isProd) {
        console.log('cache hit!')
      }
      ctx.body.end(html)
      return
    }
  }
  let html = ''
  ctx.body.on('data', (chunk) => {
    if (cacheable) {
      html += chunk.toString()
    }
  })
  const handleError = (err) => {
    if (err.url) {
      ctx.body.end('')
      return ctx.redirect(err.url)
    } else if (err.code === 404) {
      ctx.status = 404
      ctx.body.end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      ctx.status = 500
      ctx.body.end('500 | Internal Server Error')
      console.error(`error during render : ${ctx.url}`)
      console.error(err.stack)
    }
  }
  const handleStreamEnd = () => {
    if (cacheable) {
      // set micro cache
      microCache.set(ctx.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - start}ms`)
    }
  }
  const context = {
    title: titles[ctx.url] || 'Koa-Vue-SSR',
    url: ctx.url
  }
  renderer.renderToStream(context)
    .on('error', handleError)
    .on('end', handleStreamEnd)
    .pipe(ctx.body)
}

// 如果不是 api 的路由的直接跳 next
router.get(/^(?!\/api)(?:\/|$)/, isProd ? render : (ctx, next) => {
  readyPromise.then(() => render(ctx, next))
})

// 后台登录认证
// routes definition
router.use('/api/backstage/user', adminUserRouter.routes())
router.use('/api/backstage/article', articleRouter.routes())
router.use('/api/backstage/upload', uploadFile.routes())
router.use('/api/backstage/project', projects.routes())

// 前端调试
router.use('/api/front/article', fArticleRouter.routes())
router.use('/api/front/project', fProjectRouter.routes())

// 把路由绑定到 koa 中
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || (
  isProd ? 8902 : 3030)
app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`)
})
