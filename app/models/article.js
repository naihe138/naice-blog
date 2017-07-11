/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const ArticleModel = require('../schemas/article')

class Article {
  constructor() {
    this.model = ArticleModel
  }
  save(opts) {
    this.entity = new ArticleModel(opts)
    return this.entity.save()
  }
  queryOne(opts) {
    return this.model.findOne(opts).exec()
  }
  query(skip, limit, sort) {
    const query = this.model.find({}).skip(skip).limit(limit).sort(sort)
    return query.exec()
  }
  updated(id, opts){
    return this.model.update({ _id: id }, { $set: opts}).exec();
  }
  queryTag(tagOpts) {
    return this.model.find(tagOpts).exec()
  }
  remove(opts) {
    return this.model.remove(opts)
  }
}

module.exports = Article
