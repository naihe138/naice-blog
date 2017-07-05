/**
 * @file
 * @author 何文林
 * @date 2017/7/5
 */
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const CommentSchema = new Schema({
  article: {
    type: ObjectId,
    ref: 'Article'
  },
  name: String,
  email: String,
  content: String,
  system: String,
  createAt: {
    type: Date,
    dafault: Date.now()
  }
})

module.exports = mongoose.model('Comment', CommentSchema)
