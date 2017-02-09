$(document).ready(function() {
	//保持信息栏滑至最低处
    function scrollToBottom() {
        $('.message').scrollTop($('.message')[0].scrollHeight);
    };
    //连接socket
	var socket = io.connect('http://localhost:8000');

	//输入昵称
	var username =  prompt('请输入昵称');
	username = username || "匿名";
	$(".name").text("昵称: " + username);
	//促发服务器的systemIn事件，发送系统信息：新用户加入聊天
	socket.emit('systemIn', username);
	//促发服务器的allUsers事件
	socket.emit('allUsers');
	//获取所有在线聊天用户
	socket.on("returnUsers", function(data) {
		$(".allUsers div").remove();
		for(var i = 0; i < data.length; i++) {
			if(data[i] != "") $(".allUsers").append($("<div>" + data[i] + "</div>"))
		}
	})
	//点击按钮发送信息
	$("#submit").click(function() {
		if($("#toSend").val() != "") {
			socket.emit('news', {user: username, message: $("#toSend").val()});
			scrollToBottom()
			$("#toSend").val("")
		}
	})
	//回车发送信息
	$("input").keydown(function(e) {
		if(e.which == 13 && $("#toSend").val() != "") {
			socket.emit('news', {user: username, message: $("#toSend").val()});
			scrollToBottom()
			$("#toSend").val("")
		}
	})
	//接受服务端发送的信息
	socket.on('return', function (data){
		var mes = $("<div>" + data + "</div>");
		if(data.substring(0, 4) == "系统消息") {
			mes.addClass("sysMessage");
		}
   		$(".message").append(mes);
	});
});
