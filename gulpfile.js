const env = require('gulp-env');
const runSequence = require('run-sequence');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const SecureKeys = require('secure-keys');
const gutil = require('gulp-util');
const envFile = require('node-env-file');
const gulp = require('./gulp')([
  'aws',
  'archie',
  'build',
  'dev',
  'data',
  'data-watch',
  'dist',
  'html',
  'img',
  'img-watch',
  
]);

/* Add secure keys to environment */
envFile(path.join(__dirname, '.env'), { overwrite: true }); // Adds PASSPHRASE to env
const secure = new SecureKeys({ secret: process.env.PASSPHRASE });
const keysPath = path.join(os.homedir(), '.euirim/interactives.json');
const keysObj = fs.readJsonSync(keysPath);
try {
  env.set(secure.decrypt(keysObj));
} catch (e) {
  gutil.log(
    gutil.colors.bgRed('PASSPHRASE ERROR:'),
    'Could not validate keys. Correct PASSPHRASE in .env or run',
    gutil.colors.cyan('yo euirim-projects:passphrase'),
    'to creare a new key set.'
  );
  gutil.log(e);
  // Exit process if keys don't validate
  process.exit();
}


gulp.task('default', ['dev', 'img-watch', 'data-watch']);

gulp.task('render', (cb) => {
  runSequence('html', 'img', 'data', 'build', cb);
});

gulp.task('preview', (cb) => {
  runSequence('render', 'dist', cb);
});

gulp.task('publish', (cb) => {
  runSequence('render', 'aws', cb);
});
