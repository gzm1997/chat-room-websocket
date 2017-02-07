var app = require('express')();
var express = require("express");
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//server监听在8000端口
server.listen(8000);
//引入js， css等静态文件
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/websocket.html');//引入主页的html文件
});
//声明存储聊天者的数组
var userslist = new Array()
//监听websocket连接使事件
io.sockets.on('connection', function (socket) {
	//声明聊天者昵称
	var User = "";
	//默认加入talk聊天室
	socket.join("talk");
	//监听systemIn事件，有新的用户加入聊天
	socket.on("systemIn", function(data) {
		io.sockets.in("talk").emit('return', "系统消息：" + data + "加入聊天");
		User = data;
		userslist[userslist.length++] = data;
	})
	//监听allUsers事件，把所有在线聊天用户的昵称反馈给每个客户端
	socket.on("allUsers", function(data) {
		io.sockets.in("talk").emit('returnUsers', userslist);
	})
	//监听news事件，接受每个客户端发送过来的信息，并发送给全部的客户端
  	socket.on('news', function (data) {
    	console.log(data.user + ": " + data.message);
    	io.sockets.in("talk").emit('return', data.user + ": " + data.message);
  	});
  	//监听disconnect事件，当客户端断开之后，把用户昵称从用户数组中除名，并发送系统信息给每个客户端
  	socket.on("disconnect", function() {
  		userslist[userslist.indexOf(User)] = "";
  		if(User != "") io.sockets.in("talk").emit('return', "系统消息：" + User + "退出聊天");
  		io.sockets.in("talk").emit('returnUsers', userslist);
  	})
});

