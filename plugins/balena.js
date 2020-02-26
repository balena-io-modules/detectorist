'use strict';

const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'balena',
  test: fromRepoYML('balena')
}
