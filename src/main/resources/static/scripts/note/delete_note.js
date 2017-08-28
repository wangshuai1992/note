function deleteNote($li) {
	var noteId = $li.data("noteId");
	
	$.ajax({
		url: "note/deletenote.json",
		type: "post",
		data: {"noteId": noteId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				alert("删除成功");
				$li.remove();
				checkEmptyTrash();
			}
		},
		error: function() {
			alert("删除请求失败！");
		}
	});
}