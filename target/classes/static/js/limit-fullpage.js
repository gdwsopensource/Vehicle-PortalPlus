(function() {
  // 数据
  // 初始化
  dateFormat();
  getTime();
  var getMapCount = 1;
  getMap('');
  setInterval(function() {
    var fileName = 'data/limit-fullpage-cross-' + getMapCount + '.json';
    getMap(fileName);
    getMapCount++;
    if (getMapCount > 3) {
      getMapCount = 1;
    }
  }, 5000);
  // 执行函数
  fly();
  // drawMsgPie1("msg-pie1", 50, 350);
  // drawMsgPie2("msg-pie2", 20000, 100000);
  drawMsgPie("msg-pie1", 1145236, (1145236+1852235), "外牌车辆");
  drawMsgPie("msg-pie2", 6000, 10000, "外牌违章车辆");
  drawNonlocalratio("nonlocalratio");
  drawNonlocalown("nonlocalown");
  drawCrowdload("crowdload");
  drawCrowdtime("crowdtime");
  // drawGauge("quota-day", 20, "早高峰平均速度");
  // drawGauge("quota-night", 24, "晚高峰平均速度");

  // drawGauge2("quota-day", 20, 24, "早晚高峰平均速度");
  drawGauge("quota-day", 25, "高峰平均车速");
  drawGauge3("quota-night", 63, "公共交通出行使用率");

  //drawGauge4("totalnumber", 60, "外牌车辆管理指数");

  // drawQuota("quota");
  dynamic();

  // 绑定事件

  // 自定义函数
  function colorRgba(a) {
    a = a || 1;
    return [ 'rgba(91,180,217,' + a + ')', 'rgba(244,117,100,' + a + ')',
        'rgba(79,195,186,' + a + ')', 'rgba(243,156,18,' + a + ')',
        'rgba(64,199,129,' + a + ')', 'rgba(149,161,194,' + a + ')' ];
  };
  function dateFormat() {
    Date.prototype.format = function(fmt) { // author: meizz
      var weekday = new Array(7)
      weekday[0] = "周日"
      weekday[1] = "周一"
      weekday[2] = "周二"
      weekday[3] = "周三"
      weekday[4] = "周四"
      weekday[5] = "周五"
      weekday[6] = "周六"
      var o = {
        "M+" : this.getMonth() + 1, // 月份
        "d+" : this.getDate(), // 日
        "H+" : this.getHours(), // 小时
        "m+" : this.getMinutes(), // 分
        "s+" : this.getSeconds(), // 秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
        "S" : this.getMilliseconds(), // 毫秒
        "W" : weekday[this.getDay()]
      // 周几
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
      for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
              : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  }
  function getTime() {
    var timeRealObj = $("#time-real");
    timeRealObj.html(new Date().format("yyyy-MM-dd W HH:mm:ss"));
    setInterval(function() {
      timeRealObj.html(new Date().format("yyyy-MM-dd W HH:mm:ss"));
    }, 1000);
  }
  function getMap(fileName) {
    $.get(fileName, function(data) {
      var len = data.length;
      if (len) {
        var scatterData = [];
        for (var i = 0; i < len; i += 2) {
          var colorNum = parseInt(data[i].count);
          colorNum = parseInt(255 - (colorNum / 10));
          if (colorNum < 0) {
            colorNum = 0;
          }
          if (colorNum > 255) {
            colorNum = 255;
          }
          scatterData[i / 2] = {
            name : data[i].road,
            value : [ data[i].long, data[i].lat ],
            count : data[i].count,
            symbolSize : 10,
            itemStyle : {
              normal : {
                color : 'rgba(255,' + colorNum + ',51,0.8)',
                shadowBlur : 10,
                shadowColor : 'rgba(255,255,255,0.8)'
              }
            }
          }
        }
        drawMap("map", scatterData);
      } else {
        drawMap("map");
      }
    });
  }
  function drawMap(id, scatterData) {
    // 箭头的颜色表示拥堵量，宽度表示车流量
    // 1-10
    var lines = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    $.get('data/guangzhou.json', function(GuangZhouJson) {
      echarts.registerMap('guangzhou', GuangZhouJson);
      var chart = echarts.init(document.getElementById(id));
      // 113.325828,23.099192
      var option = null;
      option = {
        geo : {
          show : true,
          map : 'guangzhou',
          roam : true,
          center : [ 113.5, 23.25 ],
          zoom : 1.2,
          label : {
            normal : {
              show : true,
              textStyle : {
                color : '#30A0D0',
                fontSize : 12
              }
            },
            emphasis : {
              show : true,
              textStyle : {
                color : '#204080',
                fontSize : 24
              }
            }
          },
          itemStyle : {
            normal : {
              areaColor : '#204080',
              borderColor : '#30A0D0',
              borderWidth : 3
            },
            emphasis : {
              areaColor : '#30A0D0',
              borderWidth : 10
            }
          }
        },
        series : [ {
          name : '卡口流量',
          type : 'scatter',
          coordinateSystem : 'geo',
          data : scatterData || [],
          symbolSize : 12,
        } ]
      };
      chart.setOption(option);
      $(window).on("resize", function() {
        chart.resize();
      })

    });
  }
  function drawMsgPie(id, crowdRoad, totalRoad, text) {
    var totalRoad = parseInt(totalRoad);
    var crowdRoad = parseInt(crowdRoad);
    var crowdRatio = Math.round(crowdRoad / totalRoad * 100);
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {        
      title : {
        x : 'center',
        text : text,
        subtext : crowdRoad + '辆',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        },
        subtextStyle : {
          fontSize : 16,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '80%' ],
        center : [ '50%', '60%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            position : 'center',
            textStyle : {
              fontSize : 20,
              color : '#FFFFFF'
            }
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : [ {
          value : crowdRatio,
          name : crowdRatio + '%'
        }, {
          value : 100 - crowdRatio,
          name : ''
        }, ],
        color : ['rgba(91,180,217,1)','rgba(91,180,217,0.2)']
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawMsgPie1(id, crowdRoad, totalRoad) {
    var totalRoad = parseInt(totalRoad);
    var crowdRoad = parseInt(crowdRoad);
    var crowdRatio = Math.round(crowdRoad / totalRoad * 100);
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {
        x : 'center',
        text : '拥堵路段',
        subtext : crowdRoad + '条',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        },
        subtextStyle : {
          fontSize : 16,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '80%' ],
        center : [ '50%', '60%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            position : 'center',
            textStyle : {
              fontSize : 20,
              color : '#FFFFFF'
            }
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : [ {
          value : crowdRatio,
          name : crowdRatio + '%'
        }, {
          value : 100 - crowdRatio,
          name : ''
        }, ],
        color : ['rgba(91,180,217,1)','rgba(91,180,217,0.2)']
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawMsgPie2(id, nonlocalCar, totalCar) {
    var nonlocalCar = parseInt(nonlocalCar);
    var totalCar = parseInt(totalCar);
    var nonlocalRatio = Math.round(nonlocalCar / totalCar * 100);
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {

        x : 'center',
        text : '外牌车辆',
        subtext : nonlocalCar + '辆',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        },
        subtextStyle : {
          fontSize : 16,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '80%' ],
        center : [ '50%', '60%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            position : 'center',
            textStyle : {
              fontSize : 20,
              color : '#FFFFFF'
            }
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : [ {
          value : nonlocalRatio,
          name : nonlocalRatio + '%'
        }, {
          value : 100 - nonlocalRatio,
          name : ''
        }, ],
        color : ['rgba(91,180,217,1)','rgba(91,180,217,0.2)']
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawNonlocalratio(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
        color : colorRgba(), 
      title : {
        text : '今日外牌车',
        x : 'center',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'pie',
        radius : '40%',
        center : [ '50%', '60%' ],
        data : [ {
          value : 1852235,
          name : '广州市\n车牌'
        } , {
          value : 1145236,
          name : '外地\n车牌'
        }],
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
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawNonlocalown(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
        color : colorRgba(), 
      title : {
        text : '今日外牌车归属地',
        x : 'center',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'pie',
        radius : '55%',
        center : [ '50%', '60%' ],
        roseType : 'radius',
        data : [ {
          value : 10,
          name : '佛山市'
        }, {
          value : 5,
          name : '惠州市'
        }, {
          value : 15,
          name : '东莞市'
        }, {
          value : 10,
          name : '广东省\n其他市'
        }, {
          value : 20,
          name : '其他省'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCrowdload(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
        color : colorRgba(), 
      title : {
        text : '今日拥堵路段',
        x : 'center',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      legend : {
        data : [ '本地车牌占比', '外地车牌占比' ],
        right : '40',
        top : '45',
        textStyle : {
          color : '#FFFFFF'
        }
      },
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        },
        formatter : "{b}<br>{c}"
      },
      grid : {
        left : '5',
        right : '90',
        bottom : '25',
        top : '80',
        containLabel : true
      },
      xAxis : {
        type : 'value',
        name : '拥堵指数',
        boundaryGap : [ 0, 0.01 ],
        axisLabel : {
          textStyle : {
            color : '#FFFFFF'
          }
        },
        min : 0,
        nameTextStyle : {
          color : '#FFFFFF'
        }
      },
      // 注意数据是从下到上
      yAxis : {
        type : 'category',
        name : '拥堵路段',
        data : [ '机场高速公路', '江海大道', '环城高速',
            '东风东路' ,'广园快速路', '广佛高速路','黄埔大道西','江南大道中'],
        axisLabel : {
          textStyle : {
            color : '#FFFFFF',
            fontSize : 12
          }
        },
        nameTextStyle : {
          color : '#FFFFFF'
        }
      },
      series : [ {
        name : '本地车牌占比',
        type : 'bar',
        barWidth : '60%',
        stack : '合并',
        data : [ 0.92,0.93,1.05,1.02,1.12,1.13,1.25,1.22 ]
      }, {
        name : '外地车牌占比',
        type : 'bar',
        stack : '合并',
        barWidth : '60%',
        data : [ 0.85,0.9,0.95,1.0,1.05,1.1,1.15,1.2 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCrowdtime(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    var dateStart=(new Date).getHours();
    var dateArr=[];
    for(var i=dateStart+1;i<24;i++){
      dateArr.push(i);
    }
    for(var i=0;i<dateStart+1;i++){
      dateArr.push(i);
    }
    option = {
        color : colorRgba(), 
      title : {
        text : '拥堵延时指数与外牌车占比关系',
        x : 'center',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      grid : {
        left : '30',
        right : '50',
        bottom : '25',
        top : '80',
        containLabel : true
      },
      xAxis : {
        type : 'category',
        name:'时',
        boundaryGap : false,
        data : dateArr,
        axisLabel : {
          textStyle : {
            color : '#FFFFFF'
          }
        },
        nameTextStyle : {
          color : '#FFFFFF'
        }
      },
      yAxis : {
        type : 'value',
        axisLabel : {
          textStyle : {
            color : '#FFFFFF'
          }
        },
        nameTextStyle : {
          color : '#FFFFFF'
        }
      },
      legend : {
        data : [  '拥堵延时指数' ,'外牌车辆占比'],
        top : '45',
        textStyle : {
          color : '#FFFFFF'
        }
      },
      series : [  {
        name : '拥堵延时指数',
        type : 'line',
        data : [ 1.2, 1.2, 1.2, 1.3, 1.8, 1.2, 1.3, 1.25, 1.2 , 1.6, 1.25, 1.2, 1.2, 1.2, 1.2, 1.21, 1.22, 1.2, 1.23, 1.25, 1.2 , 1.3, 1.25, 1.2]
      } ,{
        name : '外牌车辆占比',
        type : 'line',
        data : [ 0.51, 0.49, 0.48, 0.7, 0.53, 0.51, 0.50, 0.49, 0.6, 0.50, 0.49, 0.5 ,0.51, 0.49, 0.48, 0.53, 0.53, 0.51, 0.50, 0.49, 0.5, 0.50, 0.49, 0.5  ]
      }]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawQuota(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
        color : colorRgba(), 
      title : {
        text : '今日指标',
        x : '40',
        y : '20',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      legend : {
        data : [ '今日', '昨日' ],
        right : 40,
        top : 20,
        textStyle : {
          color : '#FFFFFF'
        }
      },
      radar : {
        // shape: 'circle',
        name : {
          textStyle : {
            color : '#FFFFFF'
          }
        },
        indicator : [ {
          name : '外牌车占比',
          max : 100
        }, {
          name : '外牌车违章数',
          max : 1000
        }, {
          name : '外牌车违章执法成功率',
          max : 100
        }, {
          name : '拥堵事件数',
          max : 1000
        }, {
          name : '拥堵延时指数',
          max : 5
        } ]
      },
      series : [ {
        type : 'radar',
        // areaStyle: {normal: {}},
        data : [ {
          name : '今日',
          value : [ 20, 300, 40, 200, 1.8 ]
        }, {
          name : '昨日',
          value : [ 15, 400, 50, 120, 1.6 ]
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawGauge(id, value, title) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {
        text : title || '',
        x : 'center',
        y : '0',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'gauge',
        center:['50%','65%'],
        radius : '70%',
        detail : {
          formatter : '{value}km/h',
          textStyle : {
            fontSize : 12
          },
          offsetCenter : [ 0, '20%' ]
        },
        data : [ {
          value : value
        } ],
        min : 0,
        max : 70,
        splitNumber : 7,
        axisLine : {
          show : true,
          lineStyle : {
            width : 15,
            color : [ [ 0.2, 'rgb(255,0,51)' ], [ 0.4, 'rgb(255,51,51)' ],
                [ 0.6, 'rgb(255,102,51)' ], [ 0.8, 'rgb(255,153,51)' ],
                [ 1.0, 'rgb(255,204,51)' ] ]
          }
        },
        splitLine : {
          length : 15
        },
        pointer : {
          length : '50%',
          width : 5
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawGauge2(id, value1, value2, title) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {
        text : title || '',
        x : 'center',
        y : '0',
        textStyle : {
          fontSize : 12,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'gauge',
        radius : '70%',
        detail : {
          show : true,
          formatter : '{value}km/h',
          textStyle : {
            fontSize : 12
          },
          offsetCenter : [ 0, '20%' ]
        },
        data : [ {
          value : value1
        }, {
          value : value2
        } ],
        min : 0,
        max : 70,
        splitNumber : 7,
        axisLine : {
          show : true,
          lineStyle : {
            width : 15,
            color : [ [ 0.2, 'rgb(255,0,51)' ], [ 0.4, 'rgb(255,51,51)' ],
                [ 0.6, 'rgb(255,102,51)' ], [ 0.8, 'rgb(255,153,51)' ],
                [ 1.0, 'rgb(255,204,51)' ] ]
          }
        },
        splitLine : {
          length : 15
        },
        pointer : {
          length : '50%',
          width : 5
        },
        itemStyle : {
          normal : {
            color : 'auto'
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawGauge3(id, value, title) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {
        text : title || '',
        x : 'center',
        y : '0',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'gauge',
        center:['50%','65%'],
        radius : '70%',
        detail : {
          formatter : '{value}%',
          textStyle : {
            fontSize : 12
          },
          offsetCenter : [ 0, '20%' ]
        },
        data : [ {
          value : value
        } ],
        min : 0,
        max : 100,
        splitNumber : 10,
        axisLine : {
          show : true,
          lineStyle : {
            width : 15,
            color : [ [ 0.2, 'rgb(255,0,51)' ], [ 0.4, 'rgb(255,51,51)' ],
                [ 0.6, 'rgb(255,102,51)' ], [ 0.8, 'rgb(255,153,51)' ],
                [ 1.0, 'rgb(255,204,51)' ] ]
          }
        },
        splitLine : {
          length : 15
        },
        pointer : {
          length : '50%',
          width : 5
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawGauge4(id, value, title) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      title : {
        text : title || '',
        x : 'center',
        y : '0',
        textStyle : {
          fontSize : 20,
          color : '#FFFFFF'
        }
      },
      series : [ {
        type : 'gauge',
        radius : '70%',
        detail : {
          formatter : '{value}',
          textStyle : {
            fontSize : 20
          },
          offsetCenter : [ 0, '20%' ]
        },
        data : [ {
          value : value
        } ],
        min : 0,
        max : 100,
        splitNumber : 10,
        axisLine : {
          show : true,
          lineStyle : {
            width : 15,
            color : [ [ 0.2, 'rgb(255,0,51)' ], [ 0.4, 'rgb(255,51,51)' ],
                [ 0.6, 'rgb(255,102,51)' ], [ 0.8, 'rgb(255,153,51)' ],
                [ 1.0, 'rgb(255,204,51)' ] ]
          }
        },
        splitLine : {
          length : 15
        },
        pointer : {
          length : '50%',
          width : 5
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function dynamic() {
    var warningBodyUl = $("#warning-body>ul");
    /*
     * var tDynamicFast = setInterval(function() { // ajax后台获取数据 var liH =
     * warningBodyUl.find("li").height(); var nowDate = new Date; var nowHourMin =
     * nowDate.getHours() + ":" + nowDate.getMinutes(); var random3 = 100 +
     * Math.floor(Math.random() * 900); var random5 = 10000 +
     * Math.floor(Math.random() * 90000); warningBodyUl.animate({ 'marginTop' :
     * liH + "px" }, 500, function() { warningBodyUl.prepend('<li><span
     * class="fa fa-star"></span> <span>' + nowHourMin + '</span> <span>粤A' +
     * random5 + '</span> <span>黄埔大道' + random3 + '号</span> <span>多次违章</span></li>');
     * warningBodyUl.css({ 'marginTop' : 0 }); });
     *  }, 1000);
     */
    var tDynamicSlow = setInterval(function() {
      /*
       * var randomRoad = 30 + Math.floor(Math.random() * 60);
       * drawMsgPie1("msg-pie1", randomRoad, 350); var randomNonlocalCar = 18000 +
       * Math.floor(Math.random() * 4000); drawMsgPie2("msg-pie2",
       * randomNonlocalCar, 100000);
       */
      var random1 = 959845 + Math.floor(Math.random() * 100000);
      var random2 = 5000 + Math.floor(Math.random() * 3000);
      drawMsgPie("msg-pie1", random1, (1145236+1852235), "外牌车辆");
      drawMsgPie("msg-pie2", random2, 10000, "外牌违章车辆");
    }, 5000);
  }
  function fly() {
    var i = 800;
    var tFly = setInterval(function() {
      $("#map").css('top', i / 10 + "%");
      i -= 5;
      if (i <= 0) {
        clearInterval(tFly);
      }
    }, 30)
  }
})(jQuery)
