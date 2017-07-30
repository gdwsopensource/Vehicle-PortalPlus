(function($){
    // 地址栏跳转时
    var jumpHref = location.pathname;
    var liObj = $(".main-sidebar .sidebar-menu .treeview .treeview-menu li");
    liObj.each(function (index, value) {
        if ($(this).find("a").attr("data-href") == jumpHref) {
            if (window.sessionStorage) {
                sessionStorage.setItem("portalNav", $(this).find("a").attr("data-href"));
            }
        }
    });
    // 储存上次点击菜单
    if (window.sessionStorage) {
        var portalNav = sessionStorage.getItem("portalNav" || "");
        var liObj = $(".main-sidebar .sidebar-menu .treeview .treeview-menu li");  
        liObj.each(function (index, value) {
            if ($(this).find("a").attr("data-href") == portalNav) {
                $(this).addClass("active");
                $(this).parent().parent().addClass("active");
            }
        });
    }
    $(".main-sidebar .sidebar-menu .treeview .treeview-menu li").click(function () {
        if (window.sessionStorage) {
            sessionStorage.setItem("portalNav", $(this).find("a").attr("data-href"));
        }
    });
})(jQuery);