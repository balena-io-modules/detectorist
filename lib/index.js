'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const fs       = Promise.promisifyAll(require('fs'))
const utils    = require('./utils')
const {
  join,
  basename,
  extname
} = require('path')

module.exports = async (path) => {
  const repoYAML = await mbGetRepoYAML(path)

  // If we have a repo.yml read that
  if (repoYAML && repoYAML.type) {
    return {
      [repoYAML.type]: true
    }
  }
  // Otherwise we try different heuristics
  let files = await fs.readdirAsync(join(__dirname, '../plugins'))

  const heuristics = files.map((file) => {
    const plugin = require(join(__dirname, '../plugins', file))

    return Promise.props({
      [plugin.name]: plugin.test(path)
    })
  })

  const results = await Promise.all(heuristics)
  // Will pick all truthy fields from heuristics
  return _.pickBy(_.reduce(results, _.merge, {}))
}

const mbGetRepoYAML = async (path) => {
  return utils.readYAML(join(path, 'repo.yml'))
  .catch((e) => {
    if (e.code === 'ENOENT') {
      return false
    }
    throw e
  })
}
