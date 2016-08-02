const conf = require('./gulp.conf');

module.exports = function () {
  return {
    port: 7880,
    ui: {
      port: 7881
    },
    server: {
      baseDir: [
        conf.paths.dist
      ]
    },
    open: false
  };
};
