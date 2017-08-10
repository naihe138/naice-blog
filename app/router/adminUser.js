/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const isAdmin = require('../config/isAdmin')
const adminUser = require('../controllers/adminUser')

router.post('/login', adminUser.login)
      .post('/register', isAdmin, adminUser.register)

module.exports = router
