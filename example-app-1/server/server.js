var config = require('./server-config'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);

//config server
app.use(express.static(config.static_site_root));

//fire it up
server.listen(config.port, function () {
    console.log('Server root is ', config.static_site_root)
    console.log("Express server is listening on port %d", config.port);
});