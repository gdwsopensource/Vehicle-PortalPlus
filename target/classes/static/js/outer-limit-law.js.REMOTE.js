(function($) {
	var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'));
	var pieECharts_1_option = {
		color : [ '#5bb4d9', '#f47564', '#1da02b', '#4f5c65', '#f39c12' ],
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		legend : {
			orient : 'horizontal',
			data : [ '类型1', '类型2', '类型3', '类型4', '类型5' ],
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
				value : 335,
				name : '类型1'
			}, {
				value : 310,
				name : '类型2'
			}, {
				value : 234,
				name : '类型3'
			}, {
				value : 135,
				name : '类型4'
			}, {
				value : 1548,
				name : '类型5'
			} ]
		} ]
	}
	pieECharts_1.setOption(pieECharts_1_option);

	// 基于准备好的dom，初始化echarts实例
	var barECharts = echarts.init(document.getElementById('barECharts'));
	var barECharts_option = {
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
			data : [ '卡口1', '卡口2', '卡口3', '卡口4', '卡口5' ],
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
			data : [ 10, 52, 200, 334, 390 ],
			itemStyle : {
				normal : {
					color : function(params) {
						var colorList = [ '#5bb4d9', '#4fc3b9', '#f29503',
								'#1da02b', '#f4563c' ];
						return colorList[params.dataIndex];
					}
				}
			}
		} ]
	};
	barECharts.setOption(barECharts_option);

	$('#tab_2-2').find('div').slimScroll({
		height : '380px',
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
		height : '633px',
		size : '5px',
		color : '#d2d6de'
	});

	// 地图
	/*
	 * var myChart_map = echarts.init(document.getElementById('map')); var
	 * option_map = null; option_map = { bmap: { center: [113.366286,
	 * 23.130748], //113.366286,23.130748 天河 zoom: 14, roam: true, mapStyle: {
	 * //设置的地图的样式 }, series: [ { name: '', type: 'scatter', coordinateSystem:
	 * 'bmap', data: [[113.33674730643, 23.147301775747, 1]] } ] } };
	 * myChart_map.setOption(option_map);
	 */

	// 百度地图API功能
	var map = new BMap.Map("map");
	var point = new BMap.Point(113.366286, 23.130748);
	map.centerAndZoom(point, 12);
	var marker = new BMap.Marker(new BMap.Point(113.33674730643,
			23.147301775747)); // 创建点
	map.addOverlay(marker);
	map.enableScrollWheelZoom(true);

	var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
	var pieECharts_2_option = {
		color : [ '#8676a7', '#eda637', '#3a8cbb', '#d0d0d0' ],
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

	drawCrowdLine('lineECharts');

	function drawCrowdLine(id) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			color : [ '#9ed0e0', '#2881b5' ],
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
				name : '公园',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '高校',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '小区',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '别墅',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '养生',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '大学城',
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
				name : '黄埔大道',
				symbolSize : 20,
				itemStyle : {
					normal : {
						color : '#5bb4d9'
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
				name : '度假村',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '展览馆',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '五星酒店',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '专营店',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '家具',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '购物',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			}, {
				name : '驾校',
				symbolSize : 12,
				itemStyle : {
					normal : {
						color : '#4fc3b9'
					}
				}
			} ],
			links : [ {
				source : '别墅',
				target : '番禺'
			}, {
				source : '养生',
				target : '番禺'
			}, {
				source : '度假村',
				target : '番禺'
			}, {
				source : '展览馆',
				target : '黄埔大道'
			}, {
				source : '五星酒店',
				target : '黄埔大道'
			}, {
				source : '专营店',
				target : '黄埔大道'
			}, {
				source : '家具',
				target : '天河'
			}, {
				source : '购物',
				target : '天河'
			}, {
				source : '驾校',
				target : '天河'
			}, {
				source : '公园',
				target : '大学城'
			}, {
				source : '高校',
				target : '大学城'
			}, {
				source : '小区',
				target : '大学城'
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