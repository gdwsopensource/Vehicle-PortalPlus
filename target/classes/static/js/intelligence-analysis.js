(function($) {
  // 数据

  // 初始化
  resizeInit();

  // 执行函数
  drawActiveMap("active-map");
  drawCrowdBar("crowd-bar");
  drawCrowdLine("crowd-line");
  drawOwnBar("own-bar");

  drawEconomicArea("economic-area");
  drawEconomicType("economic-type");

  drawEnvironmentGas("environment-gas");
  drawEnvironmentType("environment-type");

  drawFeelingsScore("feelings-score");
  drawFeelingsWay("feelings-way");
  
  // 绑定事件
  $(window).on('resize', function() {
    resizeInit();
  });
  $("#top-create-report").on('click', function() {
    sendReport("近一月情报分析智能报告")
  });
  $("#menu-traffic").on('click',function(){
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#traffic",95);
  })
    $("#menu-economic").on('click',function(){
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#economic",95);
  })
    $("#menu-environment").on('click',function(){
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#environment",95);
  })
    $("#menu-feelings").on('click',function(){
    $(".tab-head .menu").removeClass("active");
    $(this).addClass("active");
    scrollToFixed("#feelings",95);
  })

  // 自定义函数
  function scrollToFixed(dom,add,time) {  
    add=add||50;
    time=time||1000;
    $('html, body').animate({
      scrollTop : (parseInt($(dom).offset().top)-add)
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
      textStr += '<p>近一月（2017年07月22日-2017年08月21日）中，广州外牌车数量243万辆，占总车辆的30%；外牌车带来的经济效益为8.5万亿元，有33%的经济与此相关；外牌车总排放量为5.6万吨，占汽车总排放量的32%；跟限外相关的话题共产生3450条次，同比上月上升8%。</p>';
      textStr += '<h2>二、交通分析</h2>';
      textStr += drawReport(1, "入广外牌车归属地Top5","佛山市最多，有50万辆。");
      textStr += drawReport(2, "城市拥堵路段Top5","东风东路最为拥挤，拥堵指数为2。");
      textStr += drawReport(3, "拥堵延时指数和外来车流量占比","12时、18时附近的高峰期，拥堵延时指数和外来车流量占比呈正相关关系，外来车流量占比提高1个百分点，拥堵延时指数平均上升0.2。");
      textStr += '<h2>三、经济分析</h2>';
      textStr += drawReport(4, "区域经济","荔湾区经济总值上升35%，花都区经济总值下降15%，跟限外政策相关度不大。");
      textStr += drawReport(5, "经济指标","逐年增长。");
      textStr += '<h2>四、环境分析</h2>';
      textStr += drawReport(6, "污染物排放量","环境污染问题越来越严峻。");
      textStr += drawReport(7, "排放标准","国Ⅳ及以后占比最多，达到34.15%。");
      textStr += '<h2>五、舆情分析</h2>';
      textStr += drawReport(8, "舆情满意度","舆情满意99分，多一分怕骄傲。");
      textStr += drawReport(9, "舆情关注度","平均每天有1150条跟限外有关的话题，百度贴吧和新浪微博的热度最高。");
      localStorage.setItem("portalLimitReport", textStr);
    }

  }
  function drawReport(i, title, str) {
    var canvas = $(".container-fluid canvas");
    var canvas1 = canvas[i];
    var canvas1Data = canvas1.toDataURL("image/png");
    var img1Str = '<p style="text-align: center"><img src="' + canvas1Data
        + '" /></p>';
    var title1Str = '<p style="text-align: center">图：'
        + (title || '') + '' + '<p>';
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
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        },
        formatter : "{b}<br>{c}"
      },
      grid : {
        left : '3%',
        right : '5%',
        bottom : '0%',
        top : '0%',
        containLabel : true
      },
      xAxis : {
        type : 'value',
        boundaryGap : [ 0, 0.01 ]
      },
      // 注意数据是从下到上
      yAxis : {
        type : 'category',
        data :  [ '机场高速公路', '广园快速路', '江海大道',
                    '环城高速','东风东路' ]
      },
      itemStyle : {
        normal : {
          color : 'rgba(53,127,166,0.8)'
        }
      },
      series : [ {
        type : 'bar',
        data : [  1.6, 1.7, 1.8, 1.9, 2.0 ]
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
      } ]
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
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '0', '3', '6', '9', '12', '15', '18', '21', '24' ]
      },
      yAxis : {
        type : 'value'
      },
      legend : {
        data : [ '外牌车辆占比', '拥堵延时指数' ]
      },
      series : [ {
        name : '外牌车辆占比',
        type : 'line',
        data : [ 0.28, 0.33, 0.14, 0.32, 0.35, 0.24, 0.23, 0.37, 0.28 ]
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
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        },
        formatter : "{b}<br>{c}"
      },
      grid : {
        left : '3%',
        right : '5%',
        bottom : '0%',
        top : '0%',
        containLabel : true
      },
      xAxis : {
        type : 'value',
        boundaryGap : [ 0, 0.01 ]
      },
      // 注意数据是从下到上
      yAxis : {
        type : 'category',
        data : [ '中山市','珠海市', '深圳市', '东莞市','佛山市' ]
      },
      itemStyle : {
        normal : {
          color : 'rgba(53,127,166,0.8)'
        }
      },
      series : [ {
        type : 'bar',
        data : [ 25, 26, 30, 40, 50 ]
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
      color : [ '#5bb4d9', '#f47564', '#4fc3b9', '#f39c12', '#1da02b',
          '#63869e' ],
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
      tooltip : {
        trigger : 'axis'
      },
      legend : {
        data : [ '汇总','新浪微博', '百度贴吧', '知乎', 'facebook', '报纸', '微信公众号' ]
      },
      calculable : true,
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '2017-07-27','2017-08-01','2017-08-06','2017-08-11','2017-08-16','2017-08-21']
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '汇总',
        type : 'line',
        smooth : true,
        data : [ 947, 948, 949, 971,902, 973]
      },{
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
        data : [ 52, 59, 71, 76, 91, 97]
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
  function drawEnvironmentGas(id) {
    var dataBJ = [ [ 1, 55, 9, 56, 6, "良" ], [ 2, 25, 11, 21, 9, "优" ],
        [ 3, 56, 7, 63, 5, "良" ], [ 4, 33, 7, 29, 6, "优" ]];

    var dataGZ = [ [ 1, 26, 37, 27, 13, "优" ], [ 2, 85, 62, 71, 8, "良" ],
        [ 3, 78, 38, 74, 7, "良" ], [ 4, 21, 21, 36, 9, "优" ]];

    var dataSH = [ [ 1, 91, 45, 125, 23, "良" ], [ 2, 65, 27, 78, 29, "良" ],
        [ 3, 83, 60, 84, 27, "良" ], [ 4, 109, 81, 121, 51, "轻度污染" ]];

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
      color : [ '#5bb4d9', '#f47564', '#4fc3b9', '#f39c12', '#1da02b',
          '#63869e' ],
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
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap : {
        show : false,
        min : 80,
        max : 600,
        inRange : {
          colorLightness : [ 0, 1 ]
        }
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
        itemStyle : {
          normal : {
            color : '#c23531'
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