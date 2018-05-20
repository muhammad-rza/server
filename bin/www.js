require('dotenv').config();

var app = require('../app');

var http = require('http');



var {cmd_color} = require('../lib/cmd_color');

var server = http.createServer(app);
var NODE_ENV = process.env.NODE_ENV;



server.listen(APP_INIT.APP_PORT);
server.on('error', onError);
server.on('listening', onListening);





// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.write('Hello World!');
//     res.end();
// }).listen(8080);

// server.on('error', onError);
// server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof APP_INIT.APP_PORT === 'string'
        ? 'Pipe ' + APP_INIT.APP_PORT
        : 'Port ' + APP_INIT.APP_PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(cmd_color('FgGreen') , bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(cmd_color('FgGreen'),bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


function onListening() {

    console.log(cmd_color('FgGreen'), ` Listening PORT : ${APP_INIT.APP_PORT} ( ${process.env.NODE_ENV} )`)
    // console.log(APP_INIT)


}


