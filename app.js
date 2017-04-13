var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public')); //static폴더 세팅


app.listen(8000, function(){
  console.log('Server On!');
});
