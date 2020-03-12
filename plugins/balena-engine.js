'use strict';

const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'balena-engine',
  test: fromRepoYML('balena-engine')
}
