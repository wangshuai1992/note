$(function() {
	$('#login').click(function() {
		var $name_error = $("#name_error");
		var $password_error = $("#password_error");

		$name_error.html("");
		$password_error.html("");

		var name = $("#count").val().trim();
		var password = $("#password").val();

		if (name == "") {
			$name_error.text("请输入用户名");
			return;
		}
		if (password == "") {
			$password_error.text("请输入密码");
			return;
		}

		$.ajax({
			url : "user/login.json",
			type : "post",
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Base " + Base64.encode(JSON.stringify(new LoginUser())));
			},
			success : function(result) {
				if (result.status == 0) {
					var token = result.data.token;
					var userId = result.data.userId;
					var userName = result.data.userName;

					addCookie("token", token, 2);
					addCookie("userId", userId, 2);
					addCookie("userName", userName, 2);

					window.location.href = "edit.html";
				} else if (result.status == 1) {
					$name_error.html(result.msg);
				} else if (result.status == 2) {
					$password_error.html(result.msg);
				}
			},
			error : function() {
				alert('登录请求出错！');
			}
		});
	});
});

function LoginUser() {
	this.cn_user_name = $('#count').val();
	this.cn_user_password = $('#password').val();
}