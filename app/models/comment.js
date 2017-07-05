/**
 * @file
 * @author 何文林
 * @date 2017/7/5
 */
const CommentModel = require('../schemas/comment')

class Comment {
  constructor() {
    this.model = CommentModel
  }
  save(opts) {
    this.entity = new CommentModel(opts)
    return this.entity.save()
  }
  queryAll(opts) {
    return this.model.find(opts).exec()
  }
  remove(opts) {
    return this.model.remove(opts)
  }
}

module.exports = Comment