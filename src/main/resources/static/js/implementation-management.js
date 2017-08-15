(function($) {
	//初始化
	$('.textarea').wysihtml5();
	CKEDITOR.replace('editor1', {
		height : 800
	});

	if (window.localStorage) {
		var tWaitCKEDITOR = setInterval(function() {
			if ($(".cke_wysiwyg_frame").contents().find("body").html()) {
				var textStr = "";
				textStr = localStorage.getItem("portalLimitReport");
				var reportBody = $(".cke_wysiwyg_frame").contents()
						.find("body");
				reportBody.html(textStr);
				clearInterval(tWaitCKEDITOR);
			}
		}, 100);

	}
	//绑定事件
	$("#save-report").on('click',function(){
		exportWord("分析报告");
	})
	//自定义函数
	function exportWord(title) {
		var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
		reportBody.wordExport(title || "报告");
	}
	/*
	 * setTimeout(function() { if (window.localStorage) { var textStr = "";
	 * textStr = localStorage.getItem("portalLimitReport"); var reportBody =
	 * $(".cke_wysiwyg_frame").contents().find("body");
	 * reportBody.html(textStr); } }, 1000);
	 */

})(jQuery)