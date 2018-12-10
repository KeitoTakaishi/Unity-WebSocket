//test用server script
//本番用

//webSocket
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8000
});
//server
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');
const port = 3000;

var values = new Array("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", );

var isAccept = true;

const index_page = fs.readFileSync('./indexTest.ejs', 'utf8');

var server = http.createServer((req, res) =>{
    getDataFromQuery(req, res, values);
    //trueをつけることでqueryがきても対応できるようにする
    
    //htmlを整形
    var cont = ejs.render(index_page, {
        content1 : values[0],
        content2 : values[1],
        content3 : values[2],
        content4 : values[3],
        content5 : values[4],
        content6 : values[5],
        content7 : values[6],
        content8 : values[7],
        content9 : values[8],
        content10 : values[8],
        content11 : values[10],
        content12 : values[11],
        content13 : values[12],
        content14 : values[13],
        content15 : values[14],
        content16 : values[15],
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(cont);
    res.end();
});

function getDataFromQuery(req, res, value){
    if(req.method == 'GET'){
        let route = url.parse(req.url, true);
        let query = url.parse(req.url, true).query;
        let index = url.parse(req.url, true).pathname;
        index = index.replace("/v","") - 1;
        
        if(query.msg !== undefined){
            isAccept = true;
             if(value[index] !== query.msg){
                value[index] = query.msg;
                console.log(`${url.parse(req.url, true).pathname}`);   //reqのPath表示
                console.log(`${url.parse(req.url, true).pathname} msg : ${query.msg}`);
                
                 //unityとの通信
                 wss.on('connection', function(ws) {
                     if(isAccept === true){
                         isAccept = false;
                         ws.send("value01=" + values[0] + "," + "value02=" + values[1]);
                         //console.log('value01:  ' + v);
                     }
                 });
             }else{
                 console.log(`same data recieved`);
             }
        }else{
            console.log(`query.meg is not defined`);
        }
    }    
}
server.listen(3000);
console.log('start server');
