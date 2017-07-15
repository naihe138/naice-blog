/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const UserModel = require('../schemas/adminUser')

class adminUser {
  constructor() {
    this.model = UserModel
  }
  save(opts) {
    this.entity = new UserModel(opts)
    return this.entity.save()
  }
  query(opts) {
    return this.model.findOne(opts, 'username _id meta').exec()
  }
  queryAll() {
    return this.model.find({}).exec()
  }
  removeAll() {
    return this.model.remove({})
  }
}

module.exports = adminUser
