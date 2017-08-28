$(function() {
	$("#logout").click(logout);
});

function logout() {
	delCookie("userId");
	delCookie("token");
	delCookie("userName");
}