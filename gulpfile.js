const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const sequence = require('gulp-sequence');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const express = require('express');

const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');

const open = require('gulp-open');

const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 4 versions']});

const eslint = require('gulp-eslint');

gulp.task('webpack-dev-server', function(callback) {
  let compiler = webpack(webpackConfig);

  let server = new WebpackDevServer(compiler, {
    // server and middleware options
    stats: {colors: true},
    contentBase: './src',
    watchContentBase: true,
    publicPath: '/js/',
    setup(app) {
      app.use(express.static('.tmp'));
    },
  });

  server.listen(8080, 'localhost', function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    // Server listening
    gutil.log(
      '[webpack-dev-server]',
      'http://localhost:8080'
    );

    // keep the server alive or continue?
    callback();
  });
});

gulp.task('copy', function() {
  return gulp.src(
      [
        './src/data/**/**',
        './src/images/**/**',
        './src/audio/**/**',
        './src/fonts/**/**',
        './src/js/lib/**/**',
      ], {base: 'src'}
    )
    .pipe(gulp.dest('./dist'));
});

gulp.task('usemin', function() {
  return gulp.src(['./src/*.html'])
    .pipe(usemin({
      css: [],
      js: ['concat', uglify()],
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', function() {
  return gulp.src('./src/js/index.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('less', function() {
  return gulp.src('./src/css/**/**/*.less')
  .pipe(less({
    paths: [path.join(__dirname, 'src')],
    plugins: [autoprefix],
  }))
  .pipe(gulp.dest('.tmp/css'));
});

gulp.task('eslint', function() {
  return gulp.src([
    './src/js/**/**/*.js',
    '!./src/js/lib/**/**',
    'gulpfile.js',
    'webpack.config.js',
  ])
  .pipe(eslint({
    configFile: '.eslintrc',
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(
    [
      'src/css/**/**',
    ], ['less']
  );

  gulp.watch(
    [
    './src/js/**/**/*.js',
    '!./src/js/lib/**/**',
    'gulpfile.js',
    'webpack.config.js',
  ], ['eslint']);
});

gulp.task('open', function() {
  return gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('default', ['serve']);

gulp.task('serve', [
  'less',
  'eslint',
  'webpack-dev-server',
  'watch',
  'open',
]);

gulp.task('build', sequence(
  'less',
  [
    'eslint',
    'copy',
    'usemin',
    'webpack',
  ]
));
