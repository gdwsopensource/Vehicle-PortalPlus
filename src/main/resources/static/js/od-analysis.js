(function($) {
  // 定义全局传递变量
  var globalArea = "广州市";
  var globalTime = "最近一周";
  // 第一次初始
  resizeInit();
  CKEDITOR.replace('editor1', {
    height : 400
  });
  $('.textarea').wysihtml5();

  // 执行函数
  drawArea("draw-area", "广州市OD流向图");
  drawTime("draw-time");
  drawCross("draw-cross");
  drawOwn("draw-own");
  drawCarCross("draw-car-cross");

  // 绑定事件

  $(window).on('resize', function() {
    resizeInit();
  });
  $("#create-report")
      .on(
          'click',
          function() {
            $("#report-box").show();
            clearReport();
            writeReport("<h3>最近一周"
                + globalArea
                + "OD情况</h3><ol><li>堵塞情况良好</li><li>06:00-07:00为高峰时段，通过车辆80000辆次</li><li>琶洲卡口001为高峰卡口，通过车辆90000辆次</li><li>5.2%为非广州市车辆，呈上升趋势</li><ol>")
            drawReport(0, globalArea + "OD流向图", "");
            drawReport(1, globalArea + "OD时段图",
                "高峰时段为08:00-08:15有50000辆次出发，09:00-09:07有60000辆次到达");
            drawReport(2, globalArea + "OD卡口图",
                "高峰卡口为琶洲卡口004有50000辆次出发，琶洲卡口005有60000辆次到达");
            drawReport(3, globalArea + "OD归属地图",
                "非广州市车牌共有5000个(25.0%)，其中佛山市车牌车牌最多有2500个(12.5%)");
            scrollToFixed("#report-box");
            $("#create-report").html("重新生成报告");
          });
  $("#save-report").on('click', function() {
    exportWord(globalTime + globalArea + "报告");
  });
  $("#close-report").on('click', function() {
    $("#report-box").hide();
    scrollToFixed("#od-draw");
  });
  $("#od-car-list table>tbody>tr").on(
      'mouseover',
      function() {
        $(this).find('td').eq(1).addClass('text-danger');
        $(this).find('td').eq(1).find('i').addClass('fa-search').removeClass(
            'fa-car');
      });
  $("#od-car-list table>tbody>tr").on(
      'mouseout',
      function() {
        $(this).find('td').eq(1).removeClass('text-danger');
        $(this).find('td').eq(1).find('i').addClass('fa-car').removeClass(
            'fa-search');
      });
  $("#od-car-list table>tbody>tr").on('click', function() {
    var plateNo = $(this).find('td').eq(1).text();
    plateNo = trim(plateNo);
    scrollToFixed("#od-car-detailed");
  });

  // 自定义函数
  function resizeInit() {
    var drawAreaH = parseInt($("#draw-area").width());
    $("#draw-area").css("height", drawAreaH);
    var drawMsgH = parseInt($("#draw-msg").width());
    $("#draw-msg").css("height", drawMsgH * 3);
    var drawRightH = parseInt($("#draw-right").width());
    $(".draw-right").css("height", parseInt(drawRightH / 3));
    var drawCarCrossH = parseInt($("#draw-car-cross").width());
    $("#draw-car-cross").css("height", drawCarCrossH);
    $(".od-car-detailed-table-box").css("max-height", drawCarCrossH + "px");
  }
  function scrollToFixed(dom,add,time) {  
    add=add||50;
    time=time||1000;
    $('html, body').animate({
      scrollTop : (parseInt($(dom).offset().top)-add)
    }, time);
  }
  function scrollTo(divId) {
    document.getElementById(divId).scrollIntoView();
  }
  function exportWord(title) {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    reportBody.wordExport(title || "报告");
  }
  function clearReport() {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    reportBody.empty();
  }
  function drawReport(i, title, str) {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    var canvas = $(".container-fluid canvas");
    var canvas1 = canvas[i];
    var canvas1Data = canvas1.toDataURL("image/png");
    var img1Str = '<p style="text-align: center"><img src="' + canvas1Data
        + '" /></p>';
    var title1Str = '<h3 style="text-align: center">图' + (i + 1) + '：'
        + (title || '') + '' + '<h3>';
    reportBody.append(img1Str);
    reportBody.append(title1Str);
    reportBody.append(str || '');
  }
  function writeReport(str) {
    var reportBody = $(".cke_wysiwyg_frame").contents().find("body");
    reportBody.append(str);
  }

  // 例子简图
  function drawArea(id, title) {
    $.get('data/guangzhou.json', function(GuangZhouJson) {
      echarts.registerMap('guangzhou', GuangZhouJson);
      var chart = echarts.init(document.getElementById(id));
      // 113.325828,23.099192
      var option = null;
      option = {
        title : {
          text : title || "",
          left : 20,
          top : 20
        },
        legend : {
          show : true,
          orient : 'vertical',
          top : 10,
          right : 10,
          data : [ '起始', '终到' ],
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
        series : [
            {
              name : '起始',
              type : 'lines',
              coordinateSystem : 'geo',
              z : 2,
              symbol : [ 'none', 'arrow' ],
              symbolSize : 10,
              effect : {
                show : true,
                constantSpeed : 20,
                trailLength : 0,
                symbol : 'image://image/car_purple.png',
                symbolSize : 16,
                loop : true
              },
              data : [
                  {
                    coords : [ [ 113.28, 23.13 ], [ 113.28, 23.13 ] ],
                    name : [ "越秀区", "荔湾区", "海珠区", "天河区", "白云区", "黄埔区", "番禺区",
                        "花都区", "南沙区", "增城区", "从化区" ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.23, 23.08 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.31, 23.08 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.37, 23.15 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.31, 23.27 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.49, 23.17 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.40, 22.98 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.22, 23.45 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.56, 22.77 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.75, 23.33 ] ]
                  }, {
                    coords : [ [ 113.28, 23.13 ], [ 113.58, 23.55 ] ]
                  } ],
              polyline : false,
              lineStyle : {
                normal : {
                  color : '#C23531',
                  opacity : 0.5,
                  width : 5,
                  type : 'solid',
                  curveness : 0.3
                }
              }
            }, {
              name : '终到',
              type : 'lines',
              coordinateSystem : 'geo',
              z : 2,
              symbol : [ 'none', 'arrow' ],
              symbolSize : 10,
              effect : {
                show : true,
                constantSpeed : 20,
                trailLength : 0,
                symbol : 'image://image/car_purple.png',
                symbolSize : 20,
                loop : true
              },
              data : [ {
                coords : [ [ 113.58, 23.55 ], [ 113.49, 23.17 ] ]
              }, {
                coords : [ [ 113.58, 23.55 ], [ 113.40, 22.98 ] ]
              } ],
              polyline : false,
              lineStyle : {
                normal : {
                  color : '#2F4554',
                  opacity : 0.5,
                  width : 5,
                  type : 'solid',
                  curveness : 0.3
                }
              }
            } ]
      };
      chart.setOption(option);
      chart.on("click", function(params) {
        if (params.componentType == "geo") {
          var area = params.name;
          // 加载该区数据，重绘该地图，联动右边三图
          globalArea = params.name;
          drawArea("draw-area", area + "OD流向图");
          scrollToFixed("#od-draw");
        } else {
          console.log(params);
        }
      })
      $(window).on("resize", function() {
        chart.resize();
      })

    });
  }
  function drawTime(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        show : true,
        data : [ '起始', '终到' ],
        top : 10,
        right : 10
      },
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '0-3', '3-6', '6-9', '9-12', '12-15', '15-18', '18-21',
            '21-24' ]
      },
      yAxis : {
        type : 'value',
        axisLabel : {
          formatter : '{value}'
        }
      },
      series : [ {
        name : '起始',
        type : 'line',
        data : [ 1100, 1100, 1500, 1300, 1200, 1300, 1000, 900 ]
      }, {
        name : '终到',
        type : 'line',
        data : [ 1200, 1200, 1400, 1200, 1300, 1000, 1100, 900 ]
      } ]
    };
    chart.setOption(option);
    chart.on("click", function(params) {
      if (params.seriesType == 'line') {
        console.log(params.name);
        scrollToFixed("#od-car-list");
      }
    });
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCross(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        data : [ '起始', '终到' ],
        top : 10,
        right : 10
      },
      xAxis : [ {
        type : 'category',
        data : [ '琶洲卡口001', '琶洲卡口002', '琶洲卡口003', '琶洲卡口004', '琶洲卡口005' ],
        axisLabel : {
          formatter : function(params) {
            return axisTab(params, 4);
          }
        }
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '起始',
        type : 'bar',
        data : [ 1000, 5000, 3000, 1000, 2000 ]
      }, {
        name : '终到',
        type : 'bar',
        data : [ 2000, 1000, 5000, 3000, 1000 ]
      } ]
    };
    chart.setOption(option);
    chart.on("click", function(params) {
      if (params.seriesType == 'bar') {
        console.log(params.name);
        scrollToFixed("#od-car-list");
      }
    });
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawOwn(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'item',
        formatter : "{b}<br />{c}({d}%)"
      },
      legend : {
        orient : 'vertical',
        top : 10,
        right : 10,
        data : [ '广州市', '佛山市', '深圳市', '东莞市', '其他市', '其他省' ]
      },
      series : [ {
        type : 'pie',
        radius : '60%',
        center : [ '30%', '60%' ],
        data : [ {
          value : 10000,
          name : '广州市'
        }, {
          value : 500,
          name : '佛山市'
        }, {
          value : 200,
          name : '深圳市'
        }, {
          value : 200,
          name : '东莞市'
        }, {
          value : 300,
          name : '其他市'
        }, {
          value : 300,
          name : '其他省'
        } ],
        itemStyle : {
          emphasis : {
            shadowBlur : 10,
            shadowOffsetX : 0,
            shadowColor : 'rgba(0, 0, 0, 0.5)'
          }
        }
      } ]
    };
    chart.setOption(option);
    chart.on("click", function(params) {
      if (params.seriesType == 'pie') {
        console.log(params.name);
        scrollToFixed("#od-car-list");
      }
    });
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarCross(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        data : [ '起始', '终到' ],
        top : 10,
        right : 10
      },
      xAxis : [ {
        type : 'category',
        data : [ '琶洲卡口001', '琶洲卡口002', '琶洲卡口003', '琶洲卡口004', '琶洲卡口005' ],
        axisLabel : {
          formatter : function(params) {
            return axisTab(params, 4);
          }
        }
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '起始',
        type : 'bar',
        data : [ 1, 5, 3, 1, 2 ]
      }, {
        name : '终到',
        type : 'bar',
        data : [ 2, 1, 5, 3, 1 ]
      } ]
    };
    chart.setOption(option);
    chart.on("click", function(params) {
      if (params.seriesType == 'bar') {
        console.log(params.name);
      }
    });
    $(window).on("resize", function() {
      chart.resize();
    });
  }

  function axisTab(params, col) {
    var newParamsName = "";// 最终拼接成的字符串
    var paramsNameNumber = params.length;// 实际标签的个数
    var provideNumber = col || 4;// 每行能显示的字的个数
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
    /**
     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
     */
    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
      /** 循环每一行,p表示行 */
      for (var p = 0; p < rowNumber; p++) {
        var tempStr = "";// 表示每一次截取的字符串
        var start = p * provideNumber;// 开始截取的位置
        var end = start + provideNumber;// 结束截取的位置
        // 此处特殊处理最后一行的索引值
        if (p == rowNumber - 1) {
          // 最后一次不换行
          tempStr = params.substring(start, paramsNameNumber);
        } else {
          // 每一次拼接字符串并换行
          tempStr = params.substring(start, end) + "\n";
        }
        newParamsName += tempStr;// 最终拼成的字符串
      }

    } else {
      // 将旧标签的值赋给新标签
      newParamsName = params;
    }
    // 将最终的字符串返回
    return newParamsName;
  }
  function trim(str) {
    // 删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

})(jQuery)
function fly(obj, start, end) {
  var i = start;
  var inter = setInterval(function() {
    obj.css("top", i);
    i -= 5;
    if (i < 0) {
      clearInterval(inter);
    }
  }, 100);
}