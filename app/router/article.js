/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
// const user = require('../controllers/user')

router.get('/', (ctx, next) => {
  ctx.body = {
    status: true,
    msg: '获取全部文章接口'
  }
})

router.get('/:id', (ctx, next) => {
  ctx.body = {
    status: true,
    msg: '获取指定id文章'
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