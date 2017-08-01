/**
 * @file
 * @author 何文林
 * @date 2017/7/24
 */
const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    index: true
  },
  describe: String,
  hrefStr: String,
  imageUrl: String,
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
projectSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})
module.exports = mongoose.model('Project', projectSchema)