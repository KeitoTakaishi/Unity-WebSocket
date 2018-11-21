const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css  = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('server start...');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch(url_parts.pathname){
        
        case '/':
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;
        
        case '/style.css':
            response.writeHead(200, {'Content-Type' : 'text/css'});
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, {'Content-Type' : 'text/plain'});
            response.end('no page...');
            break;
    }
    function response_index(request, response){

        var data = {
            'id01': '0000-0000-0001',
            'id02': '0000-0000-0002',
            'id03': '0000-0000-0003',
            'id04': '0000-0000-0004',
        };
        
        var msg = "これはIndexページです．";
        var content = ejs.render(index_page, {
            title:"Index",
            content:msg, 
            data:data,
        });
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(content);
        response.end();
    }

    function response_other(request, response){
        var msg = "これはOtherページです";
        console.log(request.method);
        if(request.method == 'POST'){
            var body = '';
            request.on('data', (data) => {
                body += data;
            });

            //data受信終了後
            request.on('end',() =>{
                var post_data = qs.parse(body);//encode
                msg += 'あなたは『' + post_data.msg + '』と書きました';
                var content = ejs.render(other_page, {
                    title : "Other",
                    content : msg,
                });
                response.writeHead(200, {'Content-Type' : 'text/html'});
                response.write(content);
                response.end();
            });
        }else{
             var msg = "ページがありません";
             var content = ejs.render(other_page, {
                title:"other",
                content:content, 
             });
                response.writeHead(200, {'Content-Type' : 'text/html'});
                response.write(content);
                response.end();
        }
    }
}