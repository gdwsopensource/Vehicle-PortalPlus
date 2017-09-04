(function($) {
  // 数据
  var crossInfo = [];
  //暴露活跃区域的地图变量出来调用
  var activeMapChart;
  var activeMapCenter=[113.366286, 23.130748];
  // 初始化
  // resizeInit();
  $('#search-date').daterangepicker();
  $('.select2').select2();

  // 执行函数
  drawActiveMap("active-map");
  drawCrowdBar("crowd-bar");
  drawCrowdLine("crowd-line");
  drawOwnBar("own-bar");

  drawEconomicArea("economic-area");
  drawEconomicType("economic-type");
  drawEconomicNonlocalchange("economic-nonlocalchange");
  drawEconomicNonlocaltype("economic-nonlocaltype");

  drawEnvironmentGas("environment-gas");
  drawEnvironmentType("environment-type");

  drawFeelingsScore("feelings-score");
  drawFeelingsWay("feelings-way");
  drawFellingsDay("feelings-day");
  
  
  

  $.get('data/new_cross_info.json', function(data) {
    // 卡口列表动态获取
    crossInfo = data;
    var searchCross = $("#search-cross");
    var optionStr = "";
    for (var i = 0; i < crossInfo.length; i++) {
      optionStr += ('<option value="' + data[i].road_name + '">'
          + data[i].road_name + '</option>');
    }
    searchCross.append(optionStr);
    $("#search-cross").change(function() {
      var crossName = $(this).val();
      $("#search-crosslist ul").prepend('<li>' + crossName + '</li>');
      $("#search-crosslist ul>li").click(deleteCross);
    });

    // 画百度地图
    var map = new BMap.Map('search-map');
    var poi = new BMap.Point(113.268781, 23.136371);
    map.centerAndZoom(poi,15);
    //这行设置可用来重载
    // map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl({
      anchor : BMAP_ANCHOR_TOP_LEFT,
      type : BMAP_NAVIGATION_CONTROL_SMALL
    }));
    var menu = new BMap.ContextMenu();
    var txtMenuItem = [ {
      text : '放大',
      callback : function() {
        map.zoomIn()
      }
    }, {
      text : '缩小',
      callback : function() {
        map.zoomOut()
      }
    }, {
      text : '清空',
      callback : function() {
        remove_overlay();
        if ($(".BMapLib_hander")[0]) {
          $(".BMapLib_hander")[0].click();
        }
      }
    } ];
    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,
          txtMenuItem[i].callback, 100));
    }
    map.addContextMenu(menu);

    var overlays = [];
    var overlaycomplete = function(e) {
      overlays.push(e.overlay);
      if (e.drawingMode == "circle") {
        // 圆形
        // xa相差5次方，应该是半径，单位是米
        // console.log(e.overlay);
        var x1 = e.overlay.point.lng;
        var y1 = e.overlay.point.lat;
        //传参去活跃地图中心点
        activeMapCenter=[x1,y1];
        var r = parseFloat(e.overlay.xa);
        var inArr = [];
        var len = data.length;
        for (var i = 0; i < len; i += 2) {
          if (calcDistance(x1, y1, data[i].bd_long, data[i].bd_lat) < r) {
            inArr.push(data[i]);
          }
        }
        for (var i = 0; i < inArr.length; i++) {
          $("#search-crosslist ul").prepend(
              '<li>' + inArr[i].road_name + '</li>');
        }
        $("#search-crosslist ul>li").click(deleteCross);
        console.log(inArr);
        for (var i = 0; i < inArr.length; i++) {
          var point = new BMap.Point(inArr[i].bd_long, inArr[i].bd_lat);
          addMarker(point);
        }
      } else if (e.drawingMode == "rectangle") {
        // 矩形
        // console.log(e.overlay);
        var x1 = e.overlay.po[0].lng;
        var y1 = e.overlay.po[0].lat;
        var x2 = e.overlay.po[2].lng;
        var y2 = e.overlay.po[2].lat;
      //传参去活跃地图中心点
        activeMapCenter=[(x1+x2)/2,(y1+y2)/2];
        var inArr = [];
        var len = data.length;
        for (var i = 0; i < len; i += 2) {
          data[i].bd_long = parseFloat(data[i].bd_long);
          data[i].bd_lat = parseFloat(data[i].bd_lat);
          if (data[i].bd_long < Math.max(x1, x2)
              && data[i].bd_long > Math.min(x1, x2)
              && data[i].bd_lat < Math.max(y1, y2)
              && data[i].bd_lat > Math.min(y1, y2)) {
            inArr.push(data[i]);
          }
        }
        for (var i = 0; i < inArr.length; i++) {
          $("#search-crosslist ul").prepend(
              '<li>' + inArr[i].road_name + '</li>');
        }
        $("#search-crosslist ul>li").click(deleteCross);
        console.log(inArr);
        for (var i = 0; i < inArr.length; i++) {
          var point = new BMap.Point(inArr[i].bd_long, inArr[i].bd_lat);
          addMarker(point);
        }
      }

    };
    var styleOptions = {
      strokeColor : "red", // 边线颜色。
      fillColor : "red", // 填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight : 3, // 边线的宽度，以像素为单位。
      strokeOpacity : 0.8, // 边线透明度，取值范围0 - 1。
      fillOpacity : 0.6, // 填充的透明度，取值范围0 - 1。
      strokeStyle : 'solid' // 边线的样式，solid或dashed。
    }
    // 实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
      isOpen : false, // 是否开启绘制模式
      enableDrawingTool : true, // 是否显示工具栏
      drawingToolOptions : {
        anchor : BMAP_ANCHOR_TOP_RIGHT, // 位置
        offset : new BMap.Size(5, 5), // 偏离值
      },
      circleOptions : styleOptions, // 圆的样式
      polylineOptions : styleOptions, // 线的样式
      polygonOptions : styleOptions, // 多边形的样式
      rectangleOptions : styleOptions
    // 矩形的样式
    });
    // 添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    function clearAll() {
      for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
      }
      overlays.length = 0
    }
    function remove_overlay() {
      map.clearOverlays();
    }
    function addMarker(point) {
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }
  });

  // console.log(calcDistance(114.265224, 23.138298, 113.265224, 24.138298));
  function calcDistance(x1, y1, x2, y2) {
    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);
    var perLong = 102000;
    var perLat = 111000;
    var dst = Math.sqrt((x1 - x2) * (x1 - x2) * perLong * perLong + (y1 - y2)
        * (y1 - y2) * perLat * perLat);
    return dst;
  }

  // 绑定事件
  $(window).on('resize', function() {
    resizeInit();
  });
  $("#search-submit").on('click',function(){
    changeActiveMapCenter(activeMapCenter,15);
  });
  $("#top-create-report").on('click', function() {
    sendReport("近一月情报分析智能报告")
  });
  $("#menu-search").on('click', function() {
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#search", 95);
  })
  $("#menu-traffic").on('click', function() {
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#traffic", 95);
  })
  $("#menu-economic").on('click', function() {
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#economic", 95);
  })
  $("#menu-environment").on('click', function() {
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#environment", 95);
  })
  $("#menu-feelings").on('click', function() {
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#feelings", 95);
  })

  $("#search-crosslist ul>li").click(deleteCross);
  // 自定义函数
  function changeActiveMapCenter(center,zoom){      
      console.log(activeMapChart.getOption());
      var option=activeMapChart.getOption();
      option.bmap[0].center=center;
      option.bmap[0].zoom=zoom;
      activeMapChart.setOption(option);

  }
  function deleteCross() {
    $(this).remove();
  }
  function scrollToFixed(dom, add, time) {
    add = add || 50;
    time = time || 1000;
    $('html, body').animate({
      scrollTop : (parseInt($(dom).offset().top) - add)
    }, time);
  }
  function resizeInit() {
    /*
     * var activeIconH = $("#active-icon").height();
     * $("#active-map").css("height", activeIconH);
     * 
     * var crowdTableH = $("#crowd-table").height();
     * $("#crowd-bar").css("height", crowdTableH); var crowdPieW =
     * $("#crowd-pie").width(); $("#crowd-pie").css("height", crowdPieW);
     * $("#crowd-line").css("height", crowdPieW); var ownMapW =
     * parseInt($("#own-map").width())*2/3; $("#own-bar").css("height",
     * ownMapW); $("#own-map").css("height", ownMapW);
     */
  }
  function sendReport(title) {
    if (window.localStorage) {
      var textStr = "";
      textStr += '<h1 style="text-align: center">' + title + '</h1>';
      textStr += '<h2>一、概览分析</h2>';
      textStr += '<p>近一月（2017年07月22日-2017年08月21日）中，广州外牌车数量106万辆，占总车辆的50%；外牌车带来的经济效益为8.5万亿元，有33%的经济与此相关；外牌车总排放量为5.6万吨，占汽车总排放量的32%；跟限外相关的话题共产生3450条次，同比上月上升8%。</p>';
      textStr += '<h2>二、交通分析</h2>';
      textStr += drawReportById("crowd-bar", "城市拥堵路段Top5", "东风东路最拥堵，拥堵延时指数2.0。");
      textStr += drawReportById("crowd-line", "城市拥堵路段Top5",
          "8点和18点拥堵情况最严重，此时外牌车占比也达到较大值。");
      textStr += '<h2>三、社情民意分析</h2>';
      textStr += drawReportById("feelings-score", "民意满意度", "民意满意99分，多一分怕骄傲。");
      textStr += '<h2>四、经济分析</h2>';
      textStr += drawReportById("economic-area", "区域经济",
          "荔湾区经济总值上升35%，花都区经济总值下降15%，跟限外政策相关度不大。");
      textStr += '<h2>五、环境分析</h2>';
      textStr += drawReportById("environment-type", "排放标准",
          "国Ⅳ及以后占比最多，达到34.15%。");
      /*
       * textStr += '<h1 style="text-align: center">' + title + '</h1>';
       * textStr += '<h2>一、概览分析</h2>'; textStr += '<p>近一月（2017年07月22日-2017年08月21日）中，广州外牌车数量243万辆，占总车辆的30%；外牌车带来的经济效益为8.5万亿元，有33%的经济与此相关；外牌车总排放量为5.6万吨，占汽车总排放量的32%；跟限外相关的话题共产生3450条次，同比上月上升8%。</p>';
       * textStr += '<h2>二、交通分析</h2>'; textStr += drawReport(1,
       * "入广外牌车归属地Top5", "佛山市最多，有50万辆。"); textStr += drawReport(2, "城市拥堵路段Top5",
       * "东风东路最为拥挤，拥堵指数为2。"); textStr += drawReport(3, "拥堵延时指数和外来车流量占比",
       * "12时、18时附近的高峰期，拥堵延时指数和外来车流量占比呈正相关关系，外来车流量占比提高1个百分点，拥堵延时指数平均上升0.2。");
       * textStr += '<h2>三、经济分析</h2>'; textStr += drawReport(4, "区域经济",
       * "荔湾区经济总值上升35%，花都区经济总值下降15%，跟限外政策相关度不大。"); textStr += drawReport(5,
       * "经济指标", "逐年增长。"); textStr += '<h2>四、环境分析</h2>'; textStr +=
       * drawReport(6, "污染物排放量", "环境污染问题越来越严峻。"); textStr += drawReport(7,
       * "排放标准", "国Ⅳ及以后占比最多，达到34.15%。"); textStr += '<h2>五、舆情分析</h2>';
       * textStr += drawReport(8, "舆情满意度", "舆情满意99分，多一分怕骄傲。"); textStr +=
       * drawReport(9, "舆情关注度", "平均每天有1150条跟限外有关的话题，百度贴吧和新浪微博的热度最高。");
       */
      localStorage.setItem("portalLimitReport", textStr);
    }

  }
  function drawReport(i, title, str) {
    var canvas = $(".container-fluid canvas");
    var canvas1 = canvas[i];
    var canvas1Data = canvas1.toDataURL("image/png");
    var img1Str = '<p style="text-align: center"><img src="' + canvas1Data
        + '" /></p>';
    var title1Str = '<p style="text-align: center">图：' + (title || '') + ''
        + '<p>';
    return img1Str + title1Str + (str || '');
  }
  function drawReportById(id, title, str) {
    var canvas = $("#" + id + " canvas")[0];
    var canvas1Data = canvas.toDataURL("image/png");
    var img1Str = '<p style="text-align: center"><img src="' + canvas1Data
        + '" /></p>';
    var title1Str = '<p style="text-align: center">图：' + (title || '') + ''
        + '<p>';
    return img1Str + title1Str + (str || '');
  }
  function writeReport(str) {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    reportBody.append(str);
  }
  function drawActiveMap(id) {
    $.get('data/limit-fullpage-cross.json', function(data) {
      var len = data.length;
      var hotData = [];
      for (var i = 0; i < len; i += 2) {
        hotData[i / 2] = [ data[i].long, data[i].lat, data[i].count ];
      }
      var obj = document.getElementById(id);
      var chart = echarts.init(obj);
      activeMapChart=chart;
      var option = null;
      option = {
        bmap : {
          center : [ 113.366286, 23.130748 ],
          zoom : 12,
          roam : 'move'
        },
        visualMap : {
          show : false,
          top : 'top',
          min : 0,
          max : 5,
          seriesIndex : 0,
          calculable : true,
          inRange : {
            color : [ 'blue', 'blue', 'green', 'yellow', 'red' ]
          }
        },
        series : [ {
          type : 'heatmap',
          coordinateSystem : 'bmap',
          data : hotData,
          pointSize : 10,
          blurSize : 20
        } ]
      };
      chart.setOption(option);
      var bmap = chart.getModel().getComponent('bmap').getBMap();
      bmap.addControl(new BMap.NavigationControl({
        anchor : BMAP_ANCHOR_TOP_LEFT,
        type : BMAP_NAVIGATION_CONTROL_SMALL
      }));
      $(window).on("resize", function() {
        chart.resize();
      });      
    })
  }

  function drawCrowdBar(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        },
        formatter : "{b}<br>{c}"
      },
      grid : {
        left : '10',
        right : '90',
        bottom : '20',
        top : '40',
        containLabel : true
      },
      xAxis : {
        name : '延时指数',
        type : 'value',
        boundaryGap : [ 0, 0.01 ]
      },
      // 注意数据是从下到上
      yAxis : {
        name : '路段',
        type : 'category',
        data : [ '机场高速公路', '广园快速路', '江海大道', '环城高速', '东风东路' ]
      },
      series : [ {
        type : 'bar',
        data : [ 1.6, 1.7, 1.8, 1.9, 2.0 ],itemStyle : {
          normal : {
            color : function(params) {
              var colorList = colorRgba().concat(colorRgba()).concat(colorRgba());
              return colorList[params.dataIndex];
            }
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCrowdPie(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'item',
        formatter : "{b}<br>{c} ({d}%)"
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '70%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            show : false,
            position : 'center'
          },
          emphasis : {
            show : true,
            textStyle : {
              fontSize : '30',
              fontWeight : 'bold'
            }
          }
        },
        label : {
          normal : {
            position : 'outside'
          }
        },
        data : [ {
          value : 2500,
          name : '黄埔大道'
        }, {
          value : 3000,
          name : '禺山西路'
        }, {
          value : 1000,
          name : '琶洲'
        }, {
          value : 2000,
          name : '花城大道'
        }, {
          value : 1500,
          name : '科韵路'
        } ]
      } ],itemStyle : {
        normal : {
          color : function(params) {
            var colorList = colorRgba().concat(colorRgba()).concat(colorRgba());
            return colorList[params.dataIndex];
          }
        }
      }
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCrowdLine(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      xAxis : {
        name : '时间',
        type : 'category',
        boundaryGap : false,
        data : [ '0', '3', '6', '9', '12', '15', '18', '21', '24' ]
      },
      yAxis : {
        type : 'value'
      },
      grid : {
        left : '40',
        right : '80',
        bottom : '40',
        top : '40'
      },
      legend : {
        data : [ '外牌车辆占比', '拥堵延时指数' ]
      },
      series : [ {
        name : '外牌车辆占比',
        type : 'line',
        data : [ 0.51, 0.49, 0.48, 0.53, 0.53, 0.51, 0.50, 0.49, 0.5 ]
      }, {
        name : '拥堵延时指数',
        type : 'line',
        data : [ 1.2, 1.2, 1.2, 1.45, 1.4, 1.2, 1.2, 1.1, 1.2 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawOwnBar(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        },
        formatter : "{b}<br>{c}"
      },
      grid : {
        left : '10',
        right : '90',
        bottom : '20',
        top : '40',
        containLabel : true
      },
      xAxis : {
        name : '车辆数(万辆)',
        type : 'value',
        boundaryGap : [ 0, 0.01 ]
      },
      // 注意数据是从下到上
      yAxis : {
        name : '归属地',
        type : 'category',
        data : [ '清远市', '绍兴市', '深圳市', '佛山市', '其他省' ]
      },
      series : [ {
        type : 'bar',
        data : [ 5.0942, 5.1551, 11.6452, 20.0000, 25.8936 ],itemStyle : {
          normal : {
            color : function(params) {
              var colorList = colorRgba().concat(colorRgba()).concat(colorRgba());
              return colorList[params.dataIndex];
            }
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawOwnMap(id) {
    // 箭头的颜色表示拥堵量，宽度表示车流量
    // 1-10
    var lines = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    $.get('data/guangzhou.json', function(GuangZhouJson) {
      echarts.registerMap('guangzhou', GuangZhouJson);
      var chart = echarts.init(document.getElementById(id));
      // 113.325828,23.099192
      var option = null;
      option = {
        legend : {
          show : true,
          orient : 'vertical',
          top : 10,
          right : 10,
          data : [ '进城', '出城' ],
          textStyle : {

          }
        },
        geo : {
          show : true,
          map : 'guangzhou',
          roam : true,
          center : '',
          zoom : 1.5,
          label : {
            normal : {
              show : true,
              textStyle : {
                color : '#000000',
                fontSize : 12
              }
            },
            emphasis : {
              show : true,
              textStyle : {
                color : '#000000',
                fontSize : 36
              }
            }
          },
          itemStyle : {
            normal : {
              areaColor : '#666677',
              borderColor : '#FFFFFF'
            },
            emphasis : {
              areaColor : '#333344'
            }
          }
        },
        series : [ {
          name : '进城',
          type : 'lines',
          coordinateSystem : 'geo',
          z : 2,
          symbol : [ 'none', 'arrow' ],
          symbolSize : lines[0],
          effect : {
            show : true,
            constantSpeed : 20,
            trailLength : 0,
            symbol : 'arrow',
            symbolSize : 10 + lines[0],
            color : 'rgba(' + (155 + lines[0] * 10) + ',0,0,0.5)',
            loop : true
          },
          label : {
            normal : {
              show : true,
              position : 'middle',
              formatter : function(params) {
                return params.data.fromLoad + " -> " + params.data.toLoad
              },
              textStyle : {
                fontSize : 12
              }
            },
            emphasis : {
              textStyle : {
                fontSize : 24
              }
            }
          },
          data : [ {
            coords : [ [ 113.58, 23.75 ], [ 113.49, 23.17 ] ],
            fromLoad : "道路1",
            toLoad : "道路2"
          } ],
          polyline : false,
          lineStyle : {
            normal : {
              color : 'rgba(' + (155 + lines[0] * 10) + ',0,0,0.5)',
              opacity : 0.5,
              width : lines[0],
              type : 'solid'
            }
          }
        }, {
          name : '出城',
          type : 'lines',
          coordinateSystem : 'geo',
          z : 2,
          symbol : [ 'none', 'arrow' ],
          symbolSize : lines[5],
          effect : {
            show : true,
            constantSpeed : 20,
            trailLength : 0,
            symbol : 'arrow',
            symbolSize : 10 + lines[5],
            color : 'rgba(0,' + (155 + lines[5] * 10) + ',0,0.5)',
            loop : true
          },
          data : [ {
            coords : [ [ 113.78, 23.25 ], [ 113.39, 23.57 ] ]
          } ],
          polyline : false,
          lineStyle : {
            normal : {
              color : 'rgba(0,' + (155 + lines[5] * 10) + ',0,0.5)',
              opacity : 0.5,
              width : lines[5],
              type : 'solid'
            }
          }
        } ]
      };
      chart.setOption(option);
      chart.on("click", function(params) {
        if (params.componentType == "geo") {
        } else {
          console.log(params);
        }
      })
      $(window).on("resize", function() {
        chart.resize();
      })
    });
  }

  function drawEconomicArea(id) {
    $
        .get(
            'data/guangzhou.json',
            function(GuangZhouJson) {
              echarts.registerMap('guangzhou', GuangZhouJson);
              var chart = echarts.init(document.getElementById(id));
              // 113.325828,23.099192
              chart
                  .setOption({
                    tooltip : {
                      trigger : 'item',
                      formatter : function(params) {
                        if (params.data.index > 0) {
                          var index = '<i class="fa fa-long-arrow-up" aria-hidden="true"></i>&nbsp;'
                              + (Math.abs(params.data.index) * 100) + '%';
                        } else {
                          var index = '<i class="fa fa-long-arrow-down" aria-hidden="true"></i>&nbsp;'
                              + (Math.abs(params.data.index) * 100) + '%';
                        }
                        return params.name + '</br>' + '经济总量：' + params.value
                            + '&nbsp;/亿' + '<br/>' + index;
                      }
                    },
                    label : {
                      normal : {
                        show : true
                      }
                    },
                    series : [ {
                      type : 'map',
                      name : '过车频次',
                      map : 'guangzhou',
                      roam : 'move',
                      zoom : '1.5',
                      selectedMode : 'single',
                      data : [ {
                        name : "天河区",
                        value : 203,
                        index : 0.15
                      }, {
                        name : "番禺区",
                        value : 240,
                        index : 0.15
                      }, {
                        name : "黄埔区",
                        value : 250,
                        index : 0.15
                      }, {
                        name : "荔湾区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "海珠区",
                        value : 250,
                        index : 0.15
                      }, {
                        name : "从化区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "增城区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "白云区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "花都区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "越秀区",
                        value : 250,
                        index : -0.15
                      }, {
                        name : "南沙区",
                        value : 250,
                        index : 0.15
                      } ],
                      /*
                       * itemStyle: { normal: { label: { show: true } },
                       * emphasis: { label: { show: true } } },
                       */
                      markPoint : {
                        symbol : 'image://../image/map-pin.png',
                        symbolSize : [ 36, 48 ],
                        itemStyle : {
                          normal : {
                            label : {
                              show : true,
                              formatter : function(params) {
                                if (params.data.index > 0) {
                                  var index = '+'
                                      + (Math.abs(params.data.index) * 100)
                                      + '%';
                                } else {
                                  var index = '-'
                                      + (Math.abs(params.data.index) * 100)
                                      + '%';
                                }
                                return index;
                              }
                            }
                          }
                        },
                        label : {
                          normal : {
                            textStyle : {
                              color : '#a4ca49',
                              fontSize : 10
                            },
                            offset : [ 0, -5 ]
                          }
                        },
                        data : [ {
                          name : "天河区",
                          index : '0.15',
                          value : 203,
                          coord : [ 113.384483, 23.17578 ]
                        }, {
                          name : "番禺区",
                          index : '-0.15',
                          value : 203,
                          coord : [ 113.355737, 22.977358 ]
                        }, {
                          name : "黄埔区",
                          index : '-0.15',
                          value : 203,
                          coord : [ 113.479631, 23.190663 ]
                        }, {
                          name : "海珠区",
                          index : '0.25',
                          value : 203,
                          coord : [ 113.285597, 23.108785 ]
                        }, {
                          name : "荔湾区",
                          index : '0.35',
                          value : 203,
                          coord : [ 113.2202, 23.112774 ]
                        }, {
                          name : "南沙区",
                          index : '0.35',
                          value : 203,
                          coord : [ 113.473594, 22.851129 ]
                        }, {
                          name : "白云区",
                          index : '0.25',
                          value : 203,
                          coord : [ 113.266337, 23.224409 ]
                        }, {
                          name : "花都区",
                          index : '-0.15',
                          value : 203,
                          coord : [ 113.139856, 23.428297 ]
                        }, {
                          name : "从化区",
                          index : '-0.05',
                          value : 203,
                          coord : [ 113.531373, 23.555035 ]
                        }, {
                          name : "增城区",
                          index : '-0.05',
                          value : 203,
                          coord : [ 113.832629, 23.288158 ]
                        } ]
                      }
                    } ]
                  });
            });
  }
  function drawEconomicType(id) {
    var dataBJ = [ [ 1, 55, 9, 56, 0.46, 18, 6, "良" ],
        [ 2, 25, 11, 21, 0.65, 34, 9, "优" ], [ 3, 56, 7, 63, 0.3, 14, 5, "良" ],
        [ 4, 33, 7, 29, 0.33, 16, 6, "优" ] ];

    var dataGZ = [ [ 1, 26, 37, 27, 1.163, 27, 13, "优" ],
        [ 2, 85, 62, 71, 1.195, 60, 8, "良" ],
        [ 3, 78, 38, 74, 1.363, 37, 7, "良" ],
        [ 4, 21, 21, 36, 0.634, 40, 9, "优" ] ];

    var dataSH = [ [ 1, 91, 45, 125, 0.82, 34, 23, "良" ],
        [ 2, 65, 27, 78, 0.86, 45, 29, "良" ],
        [ 3, 83, 60, 84, 1.09, 73, 27, "良" ],
        [ 4, 109, 81, 121, 1.28, 68, 51, "一般" ] ];

    var schema = [ {
      name : '近四周',
      index : 0,
      text : '近四周'
    }, {
      name : '工业产值',
      index : 1,
      text : '工业产值'
    }, {
      name : '建筑业产值',
      index : 2,
      text : '建筑业产值'
    }, {
      name : '农业产值',
      index : 3,
      text : '农业产值'
    }, {
      name : '运输业产值',
      index : 4,
      text : '运输业产值'
    }, {
      name : '商业产值',
      index : 5,
      text : '商业产值'
    }, {
      name : '消费水平',
      index : 6,
      text : '消费水平'
    }, {
      name : '经济状况',
      index : 7,
      text : '经济状况'
    } ];

    var lineStyle = {
      normal : {
        width : 1,
        opacity : 0.5
      }
    };

    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      legend : {
        bottom : 5,
        data : [ '天河区', '海珠区', '黄埔区', '番禺区', '白云区', '荔湾区' ],
        itemGap : 20,
        textStyle : {
          color : '#333',
          fontSize : 14
        },
        width : '90%'
      },
      tooltip : {},
      parallelAxis : [ {
        dim : 0,
        name : schema[0].text
      }, {
        dim : 1,
        name : schema[1].text
      }, {
        dim : 2,
        name : schema[2].text
      }, {
        dim : 3,
        name : schema[3].text
      }, {
        dim : 4,
        name : schema[4].text
      }, {
        dim : 5,
        name : schema[5].text
      }, {
        dim : 6,
        name : schema[6].text
      }, {
        dim : 7,
        name : schema[7].text,
        type : 'category',
        data : [ '优', '良', '较良', '一般', '较差', '差' ]
      } ],
      parallel : {
        bottom : 100,
        left : '10%',
        layout : 'vertical',
        parallelAxisDefault : {}
      },
      series : [ {
        name : '天河区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataBJ
      }, {
        name : '海珠区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataSH
      }, {
        name : '黄埔区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataGZ
      }, {
        name : '番禺区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataBJ
      }, {
        name : '白云区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataGZ
      }, {
        name : '荔湾区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataSH
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawEconomicNonlocalchange(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        data : [ 'GDP', '外牌车比例' ]
      },
      grid : {
        left : '90',
        right : '90',
        bottom : '40',
        top : '40'
      },
      xAxis : [ {
        type : 'category',
        data : [ '2017-07-27', '2017-08-01', '2017-08-06', '2017-08-11',
            '2017-08-16', '2017-08-21' ]
      } ],
      yAxis : [ {
        type : 'value',
        name : 'GDP（亿元）',
        min : 0,
        max : 20000,
        axisLabel : {
          formatter : '{value} 亿元'
        }
      }, {
        type : 'value',
        name : '外牌车比例（%）',
        min : 0,
        max : 100,
        axisLabel : {
          formatter : '{value}% '
        }
      } ],
      series : [ {
        name : 'GDP',
        type : 'line',
        data : [ 10000, 11000, 8643, 9348, 12345, 12365 ]
      }, {
        name : '外牌车比例',
        type : 'bar',
        barWidth : '60%',
        yAxisIndex : 1,
        data : [ 50.2, 49.8, 51.5, 50.2, 49.1, 51.6 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawEconomicNonlocaltype(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },
      grid : {
        left : '5%',
        right : '5%',
        bottom : '5%',
        top:'10%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        data : [ '工业产值', '建筑业产值', '农业产值', '运输业产值', '商业产值', '消费水平', '经济状况' ],
        axisTick : {
          alignWithLabel : true
        }
      } ],
      yAxis : [ {
        type : 'value',
        name : '比例%'
      } ],
      series : [ {
        name : '经济指标',
        type : 'bar',
        barWidth : '60%',
        data : [ 10, 20, 12, 24, 35, 24, 18 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawFeelingsScore(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        formatter : "{a} <br/>{b} : {c}%"
      },
      series : [ {
        name : '满意分数',
        type : 'gauge',
        detail : {
          formatter : '{value}分'
        },
        data : [ {
          value : 99,
          name : '满意分数'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawFeelingsWay(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        data : [ '汇总', '新浪微博', '百度贴吧', '知乎', 'facebook', '报纸', '微信公众号' ]
      },
      calculable : true,
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '2017-07-27', '2017-08-01', '2017-08-06', '2017-08-11',
            '2017-08-16', '2017-08-21' ]
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '汇总',
        type : 'line',
        smooth : true,
        data : [ 947, 948, 949, 971, 902, 973 ]
      }, {
        name : '新浪微博',
        type : 'line',
        smooth : true,
        data : [ 67, 63, 60, 65, 62, 60 ]
      }, {
        name : '百度贴吧',
        type : 'line',
        smooth : true,
        data : [ 51, 49, 50, 50, 53, 53 ]
      }, {
        name : '知乎',
        type : 'line',
        smooth : true,
        data : [ 52, 59, 71, 76, 91, 97 ]
      }, {
        name : 'facebook',
        type : 'line',
        smooth : true,
        data : [ 47, 48, 49, 71, 102, 73 ]
      }, {
        name : '报纸',
        type : 'line',
        smooth : true,
        data : [ 147, 428, 449, 371, 302, 273 ]
      }, {
        name : '微信公众号',
        type : 'line',
        smooth : true,
        data : [ 364, 361, 365, 342, 339, 353 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawFellingsDay(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      xAxis : {
        name : '时间',
        type : 'category',
        boundaryGap : false,
        data : [ '0', '3', '6', '9', '12', '15', '18', '21', '24' ]
      },
      yAxis : {
        name : '热度(条)',
        type : 'value'
      },
      tooltip : {
        trigger : 'axis'
      },
      grid : {
        left : '40',
        right : '80',
        bottom : '40',
        top : '40'
      },
      series : [ {
        name : '社情热度',
        type : 'line',
        data : [ 200, 50, 30, 50, 250, 100, 260, 300, 200 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawEnvironmentGas(id) {
    var dataBJ = [ [ 1, 55, 9, 56, 6, "良" ], [ 2, 25, 11, 21, 9, "优" ],
        [ 3, 56, 7, 63, 5, "良" ], [ 4, 33, 7, 29, 6, "优" ] ];

    var dataGZ = [ [ 1, 26, 37, 27, 13, "优" ], [ 2, 85, 62, 71, 8, "良" ],
        [ 3, 78, 38, 74, 7, "良" ], [ 4, 21, 21, 36, 9, "优" ] ];

    var dataSH = [ [ 1, 91, 45, 125, 23, "良" ], [ 2, 65, 27, 78, 29, "良" ],
        [ 3, 83, 60, 84, 27, "良" ], [ 4, 109, 81, 121, 51, "轻度污染" ] ];

    var schema = [ {
      name : '近四周',
      index : 1,
      text : '近四周'
    }, {
      name : '一氧化碳',
      index : 1,
      text : '一氧化碳'
    }, {
      name : '碳氢化合物',
      index : 2,
      text : '碳氢化合物'
    }, {
      name : '氮氧化物',
      index : 3,
      text : '氮氧化物'
    }, {
      name : '氢氧化物',
      index : 4,
      text : '氢氧化物'
    }, {
      name : '颗粒物',
      index : 5,
      text : '颗粒物'
    } ];

    var lineStyle = {
      normal : {
        width : 1,
        opacity : 0.5
      }
    };
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      legend : {
        bottom : 5,
        data : [ '天河区', '番禺区', '海珠区', '南沙区', '黄埔区', '白云区' ],
        itemGap : 20,
        textStyle : {
          color : '#333',
          fontSize : 14
        },
        width : '90%'
      },
      tooltip : {},
      parallelAxis : [ {
        dim : 0,
        name : schema[0].text
      }, {
        dim : 1,
        name : schema[1].text
      }, {
        dim : 2,
        name : schema[2].text
      }, {
        dim : 3,
        name : schema[3].text
      }, {
        dim : 4,
        name : schema[4].text
      }, {
        dim : 5,
        name : schema[5].text,
        type : 'category',
        data : [ '优', '良', '轻度污染', '中度污染', '重度污染', '严重污染' ]
      } ],
      parallel : {
        bottom : 100,
        left : '10%',
        layout : 'horizontal',
        parallelAxisDefault : {}
      },
      series : [ {
        name : '天河区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataBJ
      }, {
        name : '番禺区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataSH
      }, {
        name : '海珠区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataGZ
      }, {
        name : '南沙区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataBJ
      }, {
        name : '黄埔区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataGZ
      }, {
        name : '白云区',
        type : 'parallel',
        lineStyle : lineStyle,
        data : dataSH
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawEnvironmentType(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : colorRgba(),
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [ {
        name : '排放标准',
        type : 'pie',
        radius : '55%',
        center : [ '50%', '50%' ],
        data : [ {
          value : 235,
          name : '国I前'
        }, {
          value : 225,
          name : '国I'
        }, {
          value : 210,
          name : '国II'
        }, {
          value : 304,
          name : '国III'
        }, {
          value : 505,
          name : '国IV及以后'
        } ],
        roseType : 'radius',
        label : {
          normal : {
            textStyle : {
              color : '#333'
            }
          }
        },
        labelLine : {
          normal : {
            lineStyle : {
              color : '#333'
            },
            smooth : 0.2,
            length : 10,
            length2 : 20
          }
        },
        animationType : 'scale',
        animationEasing : 'elasticOut',
        animationDelay : function(idx) {
          return Math.random() * 200;
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
})(jQuery)