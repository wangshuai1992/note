
function validOldPwd(lpassword) {
	var isCorrect = false;
	
	$.ajax({
		url: "user/validpwd.json",
		type: "post",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(new ValPwd(lpassword)),
		dataType: "json",
		async: false,
		success: function(result) {
			if(result.status == "0") {
				isCorrect = true;
			}
		},
		error: function() {
			alert('密码验证请求出错！');
		}
	});
	
	return isCorrect;
}

function ValPwd(lpassword) {
	this.cn_user_id = getCookie("userId");
	this.cn_user_password = lpassword;
}

function changepwd() {
	var newpwd = $("#new_password").val();
	var userId = getCookie("userId");
	
	$.ajax({
		url: "user/changepwd.json",
		type: "post",
		data: {"newpwd":newpwd, "userId":userId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				alert("密码修改成功！");
				delCookie("userId");
				delCookie("token");
				delCookie("userName");
				location.href = "log_in.html";
			}
		},
		error: function() {
			alert("修改密码请求发送错误！");
		}
	});
}