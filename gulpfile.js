var concat = require('gulp-concat');
var git = require('gulp-git');
var gulp = require('gulp');
var pump = require('pump');
var runSequence = require('run-sequence');
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


gulp.task('git-add-dist', function () {
  gulp.src('dist').pipe(git.add());
});

gulp.task('git-commit-dist', function () {
  git.commit('Adding dist js path');
});

gulp.task('git-pull-rebase-current-branch', function () {
  git.revParse(
    {args:'--abbrev-ref HEAD'},
    function(err, branch) {
      git.pull('origin', branch, {args: '--rebase'});
    }
  );
});

gulp.task('git-push-current-branch', function () {
  git.revParse(
    {args:'--abbrev-ref HEAD'},
    function(err, branch) {
      git.push('origin', branch);
    }
  );
});

gulp.task('git-checkout-gh-pages', function () {
  git.checkout('gh-pages');
});

gulp.task('git-merge-master', function () {
  git.merge('master', {args: '--no-commit --no-ff'});
});

gulp.task('git-checkout-master', function () {
  git.checkout('master');
});


gulp.task('release', function (cb) {
  runSequence(
    'compress',
    'git-add-dist',
    'git-commit-dist',
    'git-pull-rebase-current-branch',
    'git-push-current-branch',
    'git-checkout-gh-pages',
    'git-merge-master',
    'git-pull-rebase-current-branch',
    'git-push-current-branch',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    }
  );
});
