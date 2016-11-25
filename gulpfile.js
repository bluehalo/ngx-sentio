'use strict';

let
	chalk = require('chalk'),
	glob = require('glob'),
	gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	merge = require('merge2'),
	path = require('path'),
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
		.pipe(source('index.js', assets.dist.dir))
		.pipe(buffer())
		.pipe(plugins.rename(artifactName + '.js'))
		.pipe(gulp.dest(assets.dist.bundleDir))

		// Uglify
		.pipe(plugins.filter('**/' + artifactName + '.js'))
		.pipe(plugins.uglify({ preserveComments: 'license' }))
		.pipe(plugins.rename(artifactName + '.min.js'))
		.pipe(gulp.dest(assets.dist.bundleDir));

}

var tsProject = plugins.typescript.createProject('tsconfig.json');

// Build JS from the TS source
gulp.task('build-js', [ 'lint-client-code' ], () => {

	let tsResult = gulp.src(assets.src.ts, { base: './src' })
		.pipe(plugins.sourcemaps.init())
		.pipe(tsProject());

	return merge([
			tsResult.js
				.pipe(plugins.sourcemaps.write())
				.pipe(gulp.dest(assets.dist.dir)),
			tsResult.dts.pipe(gulp.dest(assets.dist.dir))
		]).on('error', plugins.util.log);

});

// Build the JS into a umd bundle
gulp.task('build-js-umd', [ 'build-js' ], () => {

	return doRollup({
			entry: assets.dist.dir + '/index.js',
			format: 'umd',
			moduleName: 'angular2Sentio',
			sourceMap: true,
			banner: bannerString,
			globals: {
				'@angular/core': 'ng.core',
				'@asymmetrik/sentio': 'sentio',
				'd3': 'd3'
			},
			onwarn: (message) => {
				/*
				 * We are suppressing this specific error because typescript emits code that triggers this condition
				 * even though the generated code is checking to make sure 'this' is not undefined before doing anything
				 * with it.
				 */
				if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
					return;
				}
				plugins.util.log(message);
			}
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
