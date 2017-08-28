$(function() {
	$("#add_notebook").click(showAddBookWindow);
	
	$("#can").on("click", "#cancle_addbook", function() {
		$("#can").hide();
		$('.opacity_bg').hide();
	});
	
	$("#can").on("click", "#close_addbook", function() {
		$("#can").hide();
		$('.opacity_bg').hide();
	});
	
	
	$("#can").on("click", "#create_addbook", function() {
		
		var addBook = new AddBook();
		
		$.ajax({
			url : "notebook/addbook.json",
			type : "post",
			contentType : "application/json; charset=utf-8",
			data: JSON.stringify(addBook),
			dataType : "json",
			success : function(result) {
				if(result.status == "0") {
					
					$new_bookli = $('<li class="online"><a>' + 
							'<i class="fa fa-book" title="online" rel="tooltip-bottom" style="float:left; line-height:32px;"></i><font style="float:left">' + 
							addBook.cn_notebook_name + '</font><span class="fa fa-times" style="float:right; position:relative; cursor:pointer; font-size:16px; line-height:32px;" ' + 
							'title="删除"></span></a></li>');
					$new_bookli.find("span").click(deleteNoteBookAction);
					$new_bookli.data("bookId", result.data.bookId);
					$('#noteBookList li:eq(0)').after($new_bookli);
					
					$new_bookli.children("a").click(clickNoteBookAction);
					
					$("#can").hide();
					$('.opacity_bg').hide();
				} else {
					alert("创建失败");
				}
			},
			error : function() {
				alert('创建请求出错！');
			}
		});
	});
});

function AddBook() {
	this.cn_notebook_name = $("#input_notebook").val();
	this.cn_user_id = getCookie("userId");
}

function showAddBookWindow() {
	$('#can').load('./alert/alert_notebook.html', function() {
		$('.opacity_bg').show();
		$('#can').show();
	});
}