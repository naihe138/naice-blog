/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const isAdmin = require('../config/isAdmin')
const projects = require('../controllers/project')

router.get('/', projects.findProjects)
router.post('/add', isAdmin, projects.add)
router.post('/edit', isAdmin, projects.editProject)
router.post('/remove', isAdmin, projects.remove)
router.post('/findone', projects.findProjectsById)

module.exports = router
