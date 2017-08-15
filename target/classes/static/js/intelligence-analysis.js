(function($) {
	// 数据

	// 初始化
	resizeInit();
	// 执行函数
	drawActiveMap("active-map");
	drawCrowdBar("crowd-bar");
	drawCrowdPie("crowd-pie");
	drawCrowdLine("crowd-line");
	drawOwnBar("own-bar");
	drawOwnMap("own-map");
	// 绑定事件
	$(window).on('resize', function() {
		resizeInit();
	});

	// 自定义函数
	function resizeInit() {
		var activeIconH = $("#active-icon").height();
		$("#active-map").css("height", activeIconH);
		var crowdTableH = $("#crowd-table").height();
		$("#crowd-bar").css("height", crowdTableH);
		var crowdPieW = $("#crowd-pie").width();
		$("#crowd-pie").css("height", crowdPieW);
		$("#crowd-line").css("height", crowdPieW);
		var ownMapW = $("#own-map").width();
		$("#own-bar").css("height", ownMapW);
		$("#own-map").css("height", ownMapW);
	}
	function drawActiveMap(id) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			bmap : {
				center : [ 113.366286, 23.130748 ],
				zoom : 13,
				roam : true
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
				data : [ [ 113.326286, 23.140748, 10 ],
						[ 113.326286, 23.150748, 20 ],
						[ 113.336286, 23.160748, 30 ],
						[ 113.337286, 23.160748, 30 ],
						[ 113.336286, 23.170748, 40 ],
						[ 113.366286, 23.180748, 40 ],
						[ 113.366286, 23.190748, 50 ] ],
				pointSize : 5,
				blurSize : 6
			} ]
		};
		chart.setOption(option);
		$(window).on("resize", function() {
			chart.resize();
		});
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
				left : '0%',
				right : '0%',
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
				data : [ '聚龙大桥', '广州大道', '临江大道', '冼春路', '德政北路', '禺山西路', '科韵路',
						'琶洲', '花城大道', '黄埔大道' ]
			},
			itemStyle : {
				normal : {
					color : 'rgba(53,127,166,0.8)'
				}
			},
			series : [ {
				type : 'bar',
				data : [ 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0 ]
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
				left : '0%',
				right : '0%',
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
				data : [ '汕头市', '珠海市', '衡阳市', '东莞市', '韶关市', '清远市', '惠州市',
						'株洲市', '中山市', '佛山市' ]
			},
			itemStyle : {
				normal : {
					color : 'rgba(53,127,166,0.8)'
				}
			},
			series : [ {
				type : 'bar',
				data : [ 200, 210, 220, 230, 240, 250, 260, 300, 400, 500 ]
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
		$.get('data/guangzhou.json',
				function(GuangZhouJson) {
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
						series : [
								{
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
										color : 'rgba(' + (155 + lines[0] * 10)
												+ ',0,0,0.5)',
										loop : true
									},
									label : {
										normal : {
											show : true,
											position : 'middle',
											formatter : function(params) {
												return params.data.fromLoad
														+ " -> "
														+ params.data.toLoad
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
										coords : [ [ 113.58, 23.75 ],
												[ 113.49, 23.17 ] ],
										fromLoad : "道路1",
										toLoad : "道路2"
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'rgba('
													+ (155 + lines[0] * 10)
													+ ',0,0,0.5)',
											opacity : 0.5,
											width : lines[0],
											type : 'solid'
										}
									}
								},
								{
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
										color : 'rgba(0,'
												+ (155 + lines[5] * 10)
												+ ',0,0.5)',
										loop : true
									},
									data : [ {
										coords : [ [ 113.78, 23.25 ],
												[ 113.39, 23.57 ] ]
									} ],
									polyline : false,
									lineStyle : {
										normal : {
											color : 'rgba(0,'
													+ (155 + lines[5] * 10)
													+ ',0,0.5)',
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
})(jQuery)