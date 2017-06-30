const mongoose = require('mongoose')

const mongooseDB = function () {
  // mongoose.connect('mongodb://216.189.158.161:27017/fecss')
  mongoose.connect('mongodb://127.0.0.1:27017/blog')
  return mongoose.connection
}

module.exports = mongooseDB
