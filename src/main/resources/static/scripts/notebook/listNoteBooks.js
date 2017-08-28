function loadBookList() {
	$('#noteBookList').empty();
	var data = JSON.stringify(new user());
	
	$.ajax({
		url : "notebook/loadlist.json",
		type : "post",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		data: data,
		success : function(result) {
			if(result.status == "0") {
				var list = eval(result.data);
				for(var i=0; i<list.length; i++) {
					var item = list[i];
					
					var $book_li = $('<li class="online"><a>' + 
							'<i class="fa fa-book" title="online" rel="tooltip-bottom" style="float:left; line-height:32px;"></i><font style="float:left">' + 
							item.cn_notebook_name + '</font><span class="fa fa-times" style="float:right; position:relative; cursor:pointer; font-size:16px; line-height:32px;" ' + 
							'title="删除" "></span></a></li>');
					
					$book_li.data("bookId", item.cn_notebook_id);
					if(item.cn_notebook_name == "默认笔记本") {
						$('#noteBookList').prepend($book_li);
					} else {
						$('#noteBookList').append($book_li);
					}
				}
				setDeleteButton();
				
				$('#noteBookList li a').click(clickNoteBookAction);
				
				$("#noteBookList li:eq(0) a").click();
			}
		},
		error : function() {
			alert('notebook列表加载请求出错！');
		}
	});
}

function user() {	
	this.cn_user_id = getCookie("userId");
}

function clickNoteBookAction(e) {
	$obj = $(this);
	$obj.addClass("checked").parent().siblings().children("a").removeClass("checked");
	showNotes($obj.parent().data("bookId"));
}