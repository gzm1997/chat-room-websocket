var app = require('express')();
var express = require("express");
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/websocket.html');
});

io.sockets.on('connection', function (socket) {
	socket.join("talk");

	socket.on("system", function(data) {
		io.sockets.in("talk").emit('return', "系统消息：" + data + "加入聊天");
	})
	
  	socket.on('news', function (data) {
    	console.log(data.user + ": " + data.message);
    	io.sockets.in("talk").emit('return', data.user + ": " + data.message);
  	});
});

