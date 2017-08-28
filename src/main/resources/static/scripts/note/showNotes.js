function showNotes(bookId) {
	
	$("#pc_part_2").show();
	$("#pc_part_6").hide();
	
	$("#noteList").empty();
	$("#noteList").data("bookId", bookId);
	
	var bookName = $('#noteBookList li a[class="checked"] font').html();
	$("#notebook_name").html(bookName);
	
	$("#noteList").data("bookName", bookName);
	
	$.ajax({
		url : "note/shownotes.json",
		type : "post",
		data : {
			"bookId" : bookId
		},
		dataType : "json",
		success : function(result) {
			if (result.status == "0") {
				
				var notes = result.data;
				for(var i=0; i<notes.length; i++) {
					var note = notes[i];
					if(note.cn_note_status_id == "0") {
						continue;
					}
					var $note = $('<li class="online"><a> <i' 
						+	' class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i><span>' 
						+	note.cn_note_title 
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
					$note.data("noteId", note.cn_note_id);
					
					bindNoteLiAction($note);
					
					if(note.cn_note_status_id == "2") {
						addSharedButton($note);
					}
					
					$("#noteList").append($note);
				}
				
				$("#noteList li:first a").addClass("checked");
				
			}
		},
		error : function() {
			alert("查看笔记请求错误！");
		}
	});
}

//绑定笔记列表项的相关事件
function bindNoteLiAction($li) {
	$li.find("a :button").click(clickNoteMenuButtonAction);
	
	$li.find("div").get(0).onmouseleave = function() {
		$(this).hide();
	};
	
	//添加删除至回收站的功能
	$li.find("div dl dt:eq(2) :button").click(function(e) {
		var $li = $(this).parent().parent().parent().parent();
		moveNoteToTrash($li);
		e.stopPropagation();
	});
	
	//添加分享的功能
	$li.find("div dl dt:eq(1) :button").click(function(e) {
		var $li = $(this).parent().parent().parent().parent();
		shareNote($li);
		e.stopPropagation();
	});
	
	$li.find("a").click(clickNoteAction);
}

function clickNoteAction(e) {
	$lastCheckedNoteLi = $("#noteList li a[class='checked']").parent();
	
	$obj = $(this);
	$obj.addClass("checked").parent().siblings().children("a").removeClass("checked");
	
	var bookName = $("#noteList").data("bookName");
	
	clickedNoteId = $obj.parent().data("noteId");
	clickedNoteName = bookName;
	
	confirmReload(clickedNoteId, clickedNoteName);
}

function clickNoteMenuButtonAction(e) {
	var $button = $(e.target);
	var $menu = $button.parent().next();
	
	//首先隐藏其他的下拉条
	$menu.parent().siblings().children("div").hide();
	
	if($menu.css("display") == "none") {
		$menu.show();
	} else {
		$menu.hide();
	}
	
	e.stopPropagation();
}

