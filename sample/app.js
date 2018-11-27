const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('server start');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    
    switch(url_parts.pathname){
        case '/':
            response_index(request, response);
            break;
            
        case '/style.css':
            response.writeHead(200, {'Content-Type' : 'text/css'});
            response.write(style_css);
            response.end();
            break;

        case '/other':
            response_other(request, response);
            break;
        
        default:
            response.writeHead(200, {'Content-Type' : 'text/css'});
            response.end('no-page');
            break;
    }
}
    var data = {
        'Taro' : '09-999-999',
        'Hanako' : '080-9807',
        'Sachiko' : '09-124-999',
        'Ichiko' : '09-999-436',
    };

    var data = {msg : 'no message'};
    function response_index(request, response){
        if(request.method == 'POST'){
            var body = '';

            request.on('data', (data) => {
                body += data;
            });

            request.on('end', () => {
                data = qs.parse(body);
                console.log(body);
                setCookie('msg', data.msg, response);
                write_index(request, response);
            });
        }else{
            write_index(request, response);
        }
    }

    var data2 = {
        'Taro' : ['test1', '123', 'City'],
        'Hanako' : ['test2', '123', 'City'],
        'Sachiko' : ['test3', '123', 'City'],
        'Ichiko' : ['test4', '123', 'City'],
    }

    function response_other(request, response){
        var msg = 'これはOtherページです';
        // if(request.method == 'POST'){
        //     var body = '';
            
        //     request.on('data', (data) => {
        //         body += data;
        //     });

        //     request.on('end', () => {
        //         var post_data = qs.parse(body);
        //         msg += "あなたのメッセージは" + post_data.msg;
        //         var content = ejs.render(other_page, {
        //             title: "Other",
        //             content: msg, 
        //             data : data2,
        //             filename : 'data_item'
        //         });
        //         response.writeHead(200, {'Content-Type' : 'text/html'});
        //         response.write(content);
        //         response.end();
        //     });
        // }else{
        //     var msg = "ページがありません";
        //     var content = ejs.render(other_page, {
        //         title: "Other",
        //         content: msg,  
        //     });
        //     response.writeHead(200, {'Content-Type' : 'text/html'});
        //     response.write(content);
        //     response.end();
        // }
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg, 
            data : data2,
            filename : 'data_item'
        });
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(content);
    }

    function write_index(request, response){
        var msg = "伝言を表示します";
        var cookie_date = getCookie('msg', request);
        var content = ejs.render(index_page, {
            title : "Index",
            content: msg,
            data:data,
            cookie_data:cookie_date,
        });
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(content);
        response.end();
    }

    function setCookie(key, value, response){
        var cookie = escape(value);
        response.setHeader('Set-Cookie', [key + '=' + cookie]);
    }

    function getCookie(key, request){
        var cookie_data = request.headers.cookie != undefined ?
        request.headers.cookie : '';
        var data = cookie_data.split(';');
        for(var i in data){
            if(data[i].trim().startsWith(key + '=')){
                var result = data[i].trim().substring(key.length + 1);
                return unescape(result);
            }
        }
        return '';
    }