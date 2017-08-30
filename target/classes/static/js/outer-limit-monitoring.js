(function($){
	/*
	var uploadedDataURL = "../data/data-1477626617822-SJMboHgel.txt";

    function convertData(sourceData) {
        return [].concat.apply([], $.map(sourceData, function (busLine, index) {
            var prevPoint = null;
            var points = [];
            var value = busLine.shift();
            for (var i = 0; i < busLine.length; i += 2) {
                var point = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                    point = [
                        prevPoint[0] + point[0],
                        prevPoint[1] + point[1]
                    ];
                }
                prevPoint = point;

                points.push([point[0] / 1e5, point[1] / 1e5]);
            }
            return {
                value: value,
                coords: points
            };
        }));
    }

    var option = {
        bmap: {
            roam: true
        },
        visualMap: {
            type: "piecewise",
            left: 'right',
            
			 //pieces: [ {min: 15}, // 不指定 max，表示 max 为无限大（Infinity）。 {min: 12,
			// max: 15}, {min: 9, max: 12}, {min: 6, max: 9}, {min: 3, max: 6},
			// {max: 3} // 不指定 min，表示 min 为无限大（-Infinity）。 ],
			 
            min: 0,
            max: 15,
            splitNumber: 5,
            maxOpen: true,
            color: ['red', 'yellow', 'green']
        },
        tooltip: {
            formatter: function (params, ticket, callback) {
                return "拥堵指数:" + params.value;
            },
            trigger: 'item'
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            lineStyle: {
                normal: {
                    opacity: 1,
                    width: 4
                },
                emphasis: {
                    width: 6
                }
            },
            effect: {
                show: true,
                symbolSize: 2,
                color: "white"
            }
        }]
    };

    $.getJSON(uploadedDataURL, function (rawData) {
        option.series[0].data = convertData(rawData);
        var mapECharts = echarts.init(document.getElementById('mapECharts'));
        mapECharts.setOption(option);
        // console.log(option);
        // 获取echart中使用的bmap实例
        var map = mapECharts.getModel().getComponent('bmap').getBMap();
        map.disableDoubleClickZoom();
        map.centerAndZoom("嘉兴", 13);

    });
    */
    drawActiveMap("mapECharts");
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
              center : [113.335974,23.12906],
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
          var bmap = chart.getModel().getComponent('bmap').getBMap();
	      bmap.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type:BMAP_NAVIGATION_CONTROL_ZOOM}));	     
        })

      }
    
    
    var lineECharts = echarts.init(document.getElementById('lineECharts'));
    var lineECharts_option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['总量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['私家车', '货运车', '面包车', '出租车', '客车', '其他']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '总量',
                type: 'line',
                data: [40000, 10000, 40200, 52125, 15000, 8561, 81656],
                itemStyle: {
                    normal: {
                        color: '#4fc3b9'
                    }
                }
            }
        ]
    };
    lineECharts.setOption(lineECharts_option);
    /*
    var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'));
    var pieECharts_1_option = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c} KM/H"
        },
        series: [
            {
                name: '平均速度',
                type: 'gauge',
                detail: {
                    formatter: '{value} KM/H',
                    textStyle: {
                        fontSize: 15
                    }
                },
                data: [{value: 50, name: '速度'}]
            }
        ]
    };
    pieECharts_1.setOption(pieECharts_1_option);
    */
    var pieECharts = echarts.init(document.getElementById('pieECharts'));
	var pieECharts_option = {
		color : [ '#5bb4d9', '#f47564', '#1da02b', '#4f5c65', '#f39c12' ],
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		legend : {
			orient : 'horizontal',
			data : [ '私家车', '货运车', '出租车','客车','其他' ],
			bottom : 0,
			width : '90%',
			itemGap : 20
		},
		series : [ {
			name : '车辆类型',
			type : 'pie',
			center : [ '50%', '45%' ],
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
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : 3350,
				name : '私家车'
			}, {
				value : 3100,
				name : '货运车'
			}, {
				value : 2340,
				name : '出租车'
			},{
				value:1320,
				name:'客车'
			},{
				value : 15480,
				name : '其他'
			} ]
		} ]
	}
	pieECharts.setOption(pieECharts_option);
    
    
})(jQuery);