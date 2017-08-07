(function($) {
	// 第一次初始
	resizeInit();
	CKEDITOR.replace('editor1');
	$('.textarea').wysihtml5();
	// 数据
	var pieData = [ {
		value : 335,
		name : '琶洲卡口001'
	}, {
		value : 310,
		name : '越秀公园卡口001'
	}, {
		value : 234,
		name : '增城卡口001'
	}, {
		value : 135,
		name : '白云卡口001'
	}, {
		value : 1548,
		name : '其它'
	} ];
	var lineSeries = [ {
		name : 'O',
		type : 'line',
		data : [ 20, 50, 50, 40, 30, 40, 20 ],
		markPoint : {
			data : [ {
				type : 'max',
				name : '最大值'
			} ]
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	}, {
		name : 'D',
		type : 'line',
		data : [ 15, 66, 25, 55, 35, 24, 60 ],
		markPoint : {
			data : [ {
				type : 'max',
				name : '最大值'
			} ]
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	} ];
	var barData = [ 1000, 520, 200, 134, 50 ];
	var pieDoughnutData = [ {
		value : 335,
		name : '天河区'
	}, {
		value : 310,
		name : '海珠区'
	}, {
		value : 234,
		name : '白云区'
	}, {
		value : 135,
		name : '荔湾区'
	}, {
		value : 1548,
		name : '越秀区'
	} ];
	var areaMapData = [ {
		"count" : 12050,
		"crossMonth" : "2016/01",
		"originCrossName" : "天河区",
		"origin_lng" : "113.370",
		"origin_lat" : "23.131",
		"destCrossName" : "白云区",
		"dest_lng" : "113.278",
		"dest_lat" : "23.165"
	}, {
		"count" : 12050,
		"crossMonth" : "2016/01",
		"originCrossName" : "天河区",
		"origin_lng" : "113.370",
		"origin_lat" : "23.131",
		"destCrossName" : "越秀区",
		"dest_lng" : "113.273",
		"dest_lat" : "23.134"
	} ];
	var pieNestSeries = [ {
		type : 'pie',
		selectedMode : 'single',
		radius : [ 0, '30%' ],
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
			value : 10000,
			name : '广州市'
		}, {
			value : 1000,
			name : '广东省其他市'
		}, {
			value : 1000,
			name : '其他省'
		} ]
	}, {
		name : '',
		type : 'pie',
		radius : [ '40%', '55%' ],

		data : [ {
			value : 10000,
			name : '广州市'
		}, {
			value : 500,
			name : '深圳市'
		}, {
			value : 200,
			name : '佛山市'
		}, {
			value : 300,
			name : '其他市'
		}, {
			value : 500,
			name : '香港自治区'
		}, {
			value : 200,
			name : '广西省'
		}, {
			value : 300,
			name : '其他省'
		} ]
	} ];
	
	// 执行函数
	
	$(window).on('resize',function(){
		resizeInit();
	});
	$("#create-report").on('click', function() {
		$("#report-box").show();
		writeReport("<h3>最近一周天河区交通情况</h3><ol><li>堵塞情况良好</li><li>06:00-07:00为高峰时段，通过车辆80000辆次</li><li>琶洲卡口001为高峰卡口，通过车辆90000辆次</li><li>5.2%为非广州市车辆，呈上升趋势</li><ol>")
		drawReport(0,"天河区OD图","<p>你看，涌向天河区的线那么多，最粗的那条是从海珠区过来的</p>");
		drawReport(1);
		drawReport(2);
		drawReport(3);
		
		
		scrollTo("report-box");
	});
	$("#save-report").on('click',function(){
		exportWord("天河区报告");
	});

	// 自定义函数
	totalFly("draw-area");
	totalLine("draw-time","",lineSeries);
	 totalBar("draw-cross","",barData);
	 totalPieNest("draw-own", "", pieNestSeries);
	

	function resizeInit() {
		var drawAreaH = parseInt($("#draw-area").width());
		$("#draw-area").css("height", drawAreaH);
		var drawMsgH = parseInt($("#draw-msg").width());
		$("#draw-msg").css("height", drawMsgH * 3);
		var drawRightH = parseInt($("#draw-right").width());
		$(".draw-right").css("height", parseInt(drawRightH / 2));
	}
	function scrollTo(divId) {
		document.getElementById(divId).scrollIntoView();
	}
	function exportWord(title){
	    var reportBody=$(".cke_wysiwyg_frame").contents().find("body");
	    reportBody.wordExport(title||"报告");
	}
	function drawReport(i,title,str){
	    var reportBody=$(".cke_wysiwyg_frame").contents().find("body");
	    var canvas=$(".container-fluid canvas");
	    var canvas1=canvas[i];
	    var canvas1Data=canvas1.toDataURL("image/png");
	    var img1Str='<p style="text-align: center"><img src="'+canvas1Data+'" /></p>';
	    var title1Str='<h3 style="text-align: center">图'+(i+1)+'：'+(title||'')+''+'<h3><br />';
	    reportBody.append(img1Str);
	    reportBody.append(title1Str);
	    reportBody.append(str||'');
	}
	function writeReport(str){
		 var reportBody=$(".cke_wysiwyg_frame").contents().find("body");
		 reportBody.append(str);
	}
	
	//例子简图
	function totalFly(id){
		$.get('data/guangzhou.json', function(GuangZhouJson) {
			echarts.registerMap('guangzhou', GuangZhouJson);
			var chart = echarts.init(document.getElementById(id));
			// 113.325828,23.099192
			var option = null;
			option = {
				legend : {
					show : true,
					orient : 'vertical',
					top : 'bottom',
					left : 'right',
					data : [ '起始', '终到' ],
					textStyle : {
						color : '#fff'
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
								color : '#FFFFFF',
								fontSize : 12
							}
						},
						emphasis : {
							show : true,
							textStyle : {
								color : '#FFFFFF',
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
										coords : [ [ 113.28, 23.13 ],
												[ 113.28, 23.13 ] ],
										name : [ "越秀区", "荔湾区", "海珠区", "天河区", "白云区",
												"黄埔区", "番禺区", "花都区", "南沙区", "增城区",
												"从化区" ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.23, 23.08 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.31, 23.08 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.37, 23.15 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.31, 23.27 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.49, 23.17 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.40, 22.98 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.22, 23.45 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.56, 22.77 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.75, 23.33 ] ]
									},
									{
										coords : [ [ 113.28, 23.13 ],
												[ 113.58, 23.55 ] ]
									} ],
							polyline : false,
							lineStyle : {
								normal : {
									color : 'purple',
									opacity : 0.5,
									width : 5,
									type : 'solid',
									curveness : 0.3
								}
							}
						}, {
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
									color : 'white',
									opacity : 0.5,
									width : 5,
									type : 'solid',
									curveness : 0.3
								}
							}
						}, {
							name : '终到',
							type : 'lines'
						} ]
			};
			chart.setOption(option);
			chart.on("click", function(params) {
				if (params.componentType == "geo") {
					var area = params.name;
					// 加载该区数据，重绘该地图，联动右边三图
					$("#msg-area").html(area);
				} else {
					console.log(params);
				}
			})
			$(window).on("resize", function() {
				chart.resize();
			})

		});
	}
	// 例子简图
	function totalPieDoughnut(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}: {c} ({d}%)"
			},
			// legend: {
			// orient: 'vertical',
			// x: 'left',
			// data:['天河区','海珠区','白云区','荔湾区','越秀区']
			// },
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
				labelLine : {
					normal : {
						show : false
					}
				},
				data : data
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalLine(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
			},
			yAxis : {
				type : 'value',
				axisLabel : {
					formatter : '{value}'
				}
			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalBar(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			color : [ '#3398DB' ],
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
				type : 'bar',
				barWidth : '60%',
				data : data
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalPie(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				left : 'left',
				data : [ '区域1', '区域2', '区域3', '区域4', '区域5' ]
			},
			series : [ {
				type : 'pie',
				radius : '55%',
				center : [ '50%', '60%' ],
				data : data,
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
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();

		});
	}
	function totalPieNest(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}<br />{c} ({d}%)"
			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);
			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function simplePie(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title,
				textStyle : {
					color : '#000000',
					fontSize : '14',
					fontWeight : 'normal'
				},
				x : 'left'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}<br/>{d}% ({c})"
			},
			series : [ {
				type : 'pie',
				radius : '70%',
				center : [ '50%', '50%' ],
				data : data,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				}
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'pie') {
				console.log(params.name);

			}
		});

		$(window).on("resize", function() {
			chart.resize();
		});
	}
})(jQuery)
	function fly(obj,start,end){
		var i=start;
		var inter=setInterval(function(){
			obj.css("top",i);
			i-=5;
			if(i<0){
				clearInterval(inter); 
			}
		},100);
	}