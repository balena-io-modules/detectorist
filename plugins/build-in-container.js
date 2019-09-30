'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'build-in-container',
  test: fromRepoYML('build-in-container')
}
