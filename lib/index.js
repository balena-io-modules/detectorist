'use strict';

const _        = require('lodash')
const Promise  = require('bluebird')
const { readdirAsync }       = Promise.promisifyAll(require('fs'))
const YAML     = require('yamljs')
const { join } = require('path')

const loadPlugins = () => {
  return readdirAsync(join(__dirname, '../plugins'))
  .map(file => {
    return require(join(__dirname, '../plugins', file))
  })
  .then(plugins => _.sortBy(plugins, 'priority'))
}

module.exports = path => {
  if (!path) {
    throw new Error('Missing path!')
  }

  return loadPlugins()
  .then(plugins => {
    return Promise.map(plugins, plugin => Promise.props({
      [plugin.name]: plugin.test(path)
    }))
    .reduce((out, result) => {
      return _.merge(out, result)
    }, {})
    .then(types => {
      // check types in order of preference
      let type = _.find(_.map(plugins, 'name'), t => {
        return types[t]
      })

      if (types.repoYml) {
        type = types.repoYml
        types.repoYml = true
      }

      return { type, types }
    })
  })
}

