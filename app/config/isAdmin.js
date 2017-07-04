/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const jwt = require('jsonwebtoken')

const verify = function (token, username) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'naice', (err, decoded) => {
      if (err) {
        reject(err)
      }
      if (decoded.username === username) {
        resolve(decoded)
      } else {
        resolve()
      }
    })
  })
}

module.exports = async function (ctx, next) {
  console.log(ctx.request.url)
  // 如果不是admin，或者是login直接跳过该中间件
  if (ctx.request.url.indexOf('login') !== -1) {
    return next()
  }
  if (ctx.request.url.indexOf('api') === -1) {
    return next()
  }
  console.log('后台登录认证')
  const token = ctx.cookies.get('b_user')
  const username = ctx.cookies.get('b_username')
  if (token) {
    const isA = await verify(token, username)
    console.log(isA)
    if (isA && isA.username) {
      return next()
    } else {
      ctx.cookies.set('b_user', '', { maxAge: 0 })
      ctx.cookies.set('b_username', '', { maxAge: 0 })
      ctx.body = {
        code: -500,
        message: '登录验证失败'
      }
    }
  } else {
    ctx.body = {
      code: -500,
      message: '请先登录'
    }
  }
}