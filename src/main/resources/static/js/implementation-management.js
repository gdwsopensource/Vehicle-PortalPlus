(function($) {
  // 初始化
  $('.textarea').wysihtml5();
  CKEDITOR.replace('editor1', {
    height : 800
  });

  if (window.localStorage) {
    var tWaitCKEDITOR = setInterval(function() {
      if ($(".cke_wysiwyg_frame").contents().find("body").html()) {
        var textStr = "";
        textStr = localStorage.getItem("portalLimitReport");
        var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
        reportBody.html(textStr);
        clearInterval(tWaitCKEDITOR);
      }
    }, 100);

  }
  // 绑定事件
  $("#save-report").on('click', function() {
    exportWord("分析报告");
  });
  $("#print-report").on('click', function() {
    $("#cke_22").click();
  });
  $("#publish-report").on('click', function() {
    publishWechat();
  });
  // 自定义函数
  function exportWord(title) {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    reportBody.wordExport(title || "报告");
  }
  /*
   * setTimeout(function() { if (window.localStorage) { var textStr = "";
   * textStr = localStorage.getItem("portalLimitReport"); var reportBody =
   * $(".cke_wysiwyg_frame").contents().find("body"); reportBody.html(textStr); } },
   * 1000);
   */

  function publishWechat() {
    var access_token = "OepZaX1NwBwpElsyCW5gpE0S49ajtI5ol6DhtTbw7Aw479UydxmN4Ej6DEoQ-qgKJyDmCd-eK4A-qHimakYlfPq945uu_a8mgrlO8uxQJwB7HfbwdDqnX6AkbTJTCcqPTNEjAEALFW";
    $
        .ajax({
          url : "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token="
              + access_token,
          type : "post",
          dataType:"jsonp",
          data : {
            "touser" : [ "o4Qjmvz5HTwNbLh1HD9fQga6rp3w" ],
            "msgtype" : "text",
            "text" : {
              "content" : "hello from boxer."
            }
          },
          success : function(data) {
            console.log(data);
          }
        });
  }

})(jQuery);