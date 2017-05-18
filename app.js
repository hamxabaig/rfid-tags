/*
 * Created by uzysjung on 16. 10. 9..
 */

'use strict';
const Hapi = require('hapi');
const Config = require('./config');
const mongoose = require('mongoose');
const serialport = require('serialport');
const server = new Hapi.Server();
const Co = require('co');

server.connection({port: Config.PORT, routes: {cors: true, jsonp: 'callback'}});

mongoose.connect('mongodb://localhost/wms').then(function (err) {
    if (err) {
        console.log('error connecting mongoose');
    }
});
const io = require('socket.io')(server.listener);

var port = new serialport('/dev/ttyACM0', {
    baudRate: 9600,
    parser: serialport.parsers.readline("\n")
});

io.on('connection', function (socket) {
   socket.on('issueWeapon', function () {
       port.write('YES');
   });
    socket.on('enroll_ack', function (socket) {
        console.log('ok');
        port.write('ACK Enroll');
    });
});

port.on('open', function () {
    console.log('opened');
});
port.on('data', function (data) {
    console.log(data == 'Enroll BioSen?', data);
    console.log(data.indexOf('{ RF'));
    if (data == 'Enroll BioSen?\r') {
        console.log('enrolling');
        io.emit('enrolling', '');
    } else if (data.indexOf('{ RFID') >= 0) {
        try {
            io.emit('broadcast', JSON.parse(data.replace('RFID', '"RFID"').replace('FingerID:', '"FingerID":"').replace('}', '"}')));
        } catch (e) {
            console.log('invalid parsing');
        }
    } else if (data.indexOf('{ FingerID') >= 0) {
        port.write('Enrolled');
        console.log('enroll com');
        io.emit('enrolled', data.replace('FingerID:', '"FingerID:"').replace('}', '"}'));
    }
    console.log('Data:============================ ' + data);

//     console.log('Data: ' + data);
//     io.emit('broadcast', 'Please confirm to issue weapon');
// });
});

Co(function*() {

    yield require('./server/plugins/hapi-pino')(server);
    yield [require('./server/plugins/inert')(server), require('./server/plugins/vision')(server)];
    yield require('./server/plugins/scooter')(server);
    yield require('./server/plugins/hapi-swagger')(server);
    yield require('./server/plugins/auth-jwt2')(server);

    if (process.env.API_ONLY === 'true' && Config.NODE_ENV === 'development') {
        console.log('[WARN] API_ONLY SERVER');
    } else {
        if (Config.NODE_ENV === 'development') {
            yield require('./server/plugins/hapi-webpack')(server);
        }
        yield require('./server/plugins/react-settings')(server);
    }

    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {auth: false, handler: {directory: {path: './public', redirectToSlash: true}}}
    });
    server.route(require('./server/routes/api'));
    server.route(require('./server/routes/user'));


    server.start((err) => {

        if (err) {
            server.log(['error', 'server'], 'Server Error Occured' + err);
            process.exit();
        }
        server.log(['info', 'server'], 'Server environment: ' + Config.NODE_ENV);
        server.log(['info', 'server'], 'Server running at: ' + server.info.uri);
    });


}).catch((e) => {

    server.log('app.js error:', e);
    server.log('stack - ', e.stack);
});

process.on('SIGINT', () => {

    // My process has received a SIGINT signal
    // Meaning PM2 is now trying to stop the process
    server.stop({timeout: 1000}, (err) => {

        if (err) {
            console.error(err);
        }
        server.log('Colloseo Hapi server stopped');
        process.exit();
    });
});


module.exports = exports = server;
