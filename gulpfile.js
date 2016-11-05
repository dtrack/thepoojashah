var concat = require('gulp-concat');
var gulp = require('gulp');
var pump = require('pump');
var uglify = require('gulp-uglify');

gulp.task('compress', function (cb) {
  pump([
        gulp.src([
          // jquery need to be first
          './js/vendor/jquery-2.1.4.min.js',
          './js/vendor/isotope.pkgd.min.js',
          './js/vendor/jquery.animsition.min.js',
          './js/vendor/jquery.magnific-popup.min.js',
          './js/vendor/wow.min.js',
          './js/vendor/idangerous.swiper.min.js',
          './js/vendor/all.js',
          './js/*.js'
        ]),
        concat('all.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('to-github-pages', function (cb) {
  pump([
      git.add('dist'),
      git.commit('Adding dist js path'),
      git.push('origin'),
      git.checkout('gh-pages'),
      git.pull('origin', 'gh-pages', {args: '--rebase'})
      git.merge(master, {args: '--no-commit --no-ff'})
      git.push(origin, 'gh-pages')
    ], cb
  );
});


gulp.task('release', function (cb) {
  runSequence(
    'compress',
    'to-github-pages';
  );
});
