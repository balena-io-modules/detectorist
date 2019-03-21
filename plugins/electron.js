'use strict';

const _                 = require('lodash')
const Promise           = require('bluebird')
const { readYAML, readJSON }
                        = require('../lib/utils.js')
const { join }          = require('path')



readJSON
module.exports = {
  name: 'electron',
  description: 'Checks for the presence of electron in the package.json dependencies',
  test: path => {
    return readYAML(join(path, 'repo.yml'))
    .then((repo) => {
      if (_.get(repo, 'type', '') === 'electron') return true
      if (repo.type) return false
      return readJSON(join(path, 'package.json'))
      .then(str => {
        const pkg = JSON.parse(str)
        if (_.get(pkg, 'dependencies.electron', false)) return true
        if (_.get(pkg, 'devDependencies.electron', false)) return true
        return false
      })
    })
    .catch(err => {
      if (err.code === 'ENOENT') return false
      console.error(err.message)
      throw err
    })
  }
}
