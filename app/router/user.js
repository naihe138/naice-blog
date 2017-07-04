/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const user = require('../controllers/user')

router.post('/login', user.login)
      .post('/register', user.register)

module.exports = router
