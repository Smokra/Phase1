const { helpers } = require('./helpers');

const syncConfig = require('./.sync.json');

// Start static server
function syncStart(cb) {
  if (global.config.sync.run) {
    let thisConfig = {};

    if (syncConfig.proxy) {
      thisConfig = {
        ...syncConfig,
        proxy: syncConfig.proxy,
      };
    } else {
      const thisServer = syncConfig.server.baseDir
        ? helpers.parse(syncConfig.server.baseDir)
        : ({
          ...syncConfig.server,
          baseDir: helpers.dist(),
        });

      thisConfig = {
        ...syncConfig,
        server: thisServer,
      };
    }

    global.bs.init(thisConfig);
  }

  cb();
}

// Stop static server
function syncStop(cb) {
  global.bs.exit();

  cb();
}

exports.sync = {
  syncStart,
  syncStop,
};
