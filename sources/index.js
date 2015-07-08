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
    modules_dir = __dirname + '/../node_modules';
  }

  modules.forEach(function(module) {
    if (module.indexOf('obrel-') == 0) {
      console.log('Loading: ', module);
      
      var settings = {};
      
      if (fs.existsSync(modules_dir + '.settings.json')) {
        settings = require(modules_dir + '.settings.json');
      }
      
      if (fs.existsSync(modules_dir + '/' + module + '/index.js')) {
        var routeSettings = {};

        if (settings.prefix) {
          routeSettings.prefix = settings.prefix;
        }

        server.register({
          register: require(module),
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
}

exports.populate = populate;