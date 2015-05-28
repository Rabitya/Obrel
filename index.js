var Hapi = require('hapi');
var sources = require("./sources/");

var server = new Hapi.Server();
server.connection({ port: 3000, labels: ['api'] });
sources.populate(server);

server.register({
    register: require('hapi-swagger'),
    options: {
        apiVersion: "1.0"
    }
}, function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }else{
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
