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
    var date=new Date;
    var now=""+date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日 "+date.getHours()+":"+date.getMinutes();
    var str="今日("+date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+")，本市车流总量2113790辆，同比（2083790辆）上升1.4%，外牌车辆总数1059845辆，占比50.1%，同比（1035738辆）上升2.3%，外牌车辆主要归属外省258936辆，同比（264863辆）下降2.2%，佛山201834辆，同比（195317辆）上升3.3%。社情民意的关注度973条，社情民意热点“内环路上下班拥堵”、“龙口西往天河北方向闯红灯现象多”等，民意满意度99分--"+now;
    publishWechat(str);
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

  
  
  function publishWechat(text) {
    console.log(text);
    $.post("/postTestAll",{content:text},function(res){
      console.log(res);
    });
    return false;
  }

})(jQuery);