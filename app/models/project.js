/**
 * @file
 * @author 何文林
 * @date 2017/7/4
 */
const ProjectModel = require('../schemas/project')

class Project {
  constructor () {
    this.model = ProjectModel
  }

  save (opts) {
    this.entity = new ProjectModel(opts)
    return this.entity.save()
  }

  queryOne (opts) {
    return this.model.findOne(opts).exec()
  }

  queryCount (opts) {
    return this.model.count(opts)
  }

  queryAll () {
    return this.model.find({}).exec()
  }

  updated (id, opts) {
    return this.model.update({_id: id}, {$set: opts}).exec()
  }

  remove (opts) {
    return this.model.remove(opts).exec()
  }
}

module.exports = Project
