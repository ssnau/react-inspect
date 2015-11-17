require('babel/register');
var gulp = require('gulp');
var shelljs = require('shelljs');
var babel = require('gulp-babel');
var pkg = require('./package.json');
var cwd = __dirname;
var path = require('path');
var rtCore = require('rt-core');

function clean() {
  shelljs.rm('-rf', path.join(cwd, 'build'));
  shelljs.rm('-rf', path.join(cwd, 'lib'));
  shelljs.rm('-rf', path.join(cwd, 'assets/*.css'));
}

gulp.task('clean', clean);

// copy all the files except js/jsx/less/sass/scss/css to lib folder
gulp.task('copy', function () {
  return gulp.src([
    './src/**/*',
    '!./src/**/*.js',
    '!./src/**/*.jsx',
    '!./src/**/*.less',
    '!./src/**/*.scss',
    '!./src/**/*.sass',
    '!./src/**/*.css',
    ]).pipe(gulp.dest('./lib/'));
});

gulp.task('copy_assets', function() {
  var base = "./src/assets/";
  return gulp.src(base + '*.{eot,woff,woff2,ttf,svg,png,jpg,gif}')
    .pipe(gulp.dest('./assets/'));
});

gulp.task('css', function() {
  var through2 = require('through2');
  var base = "./src/assets/"
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');
  var combiner = require('stream-combiner2');


  var rename = require('gulp-rename');
  var combined = combiner.obj([
    gulp.src(base + '*.scss'),
    postcss([ require('precss')() ]),
    rename(function(p) {
      p.extname = ".css";
    }),
    gulp.dest('./assets/'),
  ]);



  combined.on('error', console.error.bind(console));
  return combined;
});

gulp.task('css:watch', function () {
      gulp.watch('./src/assets/**', ['css']);
});

gulp.task('babel', ['clean'], function () {
  return gulp.src(['src/**.js',  'src/**/*.js', 'src/**.jsx', 'src/**/*.jsx'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('compile', ['copy', 'copy_assets', 'babel', 'css', 'build']);

gulp.task('publish', ['compile'], function (done) {
  var npm = 'npm ';
  <#$$ mnpm $$>
  // have to include $HOME path
  npm = 'npm --registry=http://r.npm.sankuai.com --cache=$HOME/.npm/.cache/mnpm --userconfig=$HOME/.mnpmrc ';
  </$$ mnpm $$>
  shelljs.exec(npm + ' publish', function () {
    clean();
    done();
  });
});

gulp.task('server', function () {
  rtCore.server({
    dir: 'examples',
    host: 'http://localhost',
    port: 3001
  });
  return;
});

gulp.task('build', ['css'] , function() { rtCore.build({}); });

gulp.task('start', ['server', 'css', 'css:watch']);

gulp.task('pub', ['publish']);
