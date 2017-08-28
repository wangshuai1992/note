
function shareNote($li) {
	if($li.find("a i[title='取消分享']").attr("title") != undefined) {
		alert("你已分享该笔记，无需再次分享！");
		return;
	}
	
	var noteId = $li.data("noteId");
	
	$.ajax({
		url: "note/sharenote.json",
		type: "post",
		data: {"noteId": noteId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				var shareId = result.data;
				
				//为noteList中对应项添加已分享图标
				addSharedButton($li);
//				$li.data("shareId", shareId);
			}
		},
		error: function() {
			alert("分享请求出错！");
		}
	});
}

function addSharedButton($li) {
	if($li.find("a i[title='取消分享']").attr("title") != undefined) {
		return;
	}
	$shared = $('<i class="fa fa-sitemap" style="cursor: pointer" title="取消分享"></i>');
	
	$shared.click(cancelShare);
	
	$li.find("a span").after($shared);
}

function cancelShare(e) {
	$shared = $(this);
	var noteId = $shared.parent().parent().data("noteId");
	
	$.ajax({
		url: "note/cancelsharenote.json",
		type: "post",
		data: {"noteId": noteId},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				$shared.remove();
			}
		},
		error: function() {
			alert("取消分享请求错误！");
		}
	});
	
	e.stopPropagation();
}

