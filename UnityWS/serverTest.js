//本番用

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8000
});
//-----------------------------
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');
const port = 3000;
var value01 = '0,0,0';
var value02 = '0,0,0';
var isAccept = true;

const index_page = fs.readFileSync('./indexTest.ejs', 'utf8');

var server = http.createServer((req, res) =>{

    //function getFromClient(req, res){
    //trueをつけることでqueryがきても対応できるようにする
    var route = url.parse(req.url, true);
    switch(route.pathname){
        case '/v1':
            //queryChecker(req, res, route);
            if(req.method == 'POST' || req.method == 'GET'){
                var query = route.query;
                if(query.msg != undefined){
                  isAccept = true;
                   if(value01 !== query.msg){
                       value01 = query.msg;
                       console.log("/v1 msg : "+query.msg);
                       console.log("/v1 value01 : "+ value01);
                       console.log("/v1 value02 : "+ value02);
                       wss.on('connection', function(ws) {
                           if(isAccept === true){
                               isAccept = false;
                               ws.send("value01=" + value01 + "," + "value02=" + value02);
                               console.log('value01:  ' + value01);
                           }
                       });
                   }else{
                       console.log('value01 : same');
                   }
                 }
              }
            break;
        
        case '/v2':
            //queryChecker(req, res, route);
            if(req.method == 'POST' || req.method == 'GET'){
                var query = route.query;
                if(query.msg != undefined){
                  isAccept = true;
                   if(value02 !== query.msg){
                    console.log("/v2 msg : "+query.msg);
                    console.log("/v2 value01 : "+ value01);
                    console.log("/v2 value02 : "+ value02);
                       value02 = query.msg;
                       wss.on('connection', function(ws) {
                           if(isAccept === true){
                               isAccept = false;
                               ws.send("value01=" + value01 + "," + "value02=" + value02);
                               console.log('value02:  ' + value02);
                           }
                       });
                   }else{
                       console.log('value02 : same');
                   }
                 }
              }
            break;
    }

    var cont = ejs.render(index_page, {
        content: value01,
        content02 : value02,
    });


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(cont);
    res.end();
});
    

server.listen(3000);
console.log('start server');
