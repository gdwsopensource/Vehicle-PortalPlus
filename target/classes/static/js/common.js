(function($) {
  // 地址栏跳转时
  var jumpHref = location.pathname;
  var liObj = $(".main-sidebar .sidebar-menu .treeview .treeview-menu li");
  liObj.each(function(index, value) {
    if ($(this).find("a").attr("data-href") == jumpHref) {
      if (window.sessionStorage) {
        sessionStorage
            .setItem("portalNav", $(this).find("a").attr("data-href"));
      }
    }
  });
  // 储存上次点击菜单
  if (window.sessionStorage) {
    var portalNav = sessionStorage.getItem("portalNav" || "");
    var liObj = $(".main-sidebar .sidebar-menu .treeview .treeview-menu li");
    liObj.each(function(index, value) {
      if ($(this).find("a").attr("data-href") == portalNav) {
        $(this).addClass("active");
        $(this).parent().parent().addClass("active");
      }
    });
  }
  $(".main-sidebar .sidebar-menu .treeview .treeview-menu li").click(
      function() {
        if (window.sessionStorage) {
          sessionStorage.setItem("portalNav", $(this).find("a").attr(
              "data-href"));
        }
      });
})(jQuery);
function colorRgba(a) {
  a = a || 1;
  return [ 'rgba(91,180,217,' + a + ')', 'rgba(244,117,100,' + a + ')',
      'rgba(79,195,186,' + a + ')', 'rgba(243,156,18,' + a + ')',
      'rgba(64,199,129,' + a + ')', 'rgba(149,161,194,' + a + ')' ];
};