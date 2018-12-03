var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8000
});

//-----------------------------
const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;
 
var server = http.createServer(getFromClient);

function getFromClient(req, res){
    //trueをつけることでqueryがきても対応できるようにする
    var rute = url.parse(req.url, true);
    switch(rute.pathname){
        case '/':
            var body = '';
            if(req.method == 'POST' || req.method == 'GET'){
                console.log('-- case / --');
                var query = rute.query;
                if(query.msg != undefined){
                    console.log(query.msg);
                    wss.on('connection', function(ws) {
                        console.log('WS-Connect-Suc!');
                        ws.send('recieve');
                        ws.send(query.msg);
                    });
                }

                req.on('data', function(chunk){
                    body += chunk;
                });
                req.on('end', function(){
                    
                    
                    res.end();
                });
            }
		break;
	}

    res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('suc!-from Node.js');
	res.end();
}

server.listen(3000);
console.log('start server');
