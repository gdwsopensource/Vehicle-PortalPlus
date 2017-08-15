(function() {
	// 数据

	// 初始化

	// 执行函数
	drawMap("map");
	drawMsgPie1("msg-pie1",50,350);
	drawMsgPie2("msg-pie2",20000,100000);
	drawNonlocalratio("nonlocalratio");
	drawNonlocalown("nonlocalown");
	drawCrowdload("crowdload");
	drawCrowdtime("crowdtime");
	drawQuota("quota");
	dynamic();
	fly();
	// 绑定事件

	// 自定义函数
	function drawMap(id) {
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
				series : []
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
	function drawMsgPie1(id,crowdRoad,totalRoad) {
		var totalRoad=parseInt(totalRoad);
		var crowdRoad=parseInt(crowdRoad);
		var crowdRatio=Math.round(crowdRoad/totalRoad*100);
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				x : 'center',
				text : '即时拥堵路段',
				subtext : crowdRoad+'条',
				textStyle : {
					fontSize : 20,
					color : '#FFFFFF'
				},
				subtextStyle : {
					fontSize : 32,
					color : '#FFFFFF'
				}
			},
			series : [ {
				type : 'pie',
				radius : [ '50%', '80%' ],
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
					name : crowdRatio+'%'
				}, {
					value : 100-crowdRatio,
					name : ''
				}, ],
				color : [ 'rgb(92,180,218)', 'rgb(255,255,255)' ]
			} ]
		};
		chart.setOption(option);
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function drawMsgPie2(id,nonlocalCar,totalCar) {
		var nonlocalCar=parseInt(nonlocalCar);
		var totalCar=parseInt(totalCar);
		var nonlocalRatio=Math.round(nonlocalCar/totalCar*100);
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {

				x : 'center',
				text : '即时外牌车辆',
				subtext : nonlocalCar+'辆',
				textStyle : {
					fontSize : 20,
					color : '#FFFFFF'
				},
				subtextStyle : {
					fontSize : 32,
					color : '#FFFFFF'
				}
			},
			series : [ {
				type : 'pie',
				radius : [ '50%', '80%' ],
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
					name : nonlocalRatio+'%'
				}, {
					value : 100-nonlocalRatio,
					name : ''
				}, ],
				color : [ 'rgb(92,180,218)', 'rgb(255,255,255)' ]
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
				radius : '55%',
				center : [ '50%', '60%' ],
				data : [ {
					value : 200,
					name : '外地车牌'
				}, {
					value : 900,
					name : '广州市车牌'
				} ],
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ],
			color : [ 'rgb(92,180,218)', 'rgb(244,156,16)', 'rgb(244,116,100)',
					'rgb(80,196,186)', 'rgb(134,118,168)' ]
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
				radius : [ 20, 100 ],
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
			} ],
			color : [ 'rgb(92,180,218)', 'rgb(244,156,16)', 'rgb(244,116,100)',
					'rgb(80,196,186)', 'rgb(134,118,168)' ]
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
			title : {
				text : '今日拥堵路段',
				x : 'center',
				textStyle : {
					fontSize : 20,
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
				left : '5%',
				right : '5%',
				bottom : '0%',
				top : '20%',
				containLabel : true
			},
			xAxis : {
				type : 'value',
				boundaryGap : [ 0, 0.01 ],
				axisLabel : {
					textStyle : {
						color : '#FFFFFF'
					}
				}
			},
			// 注意数据是从下到上
			yAxis : {
				type : 'category',
				data : [ '汕头市', '珠海市', '衡阳市', '东莞市', '韶关市', '清远市', '惠州市',
						'株洲市', '中山市', '佛山市' ],
				axisLabel : {
					textStyle : {
						color : '#FFFFFF'
					}
				}
			},
			itemStyle : {
				normal : {
					color : 'rgb(92,180,218)'
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
	function drawCrowdtime(id) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : '拥堵延时指数与外牌车占比关系',
				x : 'center',
				textStyle : {
					fontSize : 20,
					color : '#FFFFFF'
				}
			},
			grid : {
				left : '40',
				right : '20',
				top : '100'
			},
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : [ '0', '3', '6', '9', '12', '15', '18', '21', '24' ],
				axisLabel : {
					textStyle : {
						color : '#FFFFFF'
					}
				}
			},
			yAxis : {
				type : 'value',
				axisLabel : {
					textStyle : {
						color : '#FFFFFF'
					}
				}
			},
			legend : {
				data : [ '外牌车辆占比', '拥堵延时指数' ],
				top : 60,
				textStyle : {
					color : '#FFFFFF'
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
			} ],
			color : [ 'rgb(92,180,218)', 'rgb(244,156,16)', 'rgb(244,116,100)',
					'rgb(80,196,186)', 'rgb(134,118,168)' ]
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
			title : {
				text : '今日指标',
				x : '40',
				y : '40',
				textStyle : {
					fontSize : 20,
					color : '#FFFFFF'
				}
			},
			legend : {
				data : [ '今日', '昨日' ],
				right : 40,
				top : 40,
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
			} ],
			color : [ 'rgb(92,180,218)', 'rgb(244,156,16)', 'rgb(244,116,100)',
					'rgb(80,196,186)', 'rgb(134,118,168)' ]
		};
		chart.setOption(option);
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function dynamic() {
		var warningBodyUl = $("#warning-body>ul");
		var tDynamicFast = setInterval(
				function() {
					//ajax后台获取数据
					var liH = warningBodyUl.find("li").height();
					var nowDate=new Date;
					var nowHourMin=nowDate.getHours()+":"+nowDate.getMinutes();
					var random3=100+Math.floor(Math.random()*900);
					var random5=10000+Math.floor(Math.random()*90000);
					warningBodyUl.animate({
						'marginTop' : liH + "px"
					},500,function(){						
						warningBodyUl
						.prepend('<li><span class="fa fa-star"></span> <span>'+nowHourMin+'</span> <span>粤A'+random5+'</span> <span>黄埔大道'+random3+'号</span> <span>多次违章</span></li>');
						warningBodyUl.css({'marginTop':0});
					});
					
				}, 1000);
		var tDynamicSlow=setInterval(function(){
			var randomRoad=30+Math.floor(Math.random()*60);
			drawMsgPie1("msg-pie1",randomRoad,350);
			var randomNonlocalCar=18000+Math.floor(Math.random()*4000);
			drawMsgPie2("msg-pie2",randomNonlocalCar,100000);
		},5000);
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
