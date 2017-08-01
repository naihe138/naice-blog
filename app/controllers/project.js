/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const Project = require('../models/project')
const project = new Project()

// 添加项目
const add = async (ctx, next) => {
  let opts = ctx.request.body
  const newProject = await project.save(opts)
  if (newProject) {
    ctx.body = {
      state: true,
      massage: '保存项目成功'
    }
  } else {
    ctx.body = {
      state: false,
      massage: '保存项目失败'
    }
  }
}

// 查找所有项目
const findProjects = async (ctx, next) => {
  const newProject = await project.queryAll({})
  const projectCount = await project.queryCount({})
  if (newProject) {
    ctx.body = {
      state: true,
      count: projectCount,
      list: newProject
    }
  } else {
    ctx.body = {
      state: false,
      err: newProject,
      massage: '查找项目出错，请检查服务器'
    }
  }
}

// 查找指定id项目
const findProjectsById = async (ctx, next) => {
  let opts = ctx.request.body
  const newProject = await project.queryOne({_id: opts.id})
  if (newProject) {
    ctx.body = {
      state: true,
      data: newProject
    }
  } else {
    ctx.body = {
      state: false,
      err: newProject,
      massage: '查找项目出错，请检查服务器'
    }
  }
}

// 修改项目
const editProject = async (ctx, next) => {
  let opts = ctx.request.body
  console.log(opts)
  let updateObj = {}
  for (let key in opts) {
    if (key !== 'id' && opts[key]) {
      updateObj[key] = opts[key]
    }
  }
  console.log(updateObj)
  const isUpdate = await project.updated(opts.id, updateObj)
  console.log(isUpdate)
  if (isUpdate.ok) {
    ctx.body = {
      state: true,
      massage: '修改成功'
    }
  } else {
    ctx.body = {
      state: false,
      err: isUpdate,
      massage: '修改失败，你的参数'
    }
  }
}

// 删除项目
const remove = async (ctx, next) => {
  let opts = ctx.request.body
  const isRemove = await project.remove({_id: opts.id})
  if (isRemove.result.ok) {
    ctx.body = {
      state: true,
      massage: '删除项目成功'
    }
  } else {
    ctx.body = {
      state: false,
      err: isRemove,
      massage: '删除项目失败'
    }
  }
}

module.exports = {
  add,
  findProjects,
  editProject,
  remove,
  findProjectsById
}
