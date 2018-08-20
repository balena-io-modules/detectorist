#!/usr/bin/env node

const detect = require('../lib/index.js')

detect(process.argv[2])
.then(res => {
  console.log(JSON.stringify(res, null, 2))
})

