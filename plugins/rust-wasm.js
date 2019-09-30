'use strict';

const _                 = require('lodash')
const Promise           = require('bluebird')
const { fromRepoYML }   = require('../lib/utils.js')

module.exports = {
  name: 'rust-wasm',
  description: 'Check if a project is a rust project which also builds a wasm',
  test: fromRepoYML('rust-public-crate-wasm')
}
