$(function() {
	$("#search_note").keyup(function(e) {
		if(e.keyCode == 13) {
			$("#pc_part_2").hide();
			$("#pc_part_6").show();
			loadSearchResult();
		}
	}); 
});

function loadSearchResult() {
	var key = $("#search_note").val();
	$.ajax({
		url: "note/searchnote.json",
		type: "post",
		data: {"key": key},
		dataType: "json",
		success: function(result) {
			if(result.status == "0") {
				var notes = result.data;
				for(var i=0; i<notes.length; i++) {
					var note = notes[i];
					$li = $('<li class="online"><a>' + 
							'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom" style="float:left; line-height:32px;"></i><font style="float:left">' + 
							note.cn_share_title + '</font><span class="fa fa-star" style="float:right; position:relative; cursor:pointer; font-size:16px; line-height:32px;" ' + 
							'title="收藏" "></span></a></li>');
					$("#resultList").append($li);
				}
			}
		},
		error: function() {
			alert("搜索请求失败！");
		}
	});
}