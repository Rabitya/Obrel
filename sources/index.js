var fs = require('fs');

var populate = function(server) {
  var sources = [];
  var modules = [];
  var modules_dir = null;

  try {
    modules = fs.readdirSync(__dirname + '/node_modules');
    modules_dir = __dirname + '/node_modules';
  } catch (ex) {
    modules = fs.readdirSync(__dirname + '/../node_modules');
    modules_dir = __dirname + '/node_modules';
  }

  modules.forEach(function(module) {
    if (module.indexOf('obrel-') == 0) {
      console.log('Loading: ', module);
      
      var settings = {};
      
      if (fs.existsSync(modules_dir + '.settings.json')) {
        settings = require(modules_dir + '.settings.json');
      }
      
      if (fs.existsSync(modules_dir + '/index.js')) {
        var routeSettings = {};

        if (settings.prefix) {
          routeSettings.prefix = settings.prefix;
        }

        server.register({
          register: require(dir),
          options: {}
        }, {
          select: ['api'],
          routes: routeSettings
        }, function(err) {
          if (err) {
            console.log('Error registering sources ' + dir, err);
          }
        });
      }
    }
  });

  for (var i in dirs) {
    var dir = __dirname + '/' + dirs[i];
    var settings = {};

    if (fs.existsSync(dir + '.settings.json')) {
      settings = require(dir + '.settings.json');
    }

    if (fs.existsSync(dir + '/index.js')) {
      var routeSettings = {};

      if (settings.prefix) {
        routeSettings.prefix = settings.prefix;
      }

      server.register({
        register: require(dir),
        options: {}
      }, {
        select: ['api'],
        routes: routeSettings
      }, function(err) {
        if (err) {
          console.log('Error registering sources ' + dir, err);
        }
      });
    }
  }
}

exports.populate = populate;