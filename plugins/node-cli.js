'use strict';

const Promise           = require('bluebird')
const { readFileAsync } = Promise.promisifyAll(require('fs'))
const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'nodeCli',
  test: fromRepoYML('node-cli')
}
