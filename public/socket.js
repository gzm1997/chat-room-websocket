$(document).ready(function() {
	var socket = io.connect('http://localhost:8000');


	var username =  prompt('请输入昵称');
	username = username || "匿名";
	$(".name").text("昵称: " + username);

	socket.emit('system', username);


	$("#submit").click(function() {
		if($("#toSend").val() != "") {
			socket.emit('news', {user: username, message: $("#toSend").val()});
		}
	})
	$("input").keydown(function(e) {
		if(e.which == 13 && $("#toSend").val() != "") {
			socket.emit('news', {user: username, message: $("#toSend").val()});
		}
	})
	socket.on('return', function (data){
   		$(".message").append($("<div>" + data + "</div>"));
   		$("#toSend").val("")
	});
});