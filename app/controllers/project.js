/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const querystring = require('querystring')
const Project = require('../models/project')
const project = new Project()

// 添加项目
const add = async (ctx, next) => {
  let opts = ctx.request.body
  console.log(opts)
}

module.exports = {
  add
}
