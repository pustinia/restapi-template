const net = require('net');

// client socket 들의 목록을 관리한다.
// 또는 event로 처리할 수도 있다.
const clientsMap = new Map();
const clientName = `customer1`;

// 기본적인 tcp socket 기능을 확인한다.
const server = net.createServer();

// 최초 connect시 수행되는 handler.
const connectionHandler = (conn) => {
    clientsMap.set(clientName, conn);
    // conn.write('hello-world');
    conn.on('data', (data) => {
        console.log(`from client ->${data}`);
    });
    conn.on('close', () => {
        console.log(`${clientName} client close`);
        clientsMap.delete(clientName);
    });
};

server.on('connection', connectionHandler);
server.on('close', () => {
    console.log('Server Terminated');
});
server.on('error', (err) => {
    console.log('Server Terminated');
});
server.listen(23912);

// 실시간 clients 수 확인, MDN 에서 Map 사용 확인 !!
setInterval(() => {
    server.getConnections((err, counts) => {
        console.log(`connection count => ${counts}, ${clientsMap.size}`);
    });
}, 3000);

// socket client에게 메시지 전달.
const sendMsg = async (clientName, message) => {
    const clientSocket = clientsMap.get(clientName);
    if (clientSocket && !clientSocket.destroyed) {
        await clientSocket.write(message);
        return `200`;
    } else {
        return `999`;
    }
};
module.exports.sendMsg = sendMsg;
