/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const router = require('koa-router')()
const articles = require('../controllers/article')

router.get('/', articles.getArticles)
router.get('/tag', articles.getTags)
router.get('/serch', articles.getAllArticles)

router.get('/:id', articles.getOneArticle)
module.exports = router
