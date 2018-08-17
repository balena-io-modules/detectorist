# Dectorist

Detectorist is a library containing heuristics for determining the type of
project in a directory.

## Install

Run `npm install --save detectorist` to install Detectorist and add it to your
`package.json`.

## Usage

Usage is extremely simple. Given the following directory located at
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

