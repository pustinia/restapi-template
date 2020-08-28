const express = require('express');
const router = express.Router();
const logger = require('../system/logger');
// const socketClients = require('../test/socketServer');1112222222

/* GET users listing. */
router.get('/', function (req, res, next) {
    logger.info('12345');
    res.send('respond with a resource');
});

/* GET send message */
// voip tcpdump
// http://127.0.0.1:3002/users/customer1   => 특정 소켓에게 메시지 전달..
router.get('/:id', async (req, res, next) => {
    console.log('ID:', req.params.id);
    // const result = await socketClients.sendMsg(req.params.id, '메시지 전달');
    /*
    if (result === `200`) {
        res.send('respond with a resource');
    } else {
        res.send('socket send failed...');
    }*/
});

module.exports = router;
