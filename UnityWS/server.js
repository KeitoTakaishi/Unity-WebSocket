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
var temp = '';
var num = 0;
function getFromClient(req, res){
    //trueをつけることでqueryがきても対応できるようにする
    var rute = url.parse(req.url, true);
    switch(rute.pathname){
        case '/':
        num = 0;
            if(req.method == 'POST' || req.method == 'GET'){
                console.log('-- case / --' + 'num = ' + num );
                var query = rute.query;
                var msg = query.msg;
                if(msg != undefined){
                    
                    //wssははじめにコネクトしたリクエストに依存してコネクトされる
                     if(temp !== msg){
                         console.log("query"+msg);
                         wss.on('connection', function(ws) {
                             if(num === 0){
                                 //console.log('WS-Connect-Suc!');
                                 ws.send(temp);
                                 console.log('temp:  ' + temp);
                                 console.log('query.msg:  ' + msg); 
                                 num = 1;
                             }
                         });
                         temp = msg;
                     }else{
                         console.log('same');
                     }
                }

                req.on('data', function(chunk){
                    //body += chunk;
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
