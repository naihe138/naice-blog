/**
 * @file
 * @author 何文林
 * @date 2017/7/26
 */
const router = require('koa-router')()
const upload = require('../controllers/upload')

router.post('/', upload.uploadImage)
module.exports = router
