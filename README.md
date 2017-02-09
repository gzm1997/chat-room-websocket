# websocket实现即时通讯

------


### 使用方法（前提是安装了node）：

本地使用：下载本项目到本地，解压，进入项目目录，输入npm install,等待安装完成，输入npm start,在浏览器中打开localhost:8000

服务器使用：
在public的socket.js文件中找到以下代码：

    var socket = io.connect('http://localhost:8000');

把上面的localhost改为你服务器的ip地址即可(ip访问情况下改为ip地址，域名访问改为你的域名，但是注意 https://yourdomain *  访问目前是不行的,需要是http，原因恐怕就是io.connect('http://localhost:8000') 里面使用的是http)，剩下的跟本地操作无异

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
    
客户端触发服务端的systemIn事件：

    socket.emit('systemIn', username);
    
服务端监听systemIn事件：

    socket.on("systemIn", function(data) {
		//
	})
	
不管是服务器还是客户端，socket.io提供两个核心方法：emit方法用于发送消息，on方法用于监听对方发送的消息。以此类推，其他不赘言。

##demo
最后奉上本次的demo地址：[聊天室][1]


  
  ![用户1][2]

![用户2][3]

![匿名用户3][4]


  [1]: http://www.gzm1997.cn
  [2]: https://github.com/15331094/talk_room_websocket/blob/master/screenshot/filehelper_1486444620706_23.png?raw=true
  [3]: https://github.com/15331094/talk_room_websocket/blob/master/screenshot/filehelper_1486444611812_76.png?raw=true
  [4]: https://github.com/15331094/talk_room_websocket/blob/master/screenshot/filehelper_1486444580073_52.png?raw=true
