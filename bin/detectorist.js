#!/usr/bin/env node

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { join } = require('path')

const detect = require('../lib/index.js')
const path = process.argv[2]

if (!path) {
  console.log('Usage')
  console.log('detectorist <path>\n')
  console.log('Returns a JSON object on STDOUT with key/value')
  console.log('pairs of checks and boolean results.\n')
  console.log('Available checks:\n')

  return fs.readdirAsync(join(__dirname, '../plugins'))
  .map(file => {
    const plugin = require(join(__dirname, '../plugins', file))
    console.log(`${plugin.name}\t\t${plugin.description || ''}`)
    return
  })
  .then(() => process.exit(1))
} else {
  detect(process.argv[2])
  .then(res => {
    console.log(JSON.stringify(res, null, 2))
  })
}

