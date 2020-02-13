'use strict';

const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'hardware',
  test: fromRepoYML('hardware')
}
