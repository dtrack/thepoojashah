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

gulp.task('commit-to-gh-pages', function () {
  git.revParse({args:'--abbrev-ref HEAD'}, function(err, branchName) {
    // commit dist
    gulp.src('dist')
      .pipe(git.add())
      .pipe(git.commit('Adding dist js path'))
      // pull rebase and push
      .pipe(git.pull('origin', branchName, {args: '--rebase'}))
      .pipe(git.push('origin', branchName))
      // checkout gh pages and merge branch
      .pipe(git.checkout('gh-pages'))
      .pipe(git.merge(branchName, {args: '--no-commit --no-ff'}))
      // pull rebase and push
      .pipe(git.pull('origin', 'gh-pages', {args: '--rebase'}))
      .pipe(git.push('origin', 'gh-pages'))
      // back to branchName
      .pipe(git.checkout(branchName));
  });
});


gulp.task('release', function (cb) {
  runSequence(
    'compress',
    'commit-to-gh-pages',
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
