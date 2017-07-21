/**
 * @file
 * @author 何文林
 * @date 2017/7/3
 */
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const adminUser = require('../models/adminUser')
const config = require('../config/index')
const user = new adminUser()

const login = async (ctx, next) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password
  if (!username || !password) {
    ctx.body = {
      message: '用户名或者密码为空！',
      status: false,
    }
    return
  }
  const opts = {
    username,
    password: md5(config.md5Pre + password)
  }
  const finduser = await user.query(opts)
  if (finduser) {
    const token = jwt.sign({
      username: opts.username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, 'naice')
    ctx.cookies.set('b_user', token, { maxAge: 2592000000 })
    ctx.cookies.set('b_username', opts.username, { maxAge: 2592000000 })
    ctx.body = {
      message: '登陆成功！',
      user: finduser,
      status: true,
      token
    }
  } else {
    ctx.body = {
      message: '用户名或者密码不正确！',
      status: true
    }
  }
}

const register = async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  if (!username || !password) {
    ctx.body = {
      message: '用户名或者密码为空！',
      status: false,
    }
    return
  }
  const opts = {
    username,
    password: md5(config.md5Pre + password)
  }
  const finduser = await user.query({ username: opts.username })
  if (finduser) {
    ctx.body = {
      status: true,
      user: finduser,
      message: '用户已经存在'
    }
  } else {
    await user.save(opts).then(doc => {
      ctx.body = {
        status: true,
        user: doc,
        message: '用户创建成功'
      }
    }).catch(err => {
      ctx.body = {
        status: false,
        err
      }
    })
  }
}


module.exports = {
  login,
  register
}