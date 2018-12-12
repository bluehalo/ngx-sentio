'use strict';

const pkg = require('./package.json');

export default {
	input: 'dist/index.js',
	external: [
		'@angular/core',
		'd3',
		'd3-selection',
		'rxjs',
		'rxjs/operators',
		'@asymmetrik/sentio'
	],
	output: {
		banner: `/*! ${pkg.name} - ${pkg.version} - ${pkg.copyright} + */`,
		file: `./dist/bundles/${pkg.artifactName}.js`,
		format: 'umd',
		globals: {
			'@angular/core': 'ng.core',
			'@asymmetrik/sentio': 'sentio',
			'd3': 'd3',
			'd3-selection': 'd3',
			'rxjs': 'Rx',
			'rxjs/operators': 'Rx.operators'
		},
		name: pkg.moduleName,
		sourcemap: true,
	},
	onwarn: ( warning, next ) => {
		if ( warning.code === 'THIS_IS_UNDEFINED' ) {
			return;
		}
		next( warning );
	}
};
