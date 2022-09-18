module.exports = {
	root: true,
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	rules: {
		'no-nested-ternary': 'off',
		'jsdoc/check-line-alignment': 'off',
		'react/no-unknown-property': [ 'error', { ignore: [ 'css' ] } ],
	},
};
