/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
// const user = require('../controllers/user')

router.post('/login', (ctx, next) => {
  console.log(123)
  ctx.body = {
    status: true,
    msg: '登录接口'
  }
})

router.post('/register', (ctx, next) => {
  ctx.body = {
    status: true,
    msg: '注册接口'
  }
})

router.get('/query', (ctx, next) => {
  ctx.body = {
    status: true,
    msg: '查找用户接口'
  }
})

router.get('/delete', (ctx, next) => {
  ctx.body = {
    status: true,
    msg: '删除用户接口'
  }
})

module.exports = router
