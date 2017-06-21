/* eslint-disable import/no-unresolved */
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const LRU = require('lru-cache')
const favicon = require('koa-favicon')
const compression = require('koa-compress')
const router = require('koa-router')()

const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const microCache = LRU({
  max: 100,
  maxAge: 1200
})

const titles = {
  '/': 'Koa Vue SSR',
  '/home': 'Koa Vue SSR | Home',
  '/menu': 'Koa Vue SSR | Menu',
  '/button': 'Koa Vue SSR | Button'
}
const cacheUrls = ['/', '/home', '/menu', '/button']

const isCacheable = ctx => cacheUrls.indexOf(ctx.url) >= 0 && useMicroCache

const resolve = file => path.resolve(__dirname, file)

// create koa instance
const app = new Koa()

// cache static
const serve = (filepath, cache) => require('koa-static')(resolve(filepath), {
  maxage: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

const template = fs.readFileSync(resolve('../src/index.template.html'), 'utf-8')

function createRenderer(bundle, options) {
  return require('vue-server-renderer').createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
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

/* eslint-disable consistent-return */
// render middleware
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

// Not matched /api uri
router.get(/^(?!\/api)(?:\/|$)/, isProd ? render : (ctx, next) => {
  readyPromise.then(() => render(ctx, next))
})

// api router
router.get('/api', (ctx, next) => {
  ctx.type = 'html'
  ctx.body = 'api router'
})

app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || (isProd ? 8902 : 3030)
app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`)
})
