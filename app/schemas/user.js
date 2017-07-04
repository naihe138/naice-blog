/**
 * @file
 * @author 何文林
 * @date 2017/6/29
 */
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})
userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})
module.exports = mongoose.model('User', userSchema)
