# websocket实现即时通讯

------


### 使用方法：

本地使用：下载本项目到本地，解压，进入项目目录，输入npm install,等待安装完成，输入npm start,在浏览器中打开localhost:8000

服务器使用：
在public的socket.js文件中找到一下代码：

    var socket = io.connect('http://localhost:8000');

把上面的localhost改为你服务器的ip地址即可，剩下的跟本地操作无异

------

## 核心
本项目的核心是**websocket协议**

websocket分**客户端**和**服务端**两部分，在本项目中，socket.js是客户端脚本，
server.js是服务端脚本。在本项目中使用了websocket的**socket.io**，这是
websocket很方便快捷的一种使用方式

客户端连接服务端：

    var socket = io.connect('http://localhost:8000');
    
服务端连接客户端：

    io.sockets.on('connection', function (socket) {
        //
    })
    
客户端促发服务端的systemIn事件：

    socket.emit('systemIn', username);
    
服务端监听systemIn事件：

    socket.on("systemIn", function(data) {
		//
	})
	
不管是服务器还是客户端，socket.io提供两个核心方法：emit方法用于发送消息，on方法用于监听对方发送的消息。以此类推，其他不赘言。
