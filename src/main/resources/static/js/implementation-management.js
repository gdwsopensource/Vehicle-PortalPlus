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
    var str="今日("+date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"+")，本市车流总量2997471辆，同比（2963475辆）上升1.1%，外牌车辆总数1145236辆，占比38.25%，同比（1136489辆）上升0.7%，外牌车辆主要归属外省258936辆，同比（264863辆）下降2.2%，佛山201834辆，同比（195317辆）上升3.3%。社情民意的关注度973条，社情民意热点“内环路上下班拥堵”、“龙口西往天河北方向闯红灯现象多”等，民意满意度99分--"+now;
    publishWechat(str);
    
    $.get("/postImgAll",function(data){
    	console.log(data);
    });
    
  });
  $("#publish-report").on('mouseover',function(){
    console.log($("#publish-report").offset().top);
    var top=parseInt($("#publish-report").offset().top)+50;
    var left=parseInt($("#publish-report").offset().left)-430;
    $("#publish-report-image").css({
      "top":top,
      "left":left
    });
    $("#publish-report-image").show();
  })
  $("#publish-report").on('mouseout',function(){
    $("#publish-report-image").hide();
  })
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
