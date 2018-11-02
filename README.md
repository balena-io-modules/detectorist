# Detectorist

Detectorist is a library containing heuristics for determining the type of
project in a directory.

## Install as a library

Run `npm install --save detectorist` to install Detectorist and add it to your
`package.json`.

## Install as a CLI

Run `npm install -g detectorist.

## Usage

The CLI tool takes one argument, the path to the directory to check. Example:

```
$ detectorist .
#{
#  "node": true,
#  "npm": true,
#  "docker": true
#}
```

Usage  as a library is extremely simple. Given the following directory located at
`~/projects/foobar`:

```
$ ls -l
package.json
package-lock.json
index.js
```

And the usage of Dectorist:

```
const detect = require('detectorist')

const path = '~/projects/foobar'

detect(path)

// returns
//
// {
//   npm: true,
//   node: true,
//   docker: false
// }
```

Detectorist will determine that it is a node project, not a Docker project, and
(provided that `private` != `true` in the package.json) is also an npm project.

