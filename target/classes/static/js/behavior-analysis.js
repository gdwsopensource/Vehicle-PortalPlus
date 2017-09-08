(function($) {
  // 初始化
  dateFormat();
  initDraw();

  // 执行函数
  $("#total-search-daterange").daterangepicker();
  $("#car-search-daterange").daterangepicker();
  $("#cars-search-daterange").daterangepicker();
  var tempCarStr = '<button class="btn btn-warning cars-list">粤A12345</button><button class="btn btn-warning cars-list">粤A56789</button>';
  $(".cars-list-box").append(tempCarStr);

  // 绑定事件
  $("#cars-add").on(
      'click',
      function() {
        var plateNo = $("#cars-search-plateno").val();
        if (plateNo.length == 7) {
          var addCarStr = '<button class="btn btn-warning cars-list">'
              + plateNo + '</button>';
          $(".cars-list-box").append(addCarStr);
          $(".cars-list").click(function() {
            $(this).remove();
          });
        }
      });
  $(".cars-list").click(function() {
    $(this).remove();
  });

  $("#menu-total").on('click', showTotal);
  $("#menu-car").on('click', showCar);
  $("#menu-cars").on('click', showCars);
  $(".btn-search-week").on('click', function() {
    $(".search-datarange").val(quickTime(6));
  });
  $(".btn-search-month").on('click', function() {
    $(".search-datarange").val(quickTime(29));
  });
  $(".btn-search-year").on('click', function() {
    $(".search-datarange").val(quickTime(364));
  });

  /* 第二套数据 */
  var isTotal = false;
  var isCar = false;
  var isCars = false;
  $("#total-submit-button").on('click', function() {
    if (isTotal) {
      isTotal = !isTotal;
      drawTotalCarown("draw-total-carown");
      drawTotalCarpro("draw-total-carpro");
      drawTotalCarcount("draw-total-carcount");
    } else {
      isTotal = !isTotal;
      drawTotalCarown2("draw-total-carown");
      drawTotalCarpro2("draw-total-carpro");
      drawTotalCarcount2("draw-total-carcount");
    }
  })
  $("#car-submit-button").on('click', function() {
    if (isCar) {
      isCar = !isCar;
      drawCarDay("draw-car-day");
      drawCarActive("draw-car-active");
      drawCarWeek("draw-car-week");
      drawCarCrosspie("draw-car-crosspie");
      drawCarCrosssingle("draw-car-crosssingle");
    } else {
      isCar = !isCar;
      drawCarDay2("draw-car-day");
      drawCarActive2("draw-car-active");
      drawCarWeek2("draw-car-week");
      drawCarCrosspie2("draw-car-crosspie");
      drawCarCrosssingle2("draw-car-crosssingle");
    }
  })
  $("#cars-submit-button").on('click', function() {
    if (isCars) {
      isCars = !isCars;
      drawCarsDay("draw-cars-day");
      drawCarsActive("draw-cars-active");
      drawCarsCross("draw-cars-cross");
      drawCarsOverlap("draw-cars-overlap");
    } else {
      isCars = !isCars;
      drawCarsDay2("draw-cars-day");
      drawCarsActive2("draw-cars-active");
      drawCarsCross2("draw-cars-cross");
      drawCarsOverlap2("draw-cars-overlap");
    }
  })
  // 自定义函数
  function initDraw() {
    showTotal();
  }
  function dateFormat() {
    Date.prototype.format = function(fmt) { // author: meizz
      var o = {
        "M+" : this.getMonth() + 1, // 月份
        "d+" : this.getDate(), // 日
        "H+" : this.getHours(), // 小时
        "m+" : this.getMinutes(), // 分
        "s+" : this.getSeconds(), // 秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
        "S" : this.getMilliseconds()
      // 毫秒
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
  function showTotal() {
    $(".tab-head .menu").removeClass("active");
    $(".tab-head #menu-total").addClass("active");
    $("#tab-car").hide();
    $("#tab-cars").hide();
    $("#tab-total").show();
    drawTotalCarown("draw-total-carown");
    drawTotalCarpro("draw-total-carpro");
    drawTotalCarcount("draw-total-carcount");
  }

  function showCar() {
    $(".tab-head .menu").removeClass("active");
    $(".tab-head #menu-car").addClass("active");
    $("#tab-total").hide();
    $("#tab-cars").hide();
    $("#tab-car").show();

    drawCarDay("draw-car-day");
    drawCarActive("draw-car-active");
    drawCarWeek("draw-car-week");
    drawCarCrosspie("draw-car-crosspie");
    drawCarCrosssingle("draw-car-crosssingle");
  }

  function showCars() {
    $(".tab-head .menu").removeClass("active");
    $(".tab-head #menu-cars").addClass("active");
    $("#tab-total").hide();
    $("#tab-car").hide();
    $("#tab-cars").show();
    drawCarsDay("draw-cars-day");
    drawCarsActive("draw-cars-active");
    drawCarsCross("draw-cars-cross");
    drawCarsOverlap("draw-cars-overlap");
  }
  function quickTime(day) {
    var ms = parseInt(day) * 24 * 60 * 60 * 1000;
    var endTime = new Date().getTime();
    var endDay = new Date().format("MM/dd/yyyy");
    var startTime = parseInt(endTime) - ms;
    var tempDate = new Date();
    tempDate.setTime(startTime);
    var startDay = tempDate.format("MM/dd/yyyy");
    return startDay + " - " + endDay;
  }

  function drawTotalCarown(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'item',
        formatter : "{b}<br />{c} ({d}%)"
      },
      legend : {
        orient : 'vertical',
        x : 'left',
        data : [ '广州', '佛山', '东莞', '清远' ]
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '70%' ],
        avoidLabelOverlap : false,
        data : [ {
          value : 335,
          name : '广州'
        }, {
          value : 310,
          name : '佛山'
        }, {
          value : 234,
          name : '东莞'
        }, {
          value : 135,
          name : '清远'
        }, {
          value : 1548,
          name : '福州'
        } ]
      }, {
        type : 'pie',
        radius : [ '0%', '45%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            position : 'inner'
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : [ {
          value : 1014,
          name : '省内'
        }, {
          value : 1548,
          name : '省外'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawTotalCarpro(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },

      grid : {
        top : '3%',
        left : '3%',
        right : '4%',
        bottom : '5%',
        containLabel : true
      },
      xAxis : {
        type : 'value',
        boundaryGap : [ 0, 0.01 ],
        axisLabel : {
          interval : 0,
          rotate : 30,// 倾斜度 -90 至 90 默认为0
          margin : 5,
          textStyle : {
            fontWeight : "normal",
            color : "#000000"
          }
        }
      },
      yAxis : {
        type : 'category',
        data :  [  '物流' , '旅行', '教练', '通勤', '运营','自用']
      },
      series : [ {
        name : '车辆性质排名',
        type : 'bar',
        data : [ 18203, 23489, 29034, 104970, 131744, 630230 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawTotalCarcount(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ '#3c8dbc' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
          type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        data : [ '1-5', '6-10', '11-15', '16-20', '20-25', '>26' ],
        axisTick : {
          alignWithLabel : true
        }
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        type : 'bar',
        barWidth : '60%',
        data : [ 1000, 5200, 2000, 3340, 3900, 3300 ]
      } ]
    };
    chart.setOption(option);

    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarDay(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross'
        }
      },
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30',
            '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15',
            '17:30', '18:45', '20:00', '21:15', '22:30', '23:45' ]
      },
      yAxis : {
        type : 'value',
        axisLabel : {
          formatter : '{value}'
        },
        axisPointer : {
          snap : true
        }
      },
      visualMap : {
        show : false,
        dimension : 0,
        pieces : [ {
          lte : 6,
          color : 'green'
        }, {
          gt : 6,
          lte : 8,
          color : 'red'
        }, {
          gt : 8,
          lte : 14,
          color : 'green'
        }, {
          gt : 14,
          lte : 17,
          color : 'red'
        }, {
          gt : 17,
          color : 'green'
        } ]
      },
      series : [ {
        name : '频次',
        type : 'line',
        smooth : true,
        data : [ 300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390,
            400, 500, 600, 750, 800, 700, 600, 400 ],
        markArea : {
          data : [ [ {
            name : '早高峰',
            xAxis : '07:30'
          }, {
            xAxis : '10:00'
          } ], [ {
            name : '晚高峰',
            xAxis : '17:30'
          }, {
            xAxis : '21:15'
          } ] ]
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarActive(id) {
    var hours = [ '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a',
        '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p',
        '9p', '10p', '11p' ];
    var days = [ 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday',
        'Monday', 'Sunday' ];
    var data = [ [ 0, 0, 5 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 0 ],
        [ 0, 4, 0 ], [ 0, 5, 0 ], [ 0, 6, 0 ], [ 0, 7, 0 ], [ 0, 8, 0 ],
        [ 0, 9, 0 ], [ 0, 10, 0 ], [ 0, 11, 2 ], [ 0, 12, 4 ], [ 0, 13, 1 ],
        [ 0, 14, 1 ], [ 0, 15, 3 ], [ 0, 16, 4 ], [ 0, 17, 6 ], [ 0, 18, 4 ],
        [ 0, 19, 4 ], [ 0, 20, 3 ], [ 0, 21, 3 ], [ 0, 22, 2 ], [ 0, 23, 5 ],
        [ 1, 0, 7 ], [ 1, 1, 0 ], [ 1, 2, 0 ], [ 1, 3, 0 ], [ 1, 4, 0 ],
        [ 1, 5, 0 ], [ 1, 6, 0 ], [ 1, 7, 0 ], [ 1, 8, 0 ], [ 1, 9, 0 ],
        [ 1, 10, 5 ], [ 1, 11, 2 ], [ 1, 12, 2 ], [ 1, 13, 6 ], [ 1, 14, 9 ],
        [ 1, 15, 11 ], [ 1, 16, 6 ], [ 1, 17, 7 ], [ 1, 18, 8 ], [ 1, 19, 12 ],
        [ 1, 20, 5 ], [ 1, 21, 5 ], [ 1, 22, 7 ], [ 1, 23, 2 ], [ 2, 0, 1 ],
        [ 2, 1, 1 ], [ 2, 2, 0 ], [ 2, 3, 0 ], [ 2, 4, 0 ], [ 2, 5, 0 ],
        [ 2, 6, 0 ], [ 2, 7, 0 ], [ 2, 8, 0 ], [ 2, 9, 0 ], [ 2, 10, 3 ],
        [ 2, 11, 2 ], [ 2, 12, 1 ], [ 2, 13, 9 ], [ 2, 14, 8 ], [ 2, 15, 10 ],
        [ 2, 16, 6 ], [ 2, 17, 5 ], [ 2, 18, 5 ], [ 2, 19, 5 ], [ 2, 20, 7 ],
        [ 2, 21, 4 ], [ 2, 22, 2 ], [ 2, 23, 4 ], [ 3, 0, 7 ], [ 3, 1, 3 ],
        [ 3, 2, 0 ], [ 3, 3, 0 ], [ 3, 4, 0 ], [ 3, 5, 0 ], [ 3, 6, 0 ],
        [ 3, 7, 0 ], [ 3, 8, 1 ], [ 3, 9, 0 ], [ 3, 10, 5 ], [ 3, 11, 4 ],
        [ 3, 12, 7 ], [ 3, 13, 14 ], [ 3, 14, 13 ], [ 3, 15, 12 ],
        [ 3, 16, 9 ], [ 3, 17, 5 ], [ 3, 18, 5 ], [ 3, 19, 10 ], [ 3, 20, 6 ],
        [ 3, 21, 4 ], [ 3, 22, 4 ], [ 3, 23, 1 ], [ 4, 0, 1 ], [ 4, 1, 3 ],
        [ 4, 2, 0 ], [ 4, 3, 0 ], [ 4, 4, 0 ], [ 4, 5, 1 ], [ 4, 6, 0 ],
        [ 4, 7, 0 ], [ 4, 8, 0 ], [ 4, 9, 2 ], [ 4, 10, 4 ], [ 4, 11, 4 ],
        [ 4, 12, 2 ], [ 4, 13, 4 ], [ 4, 14, 4 ], [ 4, 15, 14 ], [ 4, 16, 12 ],
        [ 4, 17, 1 ], [ 4, 18, 8 ], [ 4, 19, 5 ], [ 4, 20, 3 ], [ 4, 21, 7 ],
        [ 4, 22, 3 ], [ 4, 23, 0 ], [ 5, 0, 2 ], [ 5, 1, 1 ], [ 5, 2, 0 ],
        [ 5, 3, 3 ], [ 5, 4, 0 ], [ 5, 5, 0 ], [ 5, 6, 0 ], [ 5, 7, 0 ],
        [ 5, 8, 2 ], [ 5, 9, 0 ], [ 5, 10, 4 ], [ 5, 11, 1 ], [ 5, 12, 5 ],
        [ 5, 13, 10 ], [ 5, 14, 5 ], [ 5, 15, 7 ], [ 5, 16, 11 ], [ 5, 17, 6 ],
        [ 5, 18, 0 ], [ 5, 19, 5 ], [ 5, 20, 3 ], [ 5, 21, 4 ], [ 5, 22, 2 ],
        [ 5, 23, 0 ], [ 6, 0, 1 ], [ 6, 1, 0 ], [ 6, 2, 0 ], [ 6, 3, 0 ],
        [ 6, 4, 0 ], [ 6, 5, 0 ], [ 6, 6, 0 ], [ 6, 7, 0 ], [ 6, 8, 0 ],
        [ 6, 9, 0 ], [ 6, 10, 1 ], [ 6, 11, 0 ], [ 6, 12, 2 ], [ 6, 13, 1 ],
        [ 6, 14, 3 ], [ 6, 15, 4 ], [ 6, 16, 0 ], [ 6, 17, 0 ], [ 6, 18, 0 ],
        [ 6, 19, 0 ], [ 6, 20, 1 ], [ 6, 21, 2 ], [ 6, 22, 2 ], [ 6, 23, 6 ] ];
    data = data.map(function(item) {
      return [ item[1], item[0], item[2] || '-' ];
    });
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        position : 'top'
      },
      animation : false,
      grid : {
        top : '3%',
        left : '6%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : {
        type : 'category',
        data : hours,
        splitArea : {
          show : true
        }
      },
      yAxis : {
        type : 'category',
        data : days,
        splitArea : {
          show : true
        }
      },
      visualMap : {
        min : 0,
        max : 10,
        calculable : true,
        orient : 'vertica ',
        left : 0,
      // bottom: '15%'
      },
      series : [ {
        name : 'Punch Card',
        type : 'heatmap',
        data : data,
        label : {
          normal : {
            show : true
          }
        },
        itemStyle : {
          emphasis : {
            shadowBlur : 10,
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
  function drawCarWeek(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross',
          label : {
            backgroundColor : '#6a7985'
          }
        }
      },
      legend : {
        data : [ '天河北路388号路段', '广园快速农科院路段', '科韵路中山立交路段', '广州大道中天河北路路段',
            '禺东西路省军区路段', '花城大道广州大道路段' ]
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '天河北路388号路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 120, 132, 101, 134, 90, 230, 210 ]
      }, {
        name : '广园快速农科院路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 220, 182, 191, 234, 290, 330, 310 ]
      }, {
        name : '科韵路中山立交路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 150, 232, 201, 154, 190, 330, 410 ]
      }, {
        name : '广州大道中天河北路路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 320, 332, 301, 334, 390, 330, 320 ]
      }, {
        name : '禺东西路省军区路段',
        type : 'line',
        stack : '总量',
        label : {
          normal : {
            show : true,
            position : 'top'
          }
        },
        areaStyle : {
          normal : {}
        },
        data : [ 820, 932, 901, 934, 1290, 1330, 1320 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarCrosspie(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b}: {c} ({d}%)"
      },

      legend : {
        // orient: 'vertical',
        x : 'left',
        data : [ '天河北路388号路段', '广园快速农科院路段', '科韵路中山立交路段', '广州大道中天河北路路段',
            '禺东西路省军区路段', '花城大道广州大道路段', '临江大道华南快速路段', '临江大道琶洲大桥路段',
            '大观路岭南学院以北路段', '珠吉路桥北路段' ]
      },
      series : [ {
        name : '活跃卡口',
        type : 'pie',
        selectedMode : 'single',
        center : [ '50%', '60%' ],
        radius : [ 0, '30%' ],
        data : [ {
          value : 335,
          name : '临江大道琶洲大桥路段'
        // selected: true
        }, {
          value : 679,
          name : '大观路岭南学院以北路段'
        }, {
          value : 1548,
          name : '其他'
        } ]
      }, {
        name : '访问来源',
        type : 'pie',
        radius : [ '40%', '55%' ],
        center : [ '50%', '60%' ],
        data : [ {
          value : 335,
          name : '广州大道中天河北路路段'
        }, {
          value : 310,
          name : '科韵路中山立交路段'
        }, {
          value : 234,
          name : '广园快速农科院路段'
        }, {
          value : 135,
          name : '天河北路388号路段'
        }, {
          value : 1048,
          name : '禺东西路省军区路段'
        }, {
          value : 251,
          name : '临江大道华南快速路段'
        }, {
          value : 147,
          name : '珠吉路桥北路段'
        }, {
          value : 102,
          name : '花城大道广州大道路段'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarCrosssingle(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis'
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
      },
      yAxis : {
        type : 'value'
      },
      series : [ {
        name : '临江大道华南快速路段',
        type : 'line',
        stack : '总量',
        data : [ 120, 132, 101, 134, 90, 230, 210 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsDay(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross',
          label : {
            backgroundColor : '#6a7985'
          }
        }
      },
      legend : {
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '0-6', '6-12', '12-18', '18-24' ]
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '粤A12345',
        type : 'line',
        data : [ 120, 132, 101, 134 ]
      }, {
        name : '粤A56789',
        type : 'line',
        data : [ 220, 182, 191, 234 ]
      }, {
        name : '粤A11111',
        type : 'line',
        data : [ 150, 232, 201, 154 ]
      }, {
        name : '粤A22222',
        type : 'line',
        data : [ 320, 332, 301, 334 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsActive(id) {
    // [时间0-24，周几1-7，次数100数量级]
    var data = [
        [ [ 0, 7, 100 ], [ 6, 1, 200 ], [ 12, 1, 300 ], [ 18, 1, 400 ],
            [ 24, 1, 200 ] ],
        [ [ 0, 1, 100 ], [ 6, 5, 200 ], [ 12, 6, 300 ], [ 18, 3, 400 ],
            [ 24, 2, 200 ] ],
        [ [ 0, 2, 100 ], [ 6, 4, 200 ], [ 12, 4, 200 ], [ 18, 5, 400 ],
            [ 24, 3, 200 ] ],
        [ [ 0, 5, 100 ], [ 6, 2, 200 ], [ 12, 1, 300 ], [ 18, 7, 400 ],
            [ 24, 2, 200 ] ], ];
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      legend : {
        right : 10,
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      xAxis : {
        minInterval : 1,
        min : 0,
        max : 24,
        splitLine : {
          lineStyle : {
            type : 'dashed'
          }
        }
      },
      yAxis : {
        minInterval : 1,
        min : 1,
        max : 7,
        splitLine : {
          lineStyle : {
            type : 'dashed'
          }
        },
        scale : true
      },
      series : [ {
        name : '粤A12345',
        data : data[0],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A56789',
        data : data[1],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A11111',
        data : data[2],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A22222',
        data : data[3],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsCross(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
          type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend : {
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      grid : {
        top : '10%',
        left : '8%',
        right : '8%',
        bottom : '8%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        axisLabel : {
          rotate : 30,// 倾斜度 -90 至 90 默认为0
        },
        name : '卡口',
        data : [ '琶洲卡口001', '琶洲卡口002', '琶洲卡口003', '琶洲卡口004' ]
      } ],
      yAxis : [ {
        type : 'value',
        name : '次数'
      } ],
      series : [ {
        name : '粤A12345',
        type : 'bar',
        data : [ 320, 332, 301, 334 ]
      }, {
        name : '粤A56789',
        type : 'bar',
        data : [ 120, 132, 101, 134 ]
      }, {
        name : '粤A11111',
        type : 'bar',
        data : [ 220, 182, 191, 234 ]
      }, {
        name : '粤A22222',
        type : 'bar',
        data : [ 150, 232, 201, 154 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsOverlap(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      legend : [ {
        tooltip : {
          show : true
        },
        top : 10,
        selectedMode : 'false',
        data : [ '粤A56789', '粤A11111', '粤A22222' ]
      } ],
      animationDuration : 3000,
      animationEasingUpdate : 'quinticInOut',
      series : [ {
        name : '粤A12345',
        type : 'graph',
        layout : 'force',
        force : {
          repulsion : 400
        },
        data : [ {
          "name" : "粤A12345",
          "value" : 50,
          "symbolSize" : 50,
          "draggable" : "true"
        }, {
          "name" : "粤A56789",
          "value" : 18 / 2,
          "symbolSize" : 18,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A11111",
          "value" : 16 / 2,
          "symbolSize" : 16,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A22222",
          "value" : 5 / 2,
          "symbolSize" : 5,
          "category" : "粤A22222",
          "draggable" : "true"
        }, {
          "name" : "粤A56789-卡口重叠",
          "value" : 10,
          "symbolSize" : 10,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A56789-时间重叠",
          "value" : 8,
          "symbolSize" : 8,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A11111-时间重叠",
          "value" : 7,
          "symbolSize" : 7,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A11111-卡口重叠",
          "value" : 8,
          "symbolSize" : 8,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A22222-卡口重叠",
          "value" : 3,
          "symbolSize" : 3,
          "category" : "粤A22222",
          "draggable" : "true"
        }, {
          "name" : "粤A22222-时间重叠",
          "value" : 2,
          "symbolSize" : 2,
          "category" : "粤A22222",
          "draggable" : "true"
        } ],
        links : [ {
          "source" : "粤A12345",
          "target" : "粤A56789"
        }, {
          "source" : "粤A12345",
          "target" : "粤A11111"
        }, {
          "source" : "粤A12345",
          "target" : "粤A22222"
        }, {
          "source" : "粤A56789",
          "target" : "粤A56789-卡口重叠"
        }, {
          "source" : "粤A56789",
          "target" : "粤A56789-时间重叠"
        }, {
          "source" : "粤A11111",
          "target" : "粤A11111-卡口重叠"
        }, {
          "source" : "粤A11111",
          "target" : "粤A11111-时间重叠"
        }, {
          "source" : "粤A22222",
          "target" : "粤A22222-卡口重叠"
        }, {
          "source" : "粤A22222",
          "target" : "粤A22222-时间重叠"
        } ],
        categories : [ {
          'name' : '粤A56789'
        }, {
          'name' : '粤A11111'
        }, {
          'name' : '粤A22222'
        } ],
        focusNodeAdjacency : true,
        roam : 'scale',
        label : {
          normal : {

            show : true,
            position : 'top',

          }
        },
        lineStyle : {
          normal : {
            color : 'source',
            curveness : 0,
            type : "solid"
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }

  /* 第二套数据 */
  function drawTotalCarown2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'item',
        formatter : "{b}<br />{c} ({d}%)"
      },
      legend : {
        orient : 'vertical',
        x : 'left',
        data : [ '广州', '佛山', '东莞', '清远' ]
      },
      series : [ {
        type : 'pie',
        radius : [ '50%', '70%' ],
        avoidLabelOverlap : false,
        data : [ {
          value : 365,
          name : '广州'
        }, {
          value : 320,
          name : '佛山'
        }, {
          value : 204,
          name : '东莞'
        }, {
          value : 105,
          name : '清远'
        }, {
          value : 1348,
          name : '福州'
        } ]
      }, {
        type : 'pie',
        radius : [ '0%', '45%' ],
        avoidLabelOverlap : false,
        label : {
          normal : {
            position : 'inner'
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : [ {
          value : 994,
          name : '省内'
        }, {
          value : 1348,
          name : '省外'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawTotalCarpro2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {

      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'shadow'
        }
      },

      grid : {
        top : '3%',
        left : '3%',
        right : '4%',
        bottom : '5%',
        containLabel : true
      },
      xAxis : {
        type : 'value',
        boundaryGap : [ 0, 0.01 ],
        axisLabel : {
          interval : 0,
          rotate : 30,// 倾斜度 -90 至 90 默认为0
          margin : 5,
          textStyle : {
            fontWeight : "normal",
            color : "#000000"
          }
        }
      },
      yAxis : {
        type : 'category',
        data : [  '物流' , '旅行', '教练', '通勤', '运营','自用']
      },
      series : [ {
        name : '车辆性质排名',
        type : 'bar',
        data : [ 16203, 21489, 23034, 101970, 111744, 430230 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawTotalCarcount2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ '#3c8dbc' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
          type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        data : [ '1-5', '6-10', '11-15', '16-20', '20-25', '>26' ],
        axisTick : {
          alignWithLabel : true
        }
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        type : 'bar',
        barWidth : '60%',
        data : [ 1300, 4200, 3000, 3240, 3500, 3200 ]
      } ]
    };
    chart.setOption(option);

    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarDay2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross'
        }
      },
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30',
            '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15',
            '17:30', '18:45', '20:00', '21:15', '22:30', '23:45' ]
      },
      yAxis : {
        type : 'value',
        axisLabel : {
          formatter : '{value}'
        },
        axisPointer : {
          snap : true
        }
      },
      visualMap : {
        show : false,
        dimension : 0,
        pieces : [ {
          lte : 6,
          color : 'green'
        }, {
          gt : 6,
          lte : 8,
          color : 'red'
        }, {
          gt : 8,
          lte : 14,
          color : 'green'
        }, {
          gt : 14,
          lte : 17,
          color : 'red'
        }, {
          gt : 17,
          color : 'green'
        } ]
      },
      series : [ {
        name : '频次',
        type : 'line',
        smooth : true,
        data : [ 750, 800, 700, 600, 400, 300, 280, 250, 260, 270, 300, 550,
            500, 400, 390, 380, 390, 400, 500, 600 ],
        markArea : {
          data : [ [ {
            name : '早高峰',
            xAxis : '07:30'
          }, {
            xAxis : '10:00'
          } ], [ {
            name : '晚高峰',
            xAxis : '17:30'
          }, {
            xAxis : '21:15'
          } ] ]
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarActive2(id) {
    var hours = [ '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a',
        '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p',
        '9p', '10p', '11p' ];
    var days = [ 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday',
        'Monday', 'Sunday' ];
    var data = [ [ 0, 0, 10 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 0 ],
        [ 0, 4, 0 ], [ 0, 5, 0 ], [ 0, 6, 0 ], [ 0, 7, 0 ], [ 0, 8, 0 ],
        [ 0, 9, 0 ], [ 0, 10, 0 ], [ 0, 11, 2 ], [ 0, 12, 4 ], [ 0, 13, 1 ],
        [ 0, 14, 1 ], [ 0, 15, 3 ], [ 0, 16, 4 ], [ 0, 17, 10 ], [ 0, 18, 4 ],
        [ 0, 19, 4 ], [ 0, 20, 5 ], [ 0, 21, 3 ], [ 0, 22, 2 ], [ 0, 23, 5 ],
        [ 1, 0, 7 ], [ 1, 1, 0 ], [ 1, 2, 0 ], [ 1, 3, 0 ], [ 1, 4, 0 ],
        [ 1, 5, 0 ], [ 1, 6, 0 ], [ 1, 7, 0 ], [ 1, 8, 0 ], [ 1, 9, 0 ],
        [ 1, 10, 5 ], [ 1, 11, 2 ], [ 1, 12, 2 ], [ 1, 13, 6 ], [ 1, 14, 9 ],
        [ 1, 15, 11 ], [ 1, 16, 5 ], [ 1, 17, 7 ], [ 1, 18, 8 ], [ 1, 19, 12 ],
        [ 1, 20, 5 ], [ 1, 21, 5 ], [ 1, 22, 7 ], [ 1, 23, 2 ], [ 2, 0, 1 ],
        [ 2, 1, 1 ], [ 2, 2, 0 ], [ 2, 3, 0 ], [ 2, 4, 0 ], [ 2, 5, 0 ],
        [ 2, 6, 0 ], [ 2, 7, 0 ], [ 2, 8, 0 ], [ 2, 9, 0 ], [ 2, 10, 3 ],
        [ 2, 11, 2 ], [ 2, 12, 1 ], [ 2, 13, 9 ], [ 2, 14, 8 ], [ 2, 15, 10 ],
        [ 2, 16, 6 ], [ 2, 17, 5 ], [ 2, 18, 5 ], [ 2, 19, 5 ], [ 2, 20, 7 ],
        [ 2, 21, 4 ], [ 2, 22, 2 ], [ 2, 23, 4 ], [ 3, 0, 7 ], [ 3, 1, 3 ],
        [ 3, 2, 0 ], [ 3, 3, 0 ], [ 3, 4, 0 ], [ 3, 5, 0 ], [ 3, 6, 0 ],
        [ 3, 7, 0 ], [ 3, 8, 1 ], [ 3, 9, 0 ], [ 3, 10, 5 ], [ 3, 11, 4 ],
        [ 3, 12, 7 ], [ 3, 13, 14 ], [ 3, 14, 13 ], [ 3, 15, 12 ],
        [ 3, 16, 9 ], [ 3, 17, 5 ], [ 3, 18, 5 ], [ 3, 19, 10 ], [ 3, 20, 6 ],
        [ 3, 21, 4 ], [ 3, 22, 4 ], [ 3, 23, 1 ], [ 4, 0, 1 ], [ 4, 1, 3 ],
        [ 4, 2, 0 ], [ 4, 3, 0 ], [ 4, 4, 0 ], [ 4, 5, 1 ], [ 4, 6, 0 ],
        [ 4, 7, 0 ], [ 4, 8, 0 ], [ 4, 9, 2 ], [ 4, 10, 4 ], [ 4, 11, 4 ],
        [ 4, 12, 2 ], [ 4, 13, 4 ], [ 4, 14, 4 ], [ 4, 15, 14 ], [ 4, 16, 12 ],
        [ 4, 17, 1 ], [ 4, 18, 8 ], [ 4, 19, 5 ], [ 4, 20, 3 ], [ 4, 21, 7 ],
        [ 4, 22, 3 ], [ 4, 23, 0 ], [ 5, 0, 2 ], [ 5, 1, 1 ], [ 5, 2, 0 ],
        [ 5, 3, 3 ], [ 5, 4, 0 ], [ 5, 5, 0 ], [ 5, 6, 0 ], [ 5, 7, 0 ],
        [ 5, 8, 2 ], [ 5, 9, 0 ], [ 5, 10, 4 ], [ 5, 11, 1 ], [ 5, 12, 5 ],
        [ 5, 13, 10 ], [ 5, 14, 5 ], [ 5, 15, 7 ], [ 5, 16, 11 ], [ 5, 17, 6 ],
        [ 5, 18, 0 ], [ 5, 19, 5 ], [ 5, 20, 3 ], [ 5, 21, 4 ], [ 5, 22, 2 ],
        [ 5, 23, 0 ], [ 6, 0, 1 ], [ 6, 1, 0 ], [ 6, 2, 0 ], [ 6, 3, 0 ],
        [ 6, 4, 0 ], [ 6, 5, 0 ], [ 6, 6, 0 ], [ 6, 7, 0 ], [ 6, 8, 0 ],
        [ 6, 9, 0 ], [ 6, 10, 1 ], [ 6, 11, 0 ], [ 6, 12, 2 ], [ 6, 13, 1 ],
        [ 6, 14, 3 ], [ 6, 15, 4 ], [ 6, 16, 0 ], [ 6, 17, 0 ], [ 6, 18, 0 ],
        [ 6, 19, 3 ], [ 6, 20, 2 ], [ 6, 21, 5 ], [ 6, 22, 8 ], [ 6, 23, 6 ] ];
    data = data.map(function(item) {
      return [ item[1], item[0], item[2] || '-' ];
    });
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        position : 'top'
      },
      animation : false,
      grid : {
        top : '3%',
        left : '6%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : {
        type : 'category',
        data : hours,
        splitArea : {
          show : true
        }
      },
      yAxis : {
        type : 'category',
        data : days,
        splitArea : {
          show : true
        }
      },
      visualMap : {
        min : 0,
        max : 10,
        calculable : true,
        orient : 'vertica ',
        left : 0,
      // bottom: '15%'
      },
      series : [ {
        name : 'Punch Card',
        type : 'heatmap',
        data : data,
        label : {
          normal : {
            show : true
          }
        },
        itemStyle : {
          emphasis : {
            shadowBlur : 10,
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
  function drawCarWeek2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross',
          label : {
            backgroundColor : '#6a7985'
          }
        }
      },
      legend : {
        data : [ '天河北路388号路段', '广园快速农科院路段', '科韵路中山立交路段', '广州大道中天河北路路段',
            '禺东西路省军区路段', '花城大道广州大道路段' ]
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '天河北路388号路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 120, 230, 210, 132, 101, 134, 90, ]
      }, {
        name : '广园快速农科院路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 220, 234, 290, 330, 310, 182, 191 ]
      }, {
        name : '科韵路中山立交路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 150, 190, 330, 410, 232, 201, 154 ]
      }, {
        name : '广州大道中天河北路路段',
        type : 'line',
        stack : '总量',
        areaStyle : {
          normal : {}
        },
        data : [ 334, 390, 330, 320, 320, 332, 301 ]
      }, {
        name : '禺东西路省军区路段',
        type : 'line',
        stack : '总量',
        label : {
          normal : {
            show : true,
            position : 'top'
          }
        },
        areaStyle : {
          normal : {}
        },
        data : [ 1290, 1330, 1320, 820, 932, 901, 934 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarCrosspie2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b}: {c} ({d}%)"
      },

      legend : {
        // orient: 'vertical',
        x : 'left',
        data : [ '天河北路388号路段', '广园快速农科院路段', '科韵路中山立交路段', '广州大道中天河北路路段',
            '禺东西路省军区路段', '花城大道广州大道路段', '临江大道华南快速路段', '临江大道琶洲大桥路段',
            '大观路岭南学院以北路段', '珠吉路桥北路段' ]
      },
      series : [ {
        name : '活跃卡口',
        type : 'pie',
        selectedMode : 'single',
        center : [ '50%', '60%' ],
        radius : [ 0, '30%' ],
        data : [ {
          value : 335,
          name : '临江大道琶洲大桥路段'
        // selected: true
        }, {
          value : 679,
          name : '大观路岭南学院以北路段'
        }, {
          value : 1548,
          name : '其他'
        } ]
      }, {
        name : '访问来源',
        type : 'pie',
        radius : [ '40%', '55%' ],
        center : [ '50%', '60%' ],
        data : [ {
          value : 355,
          name : '广州大道中天河北路路段'
        }, {
          value : 310,
          name : '科韵路中山立交路段'
        }, {
          value : 204,
          name : '广园快速农科院路段'
        }, {
          value : 135,
          name : '天河北路388号路段'
        }, {
          value : 848,
          name : '禺东西路省军区路段'
        }, {
          value : 151,
          name : '临江大道华南快速路段'
        }, {
          value : 247,
          name : '珠吉路桥北路段'
        }, {
          value : 202,
          name : '花城大道广州大道路段'
        } ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarCrosssingle2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      tooltip : {
        trigger : 'axis'
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : {
        type : 'category',
        boundaryGap : false,
        data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
      },
      yAxis : {
        type : 'value'
      },
      series : [ {
        name : '临江大道华南快速路段',
        type : 'line',
        stack : '总量',
        data : [ 90, 230, 210, 120, 132, 101, 134 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsDay2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : {
          type : 'cross',
          label : {
            backgroundColor : '#6a7985'
          }
        }
      },
      legend : {
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      grid : {
        left : '3%',
        right : '4%',
        bottom : '3%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        boundaryGap : false,
        data : [ '0-6', '6-12', '12-18', '18-24' ]
      } ],
      yAxis : [ {
        type : 'value'
      } ],
      series : [ {
        name : '粤A12345',
        type : 'line',
        data : [ 50, 120, 161, 144 ]
      }, {
        name : '粤A56789',
        type : 'line',
        data : [ 320, 142, 141, 234 ]
      }, {
        name : '粤A11111',
        type : 'line',
        data : [ 150, 222, 201, 134 ]
      }, {
        name : '粤A22222',
        type : 'line',
        data : [ 120, 332, 371, 334 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsActive2(id) {
    // [时间0-24，周几1-7，次数100数量级]
    var data = [

        [ [ 0, 2, 100 ], [ 6, 4, 200 ], [ 12, 4, 200 ], [ 18, 5, 400 ],
            [ 24, 3, 200 ] ],
        [ [ 0, 7, 100 ], [ 6, 1, 200 ], [ 12, 1, 300 ], [ 18, 1, 400 ],
            [ 24, 1, 200 ] ],
        [ [ 0, 1, 100 ], [ 6, 5, 200 ], [ 12, 6, 300 ], [ 18, 3, 400 ],
            [ 24, 2, 200 ] ],
        [ [ 0, 5, 100 ], [ 6, 2, 200 ], [ 12, 1, 300 ], [ 18, 7, 400 ],
            [ 24, 2, 200 ] ], ];
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      legend : {
        right : 10,
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      xAxis : {
        minInterval : 1,
        min : 0,
        max : 24,
        splitLine : {
          lineStyle : {
            type : 'dashed'
          }
        }
      },
      yAxis : {
        minInterval : 1,
        min : 1,
        max : 7,
        splitLine : {
          lineStyle : {
            type : 'dashed'
          }
        },
        scale : true
      },
      series : [ {
        name : '粤A12345',
        data : data[0],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A56789',
        data : data[1],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A11111',
        data : data[2],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      }, {
        name : '粤A22222',
        data : data[3],
        type : 'scatter',
        symbolSize : function(data) {
          return Math.sqrt(data[2]) / 1;
        },
        label : {
          emphasis : {
            show : true,
            formatter : function(param) {
              return param.data[2];
            },
            position : 'top'
          }
        },
        itemStyle : {
          normal : {
            shadowBlur : 10,
            shadowOffsetY : 5
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsCross2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      tooltip : {
        trigger : 'axis',
        axisPointer : { // 坐标轴指示器，坐标轴触发有效
          type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend : {
        data : [ '粤A12345', '粤A56789', '粤A11111', '粤A22222' ]
      },
      grid : {
        top : '10%',
        left : '8%',
        right : '8%',
        bottom : '8%',
        containLabel : true
      },
      xAxis : [ {
        type : 'category',
        axisLabel : {
          rotate : 30,// 倾斜度 -90 至 90 默认为0
        },
        name : '卡口',
        data : [ '琶洲卡口001', '琶洲卡口002', '琶洲卡口003', '琶洲卡口004' ]
      } ],
      yAxis : [ {
        type : 'value',
        name : '次数'
      } ],
      series : [ {
        name : '粤A12345',
        type : 'bar',
        data : [ 620, 322, 301, 234 ]
      }, {
        name : '粤A56789',
        type : 'bar',
        data : [ 130, 232, 101, 134 ]
      }, {
        name : '粤A11111',
        type : 'bar',
        data : [ 240, 182, 391, 234 ]
      }, {
        name : '粤A22222',
        type : 'bar',
        data : [ 350, 232, 401, 154 ]
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
  function drawCarsOverlap2(id) {
    var obj = document.getElementById(id);
    var chart = echarts.init(obj);
    var option = null;
    option = {
      color : [ 'rgba(60,141,188,0.5)', 'rgba(0,192,239,0.5)',
          'rgba(0,166,90,0.5)', 'rgba(243,156,18,0.5)', 'rgba(221,75,57,0.5)' ],
      legend : [ {
        tooltip : {
          show : true
        },
        top : 10,
        selectedMode : 'false',
        data : [ '粤A56789', '粤A11111', '粤A22222' ]
      } ],
      animationDuration : 3000,
      animationEasingUpdate : 'quinticInOut',
      series : [ {
        name : '粤A12345',
        type : 'graph',
        layout : 'force',
        force : {
          repulsion : 400
        },
        data : [ {
          "name" : "粤A12345",
          "value" : 50,
          "symbolSize" : 50,
          "draggable" : "true"
        }, {
          "name" : "粤A56789",
          "value" : 18 / 2,
          "symbolSize" : 18,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A11111",
          "value" : 16 / 2,
          "symbolSize" : 16,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A22222",
          "value" : 5 / 2,
          "symbolSize" : 5,
          "category" : "粤A22222",
          "draggable" : "true"
        }, {
          "name" : "粤A56789-卡口重叠",
          "value" : 10,
          "symbolSize" : 10,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A56789-时间重叠",
          "value" : 8,
          "symbolSize" : 8,
          "category" : "粤A56789",
          "draggable" : "true"
        }, {
          "name" : "粤A11111-时间重叠",
          "value" : 7,
          "symbolSize" : 7,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A11111-卡口重叠",
          "value" : 8,
          "symbolSize" : 8,
          "category" : "粤A11111",
          "draggable" : "true"
        }, {
          "name" : "粤A22222-卡口重叠",
          "value" : 3,
          "symbolSize" : 3,
          "category" : "粤A22222",
          "draggable" : "true"
        }, {
          "name" : "粤A22222-时间重叠",
          "value" : 2,
          "symbolSize" : 2,
          "category" : "粤A22222",
          "draggable" : "true"
        } ],
        links : [ {
          "source" : "粤A12345",
          "target" : "粤A56789"
        }, {
          "source" : "粤A12345",
          "target" : "粤A11111"
        }, {
          "source" : "粤A12345",
          "target" : "粤A22222"
        }, {
          "source" : "粤A56789",
          "target" : "粤A56789-卡口重叠"
        }, {
          "source" : "粤A56789",
          "target" : "粤A56789-时间重叠"
        }, {
          "source" : "粤A11111",
          "target" : "粤A11111-卡口重叠"
        }, {
          "source" : "粤A11111",
          "target" : "粤A11111-时间重叠"
        }, {
          "source" : "粤A22222",
          "target" : "粤A22222-卡口重叠"
        }, {
          "source" : "粤A22222",
          "target" : "粤A22222-时间重叠"
        } ],
        categories : [ {
          'name' : '粤A56789'
        }, {
          'name' : '粤A11111'
        }, {
          'name' : '粤A22222'
        } ],
        focusNodeAdjacency : true,
        roam : 'scale',
        label : {
          normal : {

            show : true,
            position : 'top',

          }
        },
        lineStyle : {
          normal : {
            color : 'source',
            curveness : 0,
            type : "solid"
          }
        }
      } ]
    };
    chart.setOption(option);
    $(window).on("resize", function() {
      chart.resize();
    });
  }
})(jQuery)