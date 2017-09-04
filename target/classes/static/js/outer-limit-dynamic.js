(function($){
	
	/*var mapECharts = echarts.init(document.getElementById('mapECharts'));
    var uploadedDataURL = "../data/data-1464248983149-HJ1jcQNX.json";
    $.getJSON(uploadedDataURL, function (data) {
        console.log(data);
        var points = [].concat.apply([], data.map(function (track) {
            return track.map(function (seg) {
                return seg.coord.concat([1]);
            });
        }));
        mapECharts.setOption({
            animation: false,
            bmap: {
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 5,
                blurSize: 6
            }]
        });

        var bmap = mapECharts.getModel().getComponent('bmap').getBMap();
        // bmap.addControl(new BMap.MapTypeControl());
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
	      var bmap = chart.getModel().getComponent('bmap').getBMap();
	      bmap.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type:BMAP_NAVIGATION_CONTROL_ZOOM}));	      
	    })

	  }
    $('#problem_result').slimScroll({
        height: '350px',
        size: '5px',
        color: '#d2d6de'
    });
    $('#monitor_result').slimScroll({
        height: '350px',
        size: '5px',
        color: '#d2d6de'
    });

    var radarECharts = echarts.init(document.getElementById('radarECharts'));
    var radarECharts_option = {
        color : colorRgba(), 
		tooltip : {
			trigger : 'item',
			//formatter : "{a} <br/>{b}: {c} ({d}%)"
		},	
		legend:{
			top:10,
			right:10,
			data:["今日","昨日"]
		},
        radar: [
            {
                indicator: [
                    {text: '违章数量'},
                    {text: '外牌车辆占比'},
                    {text: '通畅指数'},
                    {text: '社情民意满意度'},
                    {text: '污染排放量'}
                ],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter: '【{value}】',
                    textStyle: {
                      color : colorRgba()
                    }
                },
                splitArea: {
                    areaStyle: {
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }
        ],
        series: [
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        // color: 各异,
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: [100, 0.5, 0.70, 0.9, 2000],
                        name: '今日',
                        symbol: 'rect',
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        value: [60, 0.5, 0.40, 0.6, 1500],
                        name: '昨日',
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                ]
            }
        ]
    };
    radarECharts.setOption(radarECharts_option);

    var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'))
    var pieECharts_1_option = {
      color : colorRgba(), 
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '外牌车和本地车占比',
                type: 'pie',
                radius: [0, '40%'],
                label: {
                    normal: {
                        position: 'inner',
                        formatter: '{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                selectedMode: 'single',
                selectedOffset: 2,
                data: [
                    {value: 11142731, name: '本地车', selected: true},
                    {value: 11053945, name: '外牌车'}
                ]
            },
            {
                name: '外牌车和本地车占比',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 5,
                radius: ['50%', '65%'],
                data: [
                    {value: 11142731, name: '本地车', selected: true},
                    {value: 11053945, name: '外牌车'}
                ]
            }
        ]
    };
    pieECharts_1.setOption(pieECharts_1_option);

    var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
    var pieECharts_2_option = {
        color : colorRgba(), 
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '外牌车归属',
                type: 'pie',
                radius: [50, 130],
                roseType: 'area',
                data: [
                    {value: 208617, name: '深圳'},
                    {value: 222612, name: '佛山'},
                    {value: 100617 ,name: '东莞'},
                    {value: 103617, name: '清远'},
                    {value: 116452, name: '肇庆'},
                    {value: 105617, name: '珠海'},
                    {value: 258936, name: '外省'},
                    {value: 200936, name: '其他'}
                ]
            }
        ]
    };
    pieECharts_2.setOption(pieECharts_2_option);

    var barECharts = echarts.init(document.getElementById('barECharts'));
    var barECharts_option = {
        color : colorRgba(), 
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00',
                '18:00', '21:00', '24:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 2,
                    color: '#8ab3d7'
                }, {
                    gt: 2,
                    lte: 3,
                    color: 'red'
                }, {
                    gt: 3,
                    lte: 6,
                    color: '#8ab3d7'
                }, {
                    gt: 6,
                    lte: 7,
                    color: 'red'
                }, {
                    gt: 7,
                    color: '#8ab3d7'
                }
            ]
        },
        series: [
            {
                name: '频次',
                type: 'line',
                smooth: true,
                data: [1000, 2000, 50002, 60060, 18000, 20000, 30000, 25000, 1000],
                markArea: {
                    label: {
                        normal: {
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f29503'
                        }
                    },
                    data: [
                        [
                            {
                                name: '早高峰',
                                xAxis: '06:00'
                            },
                            {
                                xAxis: '09:00'
                            }
                        ],
                        [
                            {
                                name: '晚高峰',
                                xAxis: '18:00'
                            },
                            {
                                xAxis: '21:00'
                            }
                        ]
                    ]
                }
            }]
    };
    barECharts.setOption(barECharts_option);

    var map_pieECharts = echarts.init(document.getElementById('map_pieECharts'));
    var map_pieECharts_option = {
        color : ['rgba(91,180,217,1)','rgba(91,180,217,0.2)'], 
        tooltip: {
            trigger: 'item',
            formatter: "{a}:{d}%"
        },
        grid: {
            bottom:60
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#333',
                    fontSize: 18
                }
            },
            data: ['今日拥堵延时指数', '今日外牌车占比'],
        }],
        yAxis: [{
            show: false
        }],
        series: [
            {
                name: "今日拥堵延迟指数",
                type: 'pie',
                radius: ['40%', '65%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: ['30%', '40%'],
                data: [
                    {
                        value: 2.5,
                        label: {
                            normal: {
                                formatter: '{c}',
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '26',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }
                            }
                        },
                        tooltip:{
                        	formatter:'{a}：{c}'
                        }
                    },
                    {
                        value: 7.5,
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
            },
            {
                name: "今日外牌车占比",
                type: 'pie',
                radius: ['40%', '65%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: ['70%', '40%'],
                data: [
                    {
                        value: 50,
                        label: {
                            normal: {
                                formatter: '{d} %',
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '26',
                                    fontWeight: 'bold',
                                    color: '#333'
                                }
                            }
                        }
                    },
                    {
                        value: 50,
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
                
            }
        ]

    };
    map_pieECharts.setOption(map_pieECharts_option);
    
    drawCrowdload("crowdload");
    function drawCrowdload(id) {
        var obj = document.getElementById(id);
        var chart = echarts.init(obj);
        var option = null;
        option = {
            color : colorRgba(), 
        		  tooltip : {
        		        trigger: 'axis',
        		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        		        }
        		    },
        		    legend: {
        		        data: ['本地车牌占比', '外地车牌占比'],
        		        top: 20
        		    },
        		    grid: {
        		        left: '3%',
        		        right: '15%',
        		        bottom: '7%',
        		        containLabel: true
        		    },
        		    xAxis:  {
        		        type: 'value',
        		        name : '拥堵指数'
        		    },
        		    yAxis: {
        		        type: 'category',
        		        name : '拥堵路段',
        		        data : [   '增槎路', '广园快速路', '广从公路', '机场高速公路', '广园快速路', '江海大道',
        		                   '环城高速','东风东路' ]
        		    },
        		    series: [
        		        {
        		            name: '本地车牌占比',
        		            type: 'bar',
        		            stack: '总量',    		           
        		            data: [ 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0]
        		        },
        		        {
        		            name: '外地车牌占比',
        		            type: 'bar',
        		            stack: '总量',		            
        		            data: [2.60, 2.65, 2.70, 2.75, 2.80, 2.85, 2.90, 2.95]
        		        }
        		    ]
        };
        chart.setOption(option);
        $(window).on("resize", function() {
          chart.resize();
        });
      }
    
})(jQuery);