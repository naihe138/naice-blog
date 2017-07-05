/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  describe: String,
  editStr: String,
  contentStr: String,
  meta: {
    createAt: {
      type: Date,
      index: true,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      index: true,
      dafault: Date.now()
    }
  }
})
articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})
module.exports = mongoose.model('Article', articleSchema)