function moveNoteToTrash($li) {
	var noteId = $li.data("noteId");
	$.ajax({
		url : "note/movetotrash.json",
		type : "post",
		data : {
			"noteId" : noteId
		},
		dataType : "json",
		success : function(result) {
			if (result.status == "0") {
				var noteName = $li.find("a span").text();
				var bookId = $li.parent().data("bookId");

				$li.remove();
				alert("笔记删除成功！可在回收站内查看");

				if ($('#myEditor').data("noteId") == noteId) {
					clearAndCloseEditDiv();
				}

				// 回收站栏增加该笔记
				$("#empty_trash").remove();
				addTrashedNote(noteId, noteName, bookId);
			}
		},
		error : function() {
			alert("删除请求出错！");
		}
	});
}

function addTrashedNote(noteId, noteName, bookId) {
	var $li = $('<li class="disable"><a><i class="fa fa-file-text-o"'
			+ 'title="online" rel="tooltip-bottom"></i>' + noteName
			+ '<button type="button" title="彻底删除"'
			+ 'class="btn btn-default btn-xs btn_position btn_delete">'
			+ '<i class="fa fa-times"></i>' + '</button>'
			+ '<button type="button" title="恢复笔记"'
			+ 'class="btn btn-default btn-xs btn_position_2 btn_replay">'
			+ '<i class="fa fa-reply"></i>' + '</button></a></li>');

	$li.data("noteId", noteId);
	$li.data("bookId", bookId);

	bindTrashedLiAction($li);

	$('#trashed_note_list').prepend($li);
	$li.find("a").addClass("checked").parent().siblings().children("a").removeClass("checked");
}