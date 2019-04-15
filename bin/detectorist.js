#!/usr/bin/env node

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const _ = require('lodash')
const { join } = require('path')
const capitano = require('capitano')
const detect = require('../lib/index.js')


const run = async (params, options) => {
  const path = params.path

  const result = await detect(path)
  console.log(JSON.stringify(result, null, 2))
}


capitano.command({
  signature: '<path>',
  description: 'Detects the types for project in pathg',
  action: run
})

capitano.run(process.argv, (err) => {
  if (err) {
    throw err
  }
})
