var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var fs = require('fs');

var paths = {
  scripts: ['site.js'],
  styles: ['style.scss'],
  images: 'img/**/*',
  jade: 'index.jade',
  resume: 'resume.json'
};

gulp.task('jade', function(cb) {
  var resume;

  fs.readFile(paths.resume, 'utf8', function (err, data) {
    if (err) throw err;
    try {
      resume = JSON.parse(data);
    } catch (e){
      console.log(e);
    }

    gulp.src(paths.jade)
      .pipe(plumber())
      .pipe(jade({
        locals: resume
      }))
      .pipe(gulp.dest('.'))
      .pipe(connect.reload());

    cb();
  });
});

gulp.task('styles', function () {
    gulp.src(paths.styles)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('.'))
      .pipe(connect.reload());
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    root: '.',
    livereload: true
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch([paths.jade, paths.resume], ['jade']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'jade', 'styles', 'scripts', 'connect']);
