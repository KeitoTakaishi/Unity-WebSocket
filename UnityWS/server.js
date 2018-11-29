var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8080
});
var mes;
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send(message);
        mes = message;
    });
    ws.send('mes : '+ mes);
});
