var Hapi = require('hapi');
var sources = require("./sources/");

var server = new Hapi.Server();
server.connection({ port: 3000, labels: ['api'] });
sources.populate(server);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
