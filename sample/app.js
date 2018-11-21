const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./index.ejs', 'utf8');

var server = http.createServer(getFromClient);    
server.listen(3000);
console.log('server start.......');

function getFromClient(request, response){
    // fs.readFile('./app.html', 'UTF-8', 
    //     (error, data) => {
    //         var content = data.
    //         replace(/Dummy_title/g, 'タイトルです').
    //         replace(/Dummy_content/g, 'コンテンツです');
    //         response.writeHead(200, {'Content-Type' : 'text/html'});
    //         response.write(content);
    //         response.end();
    // });
    var content = ejs.render(index_page, {
        title:"Indexページ",
        content:"これはテンプレートエンジンを使ったサイト",
    });
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(content);
    response.end();
}