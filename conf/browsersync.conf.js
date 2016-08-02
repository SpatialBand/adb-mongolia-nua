const conf = require('./gulp.conf');

module.exports = function () {
  return {
    port: 7878,
    ui: {
      port: 7879
    },
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false
  };
};
