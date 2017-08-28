$(function() {
	$("#empty_note").click(function() {
		um.body.innerHTML = "";
		um.$body.focus();
	});
	
	$("#save_note").click(clickSaveNoteButtonAction);
});

function loadNote(noteId, bookName) {
	
	//显示并调整编辑框大小
	$("#pc_part_3").show();
	$("#pc_part_-1").hide();
	set_height();
	var width = $('#third_side_right').width() - 35;
	$('.edui-container,.edui-editor-body').width(width);
	$('#myEditor').width(width - 20);
	
	$('#myEditor').data("noteId", noteId);

	$.ajax({
		url: "note/loadnote.json",
		type: "post",
		data: {"noteId":noteId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				var note = result.data;
				var noteTitle = note.cn_note_title;
				var noteBody = note.cn_note_body;
				
				$("#editnote_name").text("(" + bookName + "/" + noteTitle + ")");
				
				$("#input_note_title").val(noteTitle);
				um.$body.html(noteBody);
//				um.setContent(noteBody);
				
				old_title = $("#input_note_title").val();
				old_body = um.$body.html();
				
				$("#is_modified").css("display", "none");
				
			}
		},
		error: function() {
			alert("加载笔记内容出错！");
		}
	});
	
}

function clickSaveNoteButtonAction() {
	var noteId = $('#myEditor').data("noteId");
	var noteTitle = $("#input_note_title").val();
	var noteBody = um.getContent();
	
	$.ajax({
		url: "note/updatenote.json",
		type: "post",
		data: {"noteId":noteId, "noteTitle":noteTitle, "noteBody":noteBody},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				alert("保存成功！");
				
				var old = $("#editnote_name").text();
				$("#editnote_name").text(old.substring(0,old.indexOf("/") + 1) + noteTitle + ")");
				
				old_title = $("#input_note_title").val();
				old_body = um.$body.html();
				
				changeCheckedNoteTitle(noteTitle, noteId);
				
			}
		},
		error: function() {
			alert("保存笔记请求出错！");
		}
	});
	
}

function changeCheckedNoteTitle(title, id) {
	var $lis = $("#noteList li");
	
	//找到列表中noteId匹配的项，并修改为相应的名字
	for(var i=0; i<$lis.length; i++) {
		var $li = $($lis.get(i));
		if($li.data("noteId") == id) {
			$li.find("a span").html(title + "&nbsp;&nbsp;");
		}
	}
}


function confirmReload(noteId, bookName) {
	if($("#is_modified").css("display") == "none") {
		loadNote(noteId, bookName);
		return;
	}
	
	confirm_modify("当前编辑的笔记已修改，是否保存？");
	
}

function confirm_modify(msg) {
	$('#can').load('./alert/alert_modify.html', function() {
		$('#confirm_modify_msg').text(' ' + msg);
		$('.opacity_bg').show();
		$('#can').show();
	});
}



function confirmCloseEdit(noteId, bookName) {
	if($("#is_modified").css("display") == "none") {
		clearAndCloseEditDiv();
		return;
	}
	
	confirm_close("当前编辑的笔记已修改，是否保存？");
}

function confirm_close(msg) {
	$('#can').load('./alert/alert_closeedit.html', function() {
		$('#confirm_modify_msg').text(' ' + msg);
		$('.opacity_bg').show();
		$('#can').show();
	});
}