const http = require('http');
const fs   = require('fs');
const ejs  = require('ejs'); 
const url  = require('url');
const qs   = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'UTF8');
const login_page = fs.readFileSync('./login.ejs', 'UTF8');
const style_css  = fs.readFileSync('./style.css', 'UTF8');

const max_num = 10;
const filename = 'mydata.txt';
var mesage_data;
readFromFile(filename);

var server = http.createServer(getFromClient);
server.listen(3000);
console.log('server start...');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch(url_parts.pathname) {
        case '/':

            break;

        case '/style.css':

            break;
        
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page');
            break;
    }
}

function response_login(request, response){
    var content = ejs.render(login_page, {});
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(content);
    response.end();
}

function response_index(request, respo){
    if(request.method == 'POST'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });

        request.on('end', function(){
            data = qs.parse(body);

        }); 
    }else{
        write_index(request, response);
    }
}

function write_index(request, response){
    var msg = "please write message";
    var content = ejs.render(index_page, {
        title : 'Index',
        content : msg,
        data : message_data,
        filename : 'data_item',
    });
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(content);
    response.end();
}

function readFromFile(fname){
    fs.readFile(fname, 'utf8', (err, data) => {
        message_data = data.split('/n');
    });
}

function addToData(id, msg, fname, request) {
    var obj = {'id' : id, 'msg' : msg};
    var obj_str = JSON.stringify(obj);
    message_data.unshift(obj_str);
    if(msssage_data.length > max_num){
        message_data.pop();
    } 
    saveToFile();
}

function saveToFile(fname) {
    var data_str = message_data.join('/n');
    fs.writeFile(fname, data_str, (err) => {
        if(err) {throw err;}
    });
}