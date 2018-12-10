

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

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);
var temp = '';//for ws sending
var isAccept = true;
//var rute;

function getFromClient(req, res){
    //trueをつけることでqueryがきても対応できるようにする
    var route = url.parse(req.url, true);
    switch(route.pathname){
        case '/':
            queryChecker(req, res, route);
            var content = ejs.render(index_page, {
                content: temp,
            });
            res.writeHead(200, {'Content-Type': 'text/html'});
          	res.write(content);
          	res.end();
            break;
        
        case '/v2':
            queryChecker(req, res, route);
            var content = ejs.render(index_page, {
                content: temp,
            });
            res.writeHead(200, {'Content-Type': 'text/html'});
          	res.write(content);
          	res.end();
            break;
            
        case '/v3':
        queryChecker(req, res, route);
        var content = ejs.render(index_page, {
            content: temp,
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(content);
            res.end();
            break;
	}
}

server.listen(3000);
console.log('start server');

function queryChecker(req, res, route){
  if(req.method == 'POST' || req.method == 'GET'){
      var query = route.query;
      if(query.msg != undefined){
        isAccept = true;
         if(temp !== query.msg){
             console.log("value : "+query.msg);
             wss.on('connection', function(ws) {
                 if(isAccept === true){
                     isAccept = false;
                     ws.send(temp);
                     console.log('value:  ' + temp);
                     // var r,g,b;
                     // var r = query.msg.split(',')[0];
                     // var g = query.msg.split(',')[1];
                     // var b = query.msg.split(',')[2];
                     // console.log('query.msg:  ' + r + g + b);
                 }
             });
             temp = query.msg;
         }else{
             console.log('value : same');
         }
       }
  }
}
