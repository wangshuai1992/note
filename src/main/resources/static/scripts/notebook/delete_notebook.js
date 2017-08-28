function setDeleteButton() {
	$("#noteBookList li span").click(deleteNoteBookAction);
}

function deleteNoteBookAction(e) {
	var $obj = $(e.target);
	var $li = $obj.parent().parent();
	if(confirm("确认删除笔记本？该笔记本下的所有笔记将被删除")) {
		var bookId = $li.data("bookId");
		$.ajax({
			url: "notebook/delete.json",
			type: "post",
			data: {"bookId":bookId},
			dataType: "json",
			success: function(result) {
				if(result.status == "0") {
//					alert("删除成功！");
					$li.remove();
				}
			},
			error: function() {
				alert("删除笔记本请求失败！")
			}
		});
	}
	e.stopPropagation();
}