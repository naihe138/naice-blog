/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const querystring = require('querystring')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Comment = require('../models/comment')
const comment = new Comment()

// 给文章添加评论
const addComment = async (ctx, next) => {
  const opts = ctx.request.body
  const newComment = await comment.save(opts)
  if (newComment) {
    ctx.body = {
      status: true,
      message: '添加评论成功',
      comment: newComment
    }
  } else {
    ctx.body = {
      status: false,
      message: '添加评论失败',
      data: newComment
    }
  }
}

const getComment = async (ctx, next) => {
  let opts = querystring.parse(ctx.request.url.split('?')[1])
  if (opts.article) {
    ctx.body = {
      status: false,
      message: '请给出正确的文章id'
    }
    return
  }
  opts.article = ObjectId(opts.article)
  const data = await comment.queryAll(opts)
  if (data) {
    ctx.body = {
      status: true,
      data
    }
  } else {
    ctx.body = {
      status: false,
      message: '查找评论失败'
    }
  }
}

const deleteComment = async (ctx, next) => {
  let opts = ctx.request.body
  if (opts.article) {
    ctx.body = {
      status: false,
      message: '请给出正确的文章id'
    }
    return
  }
  opts.article = ObjectId(opts.article)
  const comments = await comment.remove(opts)
  if (comments) {
    ctx.body = {
      status: true,
      message: '删除成功',
    }
  } else {
    ctx.body = {
      status: false,
      message: '删除评论失败',
      data: comments
    }
  }
}


module.exports = {
  addComment,
  getComment,
  deleteComment
}
