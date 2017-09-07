(function($) {
	var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'));
	var pieECharts_1_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
	   title: {
	        text: '违法车辆',
	        subtext: '2562 辆',
	        x: 'center',
	        y: '38%',
	        textStyle: {
	            fontWeight: 'normal',
	            fontSize: 22
	        },
	        subtextStyle:{
	        	fontSize: 14
	        }
	    },
		legend : {
			orient : 'horizontal',
			data : [ '闯红灯', '逆向行驶', '酒驾', '多次违章', '其他' ],
			bottom : 0,
			width : '90%',
			itemGap : 20
		},
		series : [ {
			name : '违法类型',
			type : 'pie',
			center : [ '50%', '45%' ],
			radius : [ '50%', '70%' ],
			avoidLabelOverlap : false,
			label : {
				normal : {
					show : false
				},
				emphasis : {
					show : false
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : 335,
				name : '闯红灯'
			}, {
				value : 310,
				name : '逆向行驶'
			}, {
				value : 234,
				name : '酒驾'
			}, {
				value : 135,
				name : '多次违章'
			}, {
				value : 1548,
				name : '其他'
			} ]
		} ]
	}
	pieECharts_1.setOption(pieECharts_1_option);

	// 基于准备好的dom，初始化echarts实例
	var barECharts = echarts.init(document.getElementById('barECharts'));
	var barECharts_option = {
	    color:colorRgba(),
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
			data : [ '科韵路', '花城大道', '临江大道', '珠吉路', '广园快速路' ],
			axisTick : {
				alignWithLabel : true
			}
		} ],
		yAxis : [ {
			type : 'value'
		} ],
		series : [ {
			name : '过车频次',
			type : 'bar',
			barWidth : '60%',
			data : [ 1020, 5200, 20000, 33400, 39000 ],
			itemStyle : {
        normal : {
          color : function(params) {
            var colorList = colorRgba().concat(colorRgba()).concat(colorRgba());
            return colorList[params.dataIndex];
          }
        }
      }
		} ]
	};
	barECharts.setOption(barECharts_option);

	$('#tab_2-2').find('div').slimScroll({
		height : '390px',
		size : '5px',
		color : '#d2d6de'
	});
	$('#tab_1-2').find('div').slimScroll({
		height : '390px',
		size : '5px',
		color : '#d2d6de'
	});
	$('#result').slimScroll({
		height : '390px',
		size : '5px',
		color : '#d2d6de'
	});
	$('#table_result').slimScroll({
		height : '400px',
		size : '5px',
		color : '#d2d6de'
	});
	$('#search_result').slimScroll({
		height : '360px',
		size : '5px',
		color : '#d2d6de'
	});
	$('#reservation').daterangepicker(
			{
				locale : {
					format : 'YYYY-MM-DD',
					cancelLabel : '取消',
					applyLabel : '确认',
					daysOfWeek : [ "日", "一", "二", "三", "四", "五", "六" ],
					monthNames : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月",
							"八月", "九月", "十月", "十一月", "十二月" ]
				},
				startDate : new Date(),
			},
			function(start, end, label) {
				console.log(start.format('YYYY-MM-DD') + ' to '
						+ end.format('YYYY-MM-DD'));
			});
	 // 百度地图API功能
    var map = new BMap.Map("map");
    var point = new BMap.Point(113.366286, 23.130748);
    map.centerAndZoom(point, 12);
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}); //右上角，仅包含平移和缩放按钮
	map.addControl(top_right_navigation);
	var points = [
        {
            crossId: 1000,
            crossName: '卡口1',
            cross_car_Number: 500,
            bd_longitude: 113.237017,
            bd_latitude: 23.134245
        }, {
            crossId: 2000,
            crossName: '卡口2',
            cross_car_Number: 400,
            bd_longitude: 113.249449,
            bd_latitude: 23.159566
        }, {
            crossId: 5000,
            crossName: '卡口5',
            cross_car_Number: 400,
            bd_longitude: 113.368026,
            bd_latitude: 23.150328
        }, {
            crossId: 4000,
            crossName: '卡口4',
            cross_car_Number: 400,
            bd_longitude: 113.344885,
            bd_latitude: 23.107722
        }, {
            crossId: 3000,
            crossName: '卡口3',
            cross_car_Number: 200,
            bd_longitude: 113.274027,
            bd_latitude: 23.109118
        }
    ];
    var pointsT = [];
    for (var i = 0; i < points.length; i++) {
        (function (i) {
            var newPoint = new BMap.Point(points[i].bd_longitude, points[i].bd_latitude);
            var marker = new BMap.Marker(newPoint);        // 创建标注
            pointsT.push(newPoint);
            map.addOverlay(marker);
        })(i);
    }
    // 编写多边形
    function addPolygon(points) {
        var polygon = new BMap.Polygon(points, {
            strokeColor : "red",
            strokeWeight : 1,
            strokeOpacity : 0.5,
            strokeStyle : "dashed"
        });
        map.addOverlay(polygon);
    }
    addPolygon(pointsT);
    
    
    
	var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
	var pieECharts_2_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		legend : {
			orient : 'horizontal',
			data : [ '小桥车', '货车', '大货车', '其他' ],
			bottom : 0,
			width : '90%',
			itemGap : 20
		},
		series : [ {
			name : '外牌车',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '45%' ],
			data : [ {
				value : 335,
				name : '小桥车',
				selected : true
			}, {
				value : 310,
				name : '货车'
			}, {
				value : 234,
				name : '大货车'
			}, {
				value : 135,
				name : '其他'
			} ],
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			},
			selectedMode : 'single',
			selectedOffset : 5
		} ]
	};
	pieECharts_2.setOption(pieECharts_2_option);

	// drawCrowdLine('lineECharts');

	function drawCrowdLine(id) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
		    color:colorRgba(),
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : [ '0', '3', '6', '9', '12', '15', '18', '21', '24' ]
			},
			yAxis : {
				type : 'value'
			},
			legend : {
				orient : 'horizontal',
				data : [ '外牌车辆占比', '拥堵延时指数' ]
			},
			tooltip : {
				trigger : 'axis',
				formatter : function(params) {
					var html = '';
					for (var i = 0; i < params.length; i++) {
						if (i === 0) {
							html += params[i].seriesName + ':'
									+ (params[i].value * 100 + '%') + '<br/>';
						} else {
							html += params[i].seriesName + ':'
									+ params[i].value + '<br/>';
						}

					}
					console.log(params);
					return html;
				}
			},
			series : [ {
				name : '外牌车辆占比',
				type : 'line',
				data : [ 0.2, 0.2, 0.2, 0.5, 0.4, 0.2, 0.2, 0.3, 0.2 ]
			}, {
				name : '拥堵延时指数',
				type : 'line',
				data : [ 1.2, 1.2, 1.2, 1.5, 1.4, 1.2, 1.2, 1.3, 1.2 ]
			} ]
		};
		chart.setOption(option);
		$(window).on("resize", function() {
			chart.resize();
		});
	}

	var graphECharts = echarts.init(document.getElementById('graphECharts'));
	var graphECharts_option = {
	    color:colorRgba(),
		animationDurationUpdate : 1500,
		animationEasingUpdate : 'quinticInOut',
		series : [ {
			type : 'graph',
			ribbonType : true,
			layout : 'circular',
			circular : {
				rotateLabel : true
			},
			roam : true,
			focusNodeAdjacency : true,
			itemStyle : {
				normal : {
					label : {
						rotate : true,
						show : true,
						textStyle : {
							color : '#333',
							fontSize : 12
						}
					},
				},
				emphasis : {
					label : {
						show : true
					}
				}
			},
			data : [ {
				name : '深圳',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '珠海',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '东莞',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '中山',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '佛山',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '番禺',
				symbolSize : 20,
				itemStyle : {
					normal : {
						color : '#5bb4d9'
					}
				}
			}, {
				name : '天河',
				symbolSize : 20,
				itemStyle : {
					normal : {
						color : '#5bb4d9'
					}
				}
			}, {
				name : '海珠',
				symbolSize : 20,
				itemStyle : {
					normal : {
						color : '#5bb4d9'
					}
				}
			}, {
				name : '黄埔',
				symbolSize : 20,
				itemStyle : {
					normal : {
						color : '#5bb4d9'
					}
				}
			}, {
				name : '清远',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '肇庆',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '江门',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '惠州',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '汕头',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '云浮',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '茂名',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			} ],
			links : [ {
				source : '茂名',
				target : '番禺'
			}, {
				source : '云浮',
				target : '番禺'
			}, {
				source : '汕头',
				target : '番禺'
			}, {
				source : '惠州',
				target : '黄埔'
			}, {
				source : '深圳',
				target : '黄埔'
			}, {
				source : '东莞',
				target : '黄埔'
			}, {
				source : '清远',
				target : '天河'
			}, {
				source : '佛山',
				target : '天河'
			}, {
				source : '中山',
				target : '天河'
			}, {
				source : '珠海',
				target : '海珠'
			}, {
				source : '江门',
				target : '海珠'
			}, {
				source : '肇庆',
				target : '海珠'
			} ]
		} ]
	};
	graphECharts.setOption(graphECharts_option);

	// 20170815zcs
	drawTableECharts("tableECharts");
	function drawTableECharts(id) {
		$.get('data/guangdong.json',
				function(GuangZhouJson) {
					echarts.registerMap('guangzhou', GuangZhouJson);
					var chart = echarts.init(document.getElementById(id));
					var option = null;
					option = {
						legend : {
							show : true,
							orient : 'vertical',
							top : 10,
							right : 10,
							data : [ '进城', '出城' ],
							textStyle : {
								color : '#FFFFFF'
							},
							selectedMode : 'single'
						},
						geo : {
							show : true,
							map : 'guangzhou',
							roam : true,
							center : [ 113.5, 23.3 ],
							zoom : 4,
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
									name : '进城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 114.1, 22.65 ],
												[ 113.5, 23.3 ] ],
										from : "深圳",
										to : "广州",
										time : "70分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'red',
											opacity : 0.5,
											width : 5,
											type : 'solid',
											curveness : 0.3
										}
									}
								},
								{
									name : '进城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 113.9, 22.95 ],
												[ 113.5, 23.3 ] ],
										from : "东莞",
										to : "广州",
										time : "20分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'red',
											opacity : 0.5,
											width : 5,
											type : 'solid',
											curveness : 0.3
										}
									}
								},
								{
									name : '进城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 114.4, 23.09 ],
												[ 113.5, 23.3 ] ],
										from : "惠州",
										to : "广州",
										time : "20分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'red',
											opacity : 0.5,
											width : 5,
											type : 'solid',
											curveness : 0.3
										}
									}
								},
								{
									name : '进城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 112.44, 23.05 ],
												[ 113.5, 23.3 ] ],
										from : "肇庆",
										to : "广州",
										time : "20分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'red',
											opacity : 0.5,
											width : 5,
											type : 'solid',
											curveness : 0.3
										}
									}
								},
								{
									name : '出城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 113.5, 23.3 ],
												[ 113.9, 22.95 ] ],
										from : "广州",
										to : "东莞",
										time : "20分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'green',
											opacity : 0.5,
											width : 5,
											type : 'solid',
											curveness : 0.3
										}
									}
								},
								{
									name : '出城',
									type : 'lines',
									coordinateSystem : 'geo',
									z : 2,
									symbol : [ 'none', 'arrow' ],
									symbolSize : 20,
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.from
														+ " -> "
														+ params.data.to + " "
														+ params.data.time
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
										coords : [ [ 113.5, 23.3 ],
												[ 114.1, 22.65 ] ],
										from : "广州",
										to : "深圳",
										time : "60分钟"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'green',
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
						} else {
							console.log(params);
						}
					})
					$(window).on("resize", function() {
						chart.resize();
					})

				});
	}
})(jQuery);