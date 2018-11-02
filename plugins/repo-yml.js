'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = require('../lib/utils')
const { join }          = require('path')
const YAML                                      = require('yamljs')

module.exports = {
  name: 'repoYml',
  priority: 0,
  test: path => {
    return readFileAsync(join(path, 'repo.yml'))
    .then(str => {
      if (!str) return false

      return YAML.parse(str).type
    })
  }
}

