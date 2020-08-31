const net = require('net');

// server config
const serverConfig = {
    port: 23912,
    host: 'localhost',
};

// 기본적인 tcp socket 기능을 확인한다.
const client = new net.Socket();
client.setTimeout(500); // 정확한 기능 확인 필요...
client.setEncoding('utf-8');

// set socket connect handler.
const connectHandler = () => {
    console.log('client-> connected to server', this);

    // set stdin
    process.stdin.resume();
    process.stdin.on('data', (data) => {
        client.write(data);
        if (data.toString() === 'close') {
            console.log('sss');
            client.destroy();
        }
    });

    // data from server.
    client.on('data', (data) => {
        console.log('server-> ' + data);
    });

    // set socket close events
    client.on('close', () => {
        console.log('client-> connection is closed');
    });

    client.on('end', () => {
        console.log('client-> connection is end');
    });

    client.on('timeout', () => {
        console.log('client-> connection is timeout');
    });
};

// connect to server
client.connect(serverConfig, connectHandler);
