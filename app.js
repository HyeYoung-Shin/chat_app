var express = require('express');
var path = require('path');
var app = express();

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); //static폴더 세팅

var data={count:0};
app.get('/', function (req,res) {
    data.count++;
    res.render('firstejs', data);
});
app.get('/reset', function (req,res) {
    data.count=0;
    res.render('firstejs', data);
});
app.get('/set/count', function (req,res) {
    if(req.query.count) data.count = req.query.count;
    res.render('firstejs', data);
});

app.listen(8000, function(){
  console.log('Server On!');
});
