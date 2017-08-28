
function showTrashedNotes() {
	$('#trashed_note_list').empty();
	var userId = getCookie("userId");
	
	$.ajax({
		url : "note/loadtrashednotes.json",
		type : "post",
		dataType : "json",
		data: {"userId": userId},
		success : function(result) {
			if(result.status == "0") {
				var list = result.data;
				
				if(list == null || list.length == 0) {
					$('#trashed_note_list').append('<li class="offline" style="text-align:center; font-style: italic;font-weight: bold;" id="empty_trash">(回收站中没有任何笔记。。。)</li>');
					return;
				}
				
				for(var i=0; i<list.length; i++) {
					var item = list[i];
					
					var $li = $('<li class="disable"><a><i class="fa fa-file-text-o"'
						+ 'title="online" rel="tooltip-bottom"></i>'
						+ item.cn_note_title
						+ '<button type="button" title="彻底删除"'
						+ 'class="btn btn-default btn-xs btn_position btn_delete">'
						+ '<i class="fa fa-times"></i>'
						+ '</button>'
						+ '<button type="button" title="恢复笔记"'
						+ 'class="btn btn-default btn-xs btn_position_2 btn_replay">'
						+ '<i class="fa fa-reply"></i>'
						+ '</button></a></li>');
					
					$li.data("noteId", item.cn_note_id);
					$li.data("bookId", item.cn_notebook_id);
					
					bindTrashedLiAction($li);
					
					$('#trashed_note_list').append($li);
				}
//				$("#trashed_note_list li:first a").addClass("checked");
			}
		},
		error : function() {
			alert('回收站列表加载请求出错！');
		}
	});
}

function bindTrashedLiAction($li) {
	
	$li.find("a").click(clickTrashedLiAction);
	$li.find("a button:eq(0)").click(deleteTrashedNoteAction);
	$li.find("a button:eq(1)").click(recoverTrashedNoteAction);
}

function clickTrashedLiAction(e) {
	$obj = $(this);
	$obj.addClass("checked").parent().siblings().children("a").removeClass("checked");
}

function deleteTrashedNoteAction(e) {
	$li = $(this).parent().parent();
	
	deleteNote($li);
	
	e.stopPropagation();
}

function recoverTrashedNoteAction(e) {
	$li = $(this).parent().parent();
	
	recoverNote($li);
	
	e.stopPropagation();
}
