var express = require('express');
//var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//app.set("view engine", 'ejs');

/*
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public'))); //static폴더 세팅

app.start = app.listen = app.aaa = function(){
  return server.listen.apply(server, arguments);
}

app.aaa(app.get('port'), function(){
  console.log("server start");
});
*/
app.get("/", function(req, res){
  res.sendfile("public/main.html");
});

app.get("/randomchat", function(req, res){
  res.sendfile("public/randomchat.html");
});

var count =1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name', name);

/*
  socket.on('random_request', function(){
    console.log('request to make Random chat');

    var rooms = io.sockets.manager.rooms;
         for (var key in rooms){
             if (key == ''){
                 continue;
             }

             if (rooms[key].length == 1){
                 var roomKey = key.replace('/', '');
                 socket.join(roomKey);
                 io.sockets.in(roomKey).emit('completeMatch', {});
                 socketRoom[socket.id] = roomKey;
                 return;
             }
         }

         socket.join(socket.id);
         socketRoom[socket.id] = socket.id;
/*
    socket.join(data.roomname);
    socket.set('room', data.roomname);
    socket.set('username', data.username);

  });
*/
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
    io.emit('disconnected', name);
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : '+ text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});

server.listen('3000', function(){
  console.log("server on");
});
