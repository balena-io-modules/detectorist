'use strict';

const { join } = require('path');
const { readYAML } = require('../lib/utils.js');

const CONTRACT_PATH = 'balena.yml';

module.exports = {
	name: 'transformers',
	test: (path) => {
		return readYAML(join(path, CONTRACT_PATH))
			.then((result) => {
				// data.$transformer implies opt in to transformers flow
				if (result && result.data && result.data.$transformer) {
					return true;
				}
				return false;
			})
			.catch((err) => {
				if (err.code === 'ENOENT') {
					return false;
				}
				console.error(err.message);
				throw err;
			});
	},
};
