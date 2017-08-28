$(function() {
	$("#add_note").click(showAddNoteWindow);
	setAddNoteWindowAction();
});

function showAddNoteWindow() {
	$('#can').load('./alert/alert_note.html', function() {
		$('.opacity_bg').show();
		$('#can').show();
	});
};

function setAddNoteWindowAction() {
	$("#can").on("click", "#cancle_addnote", function() {
		$("#can").hide();
		$('.opacity_bg').hide();
	});
	
	$("#can").on("click", "#close_addnote", function() {
		$("#can").hide();
		$('.opacity_bg').hide();
	});
	
	$("#can").on("click", "#create_addnote", function() {
		var bookId = $("#noteList").data("bookId");
		var noteName = $("#input_note").val();
		var userId = getCookie("userId");
		
		$.ajax({
			url : "note/addnote.json",
			type : "post",
			data: {"bookId":bookId, "noteName":noteName, "userId":userId},
			dataType : "json",
			success : function(result) {
				if(result.status == "0") {
					$("#can").hide();
					$('.opacity_bg').hide();
					
					var noteId = result.data;
					addNoteLi(noteId, noteName);
				}
			},
			error : function() {
				alert('创建笔记请求出错！');
			}
		});
		
	});
}

function addNoteLi(noteId, noteName) {
	var $note = $('<li class="online"><a> <i' 
			+	' class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i><span>' 
			+	noteName
			+	'&nbsp;&nbsp;</span><button type="button"' 
			+	' class="btn btn-default btn-xs btn_position btn_slide_down">' 
			+	'<i class="fa fa-chevron-down"></i>' 
			+	'</button>' 
			+	'</a>' 
			+	'<div class="note_menu" tabindex="-1">' 
			+	'<dl>' 
			+	'<dt>' 
			+	'<button type="button"' 
			+	' class="btn btn-default btn-xs btn_move" title="移动至...">' 
			+	'<i class="fa fa-random"></i>' 
			+	'</button>' 
			+	'</dt>' 
			+	'<dt>' 
			+	'<button type="button"' 
			+	' class="btn btn-default btn-xs btn_share" title="分享">' 
			+	'<i class="fa fa-sitemap"></i>' 
			+	'</button>' 
			+	'</dt>' 
			+	'<dt>' 
			+	'<button type="button"' 
			+	' class="btn btn-default btn-xs btn_delete" title="删除至回收站">' 
			+	'<i class="fa fa-trash-o"></i>' 
			+	'</button>' 
			+	'</dt>' 
			+	'</dl>' 
			+	'</div></li>');
	$note.data("noteId", noteId);
		
	bindNoteLiAction($note);
		
	$("#noteList").prepend($note);
	$("#noteList li:eq(0) a").click();
}
