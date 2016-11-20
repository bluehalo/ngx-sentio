'use strict';

let
	chalk = require('chalk'),
	del = require('del'),
	glob = require('glob'),
	gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	merge = require('merge2'),
	path = require('path'),
	q = require('q'),
	rollup = require('rollup-stream'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),

	plugins = gulpLoadPlugins(),
	pkg = require('./package.json'),
	assets = require('./config/assets');


// Banner to append to generated files
let bannerString = '/*! ' + pkg.name + '-' + pkg.version + ' - ' + pkg.copyright + '*/'


/**
 * Validation Tasks
 */

gulp.task('lint-client-code', () => {

	// Grab the tslint config
	var config = require(path.resolve('./config/tslint.conf.js'));
	config.formatter = 'prose';

	return gulp.src(assets.src.ts)
		// Lint the Typescript
		.pipe(plugins.tslint(config))
		.pipe(plugins.tslint.report({
			summarizeFailureOutput: true,
			emitError: true
		}));

});

/**
 * Build
 */

function doRollup(config, artifactName) {

	return rollup(config)
		.pipe(source('main.js', './src'))
		.pipe(buffer())
		.pipe(plugins.sourcemaps.init({ loadMaps: true }))
		.pipe(plugins.rename(artifactName + '.js'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))

		// Uglify
		.pipe(plugins.filter('**/' + artifactName + '.js'))
		.pipe(plugins.uglify({ preserveComments: 'license' }))
		.pipe(plugins.rename(artifactName + '.min.js'))
		.pipe(gulp.dest('dist'));
}

var tsProject = plugins.typescript.createProject('tsconfig.json');

// Build UMD JS from the TS source
gulp.task('build-js', [ 'lint-client-code' ], () => {

	let tsResult = gulp.src(assets.src.ts, { base: './src' })
		.pipe(plugins.sourcemaps.init())
		.pipe(tsProject());

	return merge([
			tsResult.js
				.pipe(plugins.sourcemaps.write('.'))
				.pipe(gulp.dest('dist/esm')),
			tsResult.dts.pipe(gulp.dest('dist/esm'))
		]).on('error', plugins.util.log);

});

// Build the JS into a umd bundle
gulp.task('build-js-umd', [ 'build-js' ], () => {
	return doRollup({
			entry: './dist/esm/index.js',
			format: 'umd',
			moduleName: 'angular2Sentio',
			sourceMap: true,
			banner: bannerString
		},
		pkg.artifactName + '.umd'
	);
});


/**
 * --------------------------
 * Main Tasks
 * --------------------------
 */
gulp.task('build', [ 'build-js-umd' ] );
gulp.task('default', [ 'build' ]);
