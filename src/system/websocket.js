const ws = require('ws'); // websocket
const url = require('url'); // websocket

// websocket logic add.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, request) => {
    socket.on('message', (message) => console.log(message));
    socket.on('close', () => {
        console.log('websocket close');
    });
    socket.on('error', (err) => {
        console.log('websocket error ', err);
    });
});

const wsUpgrade = (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;
    // param checking...
    console.log(pathname);
    if (pathname === '/websocket') {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
            wsServer.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
};

module.exports.wsUpgrade = wsUpgrade;
