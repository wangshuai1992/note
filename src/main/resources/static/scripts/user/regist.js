$(function() {
	$('#regist_button').click(function() {
		$(":text").blur();
		$(":password").blur();
		
		if($("#warning_2").get(0).style.display == "block" || $("#warning_3").get(0).style.display == "block" ||
				$("#warning_1").get(0).style.display == "block" || $("#warning_desc").get(0).style.display == "block" ) {
			return;
		}
		
		$.ajax({
			url : "user/regist.json",
			type : "post",
			data : JSON.stringify(new RegistUser()),
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function(result) {
				if(result.status == "1") {
					$("#warning_1").html("<span>" + result.msg + "</span>").show();
				}
				if(result.status == "0") {
					alert("恭喜您，注册成功！");
					$(":text").val("");
					$(":password").val("");
					$("#warning_1").html("<span>该用户名不可用</span>");
					$(".warning").hide();
					
					$("#back").click();
				}
			},
			error : function() {
				alert('注册请求失败！');
			}
		});
	});
});

function RegistUser() {
	this.cn_user_name = $('#regist_username').val();
	this.cn_user_desc = $('#nickname').val();
	this.cn_user_password = $('#regist_password').val();
}
