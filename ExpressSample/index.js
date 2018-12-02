var express = require('express');
var ejs = require("ejs");

var app = express();

app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', (req, res) => {
    var msg = 'This is Top Page!<br>'
    + 'これは，トップページです';
    var url = '/other?name=keito&pass=ncis';
    res.render('index.ejs',
    {
        title : 'Index',
        content : msg,
        //link:{href:url, text:'*別のページに移動'}
    });
});

app.post('/', (req, res) =>{
    var msg = req.body.message;

    res.render('index.ejs',
    {
        title : 'Posted',
        content : msg,
    });
});

app.get("/other", (req, res) =>{
    var name = req.query.name;
    var pass = req.query.pass;
    var msg = 'name: ' + name + 'pass: ' + pass;     

    res.render('index.ejs',
    {
        title : 'other',
        content : msg,
        link : {href:'/', text:'トップに戻る'}
    });
});

var server = app.listen(3000, () => {
    console.log('Start server port3000');
})