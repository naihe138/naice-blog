/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const projects = require('../controllers/project')

router.get('/', projects.findProjects)

module.exports = router
