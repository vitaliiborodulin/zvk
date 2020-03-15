const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const smartgrid = require('smart-grid');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

const ghPages = require('gh-pages');
const path = require('path');

const isDev = process.argv.includes('--dev');
const isProd = !isDev;
const isSync = process.argv.includes('--sync');

const jsFiles = [
	// './node_modules/jquery/dist/jquery.js',
	'./node_modules/blazy/blazy.js',
	// './node_modules/inputmask/dist/jquery.inputmask.min.js',
	'./node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
	'./node_modules/imagelightbox/dist/imagelightbox.min.js',
	'./src/js/script.js'
]

function html() {
	return gulp.src('./src/*.html')
	.pipe(gulp.dest('./build'))
	.pipe(gulpif(isSync, browserSync.stream()))
}

function styles() {
	return gulp.src('./src/less/styles.less')
	.pipe(gulpif(isDev, sourcemaps.init()))
	.pipe(less())
	.pipe(gcmq())
	.pipe(gulpif(isProd, autoprefixer({
		overrideBrowserslist: ['> 0.1%'],
		cascade: false
	})))
	.pipe(gulpif(isProd, cleanCss({
		level: 2
	})))
	.pipe(gulpif(isDev, sourcemaps.write()))
	.pipe(gulp.dest('./build/css'))
	.pipe(gulpif(isSync, browserSync.stream()))
}

function js() {
	return gulp.src(jsFiles)
	.pipe(gulpif(isDev, sourcemaps.init()))
	.pipe(concat('script.js'))
	.pipe(gulpif(isProd, uglify({
		toplevel: true
	})))
	.pipe(gulpif(isDev, sourcemaps.write()))
	.pipe(gulp.dest('./build/js'))
	.pipe(gulpif(isSync, browserSync.stream()))
}

function img() {
	return gulp.src('./src/img/**/*')
	.pipe(gulpif(isProd, imagemin([
		imageminJpegRecompress({
			progressive: true,
			min: 70, max: 75
		}),
		imageminPngquant({quality: [0.7, 0.75]})
	])))
	.pipe(gulp.dest('./build/img'))
	.pipe(gulpif(isSync, browserSync.stream()))
}

function clean() {
	return del('build/*')
}

function watch() {
	if (isSync) {
		browserSync.init({
			server: {
				baseDir: './build/'
			},
			open: false
		})
	}

	gulp.watch('./src/*.html', html);
	gulp.watch('./src/less/**/*.less', styles);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/img/**/*', img);
	gulp.watch('./smartgrid.js', grid);
}

function grid(done) {
	delete require.cache[require.resolve('./smartgrid.js')];

	let settings = require('./smartgrid.js');
	smartgrid('./src/less', settings);

	done();
}

function deploy(cb) {
    ghPages.publish(path.join(process.cwd(), './build'), cb);
}
exports.deploy = deploy;

let build = gulp.series(clean, gulp.parallel(html, styles, js, img));
gulp.task('build', gulp.series(grid, build));
gulp.task('watch', gulp.series(build, watch));
gulp.task('grid', grid);
