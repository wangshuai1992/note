function recoverNote($li) {
	var noteId = $li.data("noteId");
	var noteName = $li.find("a").text();
	var bookId = $li.data("bookId");
	
	$.ajax({
		url: "note/recovernote.json",
		type: "post",
		data: {"noteId": noteId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				$li.remove();
				checkEmptyTrash();
				
				if(bookId == $("#noteList").data("bookId")) {
					addNoteLi(noteId, noteName);
				}
			}
		},
		error: function() {
			alert("恢复请求错误！");
		}
	});
}

function checkEmptyTrash() {
	if($('#trashed_note_list li').length == 0) {
		$empty_trash = $('<li class="offline" style="text-align:center; font-style: italic;'
				+ 'font-weight: bold;" id="empty_trash">(回收站中没有任何笔记。。。)</li>');
		$('#trashed_note_list').append($empty_trash);
	}
}