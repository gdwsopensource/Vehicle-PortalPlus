(function($) {
	var radarECharts = echarts.init(document.getElementById('radarECharts'));
	var radarECharts_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'item',
		},
		radar : [ {
			indicator : [ {
				text : '闯红灯'
			}, {
				text : '假套牌'
			}, {
				text : '其他'
			}, {
				text : '多次违章'
			}, {
				text : '违法交通规则'
			}],
			startAngle : 90,
			splitNumber : 4
		} ],
		series : [ {
			name : '每日预警',
			type : 'radar',
			data : [ {
				value : [ 120, 118, 130, 100, 99],
				name : '今天预警',
				label : {
					normal : {
						show : true,
						formatter : function(params) {
							return params.value;
						}
					}
				},
				lineStyle : {
					normal : {
						color : '#5e9ea6'
					}
				},
				itemStyle : {
					normal : {
						color : '#5e9ea6'
					}
				},
			}/*, {
				value : [ 90, 113, 140, 30, 70],
				name : '昨天预警',
				areaStyle : {
					normal : {
						color : '#b4d0e1'
					}
				},
				label : {
					normal : {
						show : true,
						formatter : function(params) {
							return params.value;
						}
					}
				},
				lineStyle : {
					normal : {
						color : '#d89982'
					}
				},
				itemStyle : {
					normal : {
						color : '#d89982'
					}
				}
			}*/ ]
		} ]
	};
	radarECharts.setOption(radarECharts_option);
	var barECharts = echarts.init(document.getElementById('barECharts'));
	var barECharts_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter : "{a} <br/>{b}: {c}件"
		},
		xAxis : {
			data : [ "天河区", "黄埔区", "海珠区", "番禺区", "荔湾区", "南沙区", "从化区", "花都区",
					"增城区" ]
		},
		yAxis : {
			name : '次数',
			type : 'value'
		},
		series : [ {
			name : '案发量',
			type : 'bar',
			data : [ 5, 20, 36, 10, 10, 22, 23, 25, 63 ],
			itemStyle : {
				normal : {
					color : function(params) {
						var colorList = colorRgba().concat(colorRgba()).concat(colorRgba());
						return colorList[params.dataIndex];
					}
				}
			}
		} ]
	}
	barECharts.setOption(barECharts_option);

	var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
	var pieECharts_2_option = {
	    color:colorRgba(),// 调色盘颜色列表。
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		series : [ {
			name : '执法情况',
			type : 'pie',
			radius : [ '50%', '70%' ],
			avoidLabelOverlap : false,
			label : {
				normal : {
					formatter : function(param) {
						return param.name;
					}
				}
			},
			data : [ {
				value : 1548,
				name : '闯红灯'
			}, {
				value : 335,
				name : '假套牌'
			}, {
				value : 310,
				name : '其他'
			}, {
				value : 234,
				name : '多次违章'
			}, {
				value : 135,
				name : '违反交通规则'
			} ]
		} ]
	};
	pieECharts_2.setOption(pieECharts_2_option);

	var lineECharts_2 = echarts.init(document.getElementById('lineECharts_2'));
	var lineECharts_2_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [ '闯红灯', '假套牌', '其他', '多次违章', '违反交通规则' ]
		},
		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
		},
		yAxis : {
			type : 'value'
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '3%',
			containLabel : true
		},
		series : [ {
			name : '闯红灯',
			type : 'line',
			data : [ 40, 30, 40, 52, 15, 85, 52 ],
			itemStyle : {
				normal : {
					color : '#1da02b'
				}
			}
		}, {
			name : '假套牌',
			type : 'line',
			data : [ 50, 20, 60, 58, 56, 35, 30 ],
			itemStyle : {
				normal : {
					color : '#4fc3b9'
				}
			}
		}, {
			name : '其他',
			type : 'line',
			data : [ 20, 40, 60, 72, 16, 85, 65 ],
			itemStyle : {
				normal : {
					color : '#f39402'
				}
			}
		}, {
			name : '多次违章',
			type : 'line',
			data : [ 10, 60, 77, 22, 35, 55, 63 ],
			itemStyle : {
				normal : {
					color : '#f47564'
				}
			}
		}, {
			name : '违反交通规则',
			type : 'line',
			data : [ 60, 20, 45, 36, 25, 45, 88 ],
			itemStyle : {
				normal : {
					color : '#5bb4d9'
				}
			}
		} ]
	};
	lineECharts_2.setOption(lineECharts_2_option);
	
	var testBoolean=false;
	$("#btn-submit").on('click',function(){
		alert(1);
		if(!testBoolean){
			
		}else{
			
		}
		
		return false;
	})
	
	
	
	
})(jQuery);