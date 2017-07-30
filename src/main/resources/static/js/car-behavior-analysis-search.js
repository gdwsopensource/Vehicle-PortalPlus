$(function() {
	var myChart_heatmap = echarts.init($("#behavior-analysis-heatmap")[0]);
	var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
		'7a', '8a', '9a', '10a', '11a',
		'12p', '1p', '2p', '3p', '4p', '5p',
		'6p', '7p', '8p', '9p', '10p', '11p'
	];
	var days = ['Saturday', 'Friday', 'Thursday',
		'Wednesday', 'Tuesday', 'Monday', 'Sunday'
	];

	var data = [
		[0, 0, 5],
		[0, 1, 1],
		[0, 2, 0],
		[0, 3, 0],
		[0, 4, 0],
		[0, 5, 0],
		[0, 6, 0],
		[0, 7, 0],
		[0, 8, 0],
		[0, 9, 0],
		[0, 10, 0],
		[0, 11, 2],
		[0, 12, 4],
		[0, 13, 1],
		[0, 14, 1],
		[0, 15, 3],
		[0, 16, 4],
		[0, 17, 6],
		[0, 18, 4],
		[0, 19, 4],
		[0, 20, 3],
		[0, 21, 3],
		[0, 22, 2],
		[0, 23, 5],
		[1, 0, 7],
		[1, 1, 0],
		[1, 2, 0],
		[1, 3, 0],
		[1, 4, 0],
		[1, 5, 0],
		[1, 6, 0],
		[1, 7, 0],
		[1, 8, 0],
		[1, 9, 0],
		[1, 10, 5],
		[1, 11, 2],
		[1, 12, 2],
		[1, 13, 6],
		[1, 14, 9],
		[1, 15, 11],
		[1, 16, 6],
		[1, 17, 7],
		[1, 18, 8],
		[1, 19, 12],
		[1, 20, 5],
		[1, 21, 5],
		[1, 22, 7],
		[1, 23, 2],
		[2, 0, 1],
		[2, 1, 1],
		[2, 2, 0],
		[2, 3, 0],
		[2, 4, 0],
		[2, 5, 0],
		[2, 6, 0],
		[2, 7, 0],
		[2, 8, 0],
		[2, 9, 0],
		[2, 10, 3],
		[2, 11, 2],
		[2, 12, 1],
		[2, 13, 9],
		[2, 14, 8],
		[2, 15, 10],
		[2, 16, 6],
		[2, 17, 5],
		[2, 18, 5],
		[2, 19, 5],
		[2, 20, 7],
		[2, 21, 4],
		[2, 22, 2],
		[2, 23, 4],
		[3, 0, 7],
		[3, 1, 3],
		[3, 2, 0],
		[3, 3, 0],
		[3, 4, 0],
		[3, 5, 0],
		[3, 6, 0],
		[3, 7, 0],
		[3, 8, 1],
		[3, 9, 0],
		[3, 10, 5],
		[3, 11, 4],
		[3, 12, 7],
		[3, 13, 14],
		[3, 14, 13],
		[3, 15, 12],
		[3, 16, 9],
		[3, 17, 5],
		[3, 18, 5],
		[3, 19, 10],
		[3, 20, 6],
		[3, 21, 4],
		[3, 22, 4],
		[3, 23, 1],
		[4, 0, 1],
		[4, 1, 3],
		[4, 2, 0],
		[4, 3, 0],
		[4, 4, 0],
		[4, 5, 1],
		[4, 6, 0],
		[4, 7, 0],
		[4, 8, 0],
		[4, 9, 2],
		[4, 10, 4],
		[4, 11, 4],
		[4, 12, 2],
		[4, 13, 4],
		[4, 14, 4],
		[4, 15, 14],
		[4, 16, 12],
		[4, 17, 1],
		[4, 18, 8],
		[4, 19, 5],
		[4, 20, 3],
		[4, 21, 7],
		[4, 22, 3],
		[4, 23, 0],
		[5, 0, 2],
		[5, 1, 1],
		[5, 2, 0],
		[5, 3, 3],
		[5, 4, 0],
		[5, 5, 0],
		[5, 6, 0],
		[5, 7, 0],
		[5, 8, 2],
		[5, 9, 0],
		[5, 10, 4],
		[5, 11, 1],
		[5, 12, 5],
		[5, 13, 10],
		[5, 14, 5],
		[5, 15, 7],
		[5, 16, 11],
		[5, 17, 6],
		[5, 18, 0],
		[5, 19, 5],
		[5, 20, 3],
		[5, 21, 4],
		[5, 22, 2],
		[5, 23, 0],
		[6, 0, 1],
		[6, 1, 0],
		[6, 2, 0],
		[6, 3, 0],
		[6, 4, 0],
		[6, 5, 0],
		[6, 6, 0],
		[6, 7, 0],
		[6, 8, 0],
		[6, 9, 0],
		[6, 10, 1],
		[6, 11, 0],
		[6, 12, 2],
		[6, 13, 1],
		[6, 14, 3],
		[6, 15, 4],
		[6, 16, 0],
		[6, 17, 0],
		[6, 18, 0],
		[6, 19, 0],
		[6, 20, 1],
		[6, 21, 2],
		[6, 22, 2],
		[6, 23, 6]
	];

	data = data.map(function(item) {
		return [item[1], item[0], item[2] || '-'];
	});

	option_heatmap = {
		tooltip: {
			position: 'top'
		},
		animation: false,
		grid: {
			top: '3%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: hours,
			splitArea: {
				show: true
			}
		},
		yAxis: {
			type: 'category',
			data: days,
			splitArea: {
				show: true
			}
		},
		visualMap: {
			min: 0,
			max: 10,
			calculable: true,
			orient: 'vertica	',
			left: 0,
			//      bottom: '15%'
		},
		series: [{
			name: 'Punch Card',
			type: 'heatmap',
			data: data,
			label: {
				normal: {
					show: true
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	myChart_heatmap.setOption(option_heatmap);

	var myChart_sub1 = echarts.init($("#behavior-analysis-sub1")[0]);
	option_sub1 = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				areaStyle: {
					normal: {}
				},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				areaStyle: {
					normal: {}
				},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				areaStyle: {
					normal: {}
				},
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				areaStyle: {
					normal: {}
				},
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				areaStyle: {
					normal: {}
				},
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	};
	myChart_sub1.setOption(option_sub1);

	var myChart_sub2 = echarts.init($("#behavior-analysis-sub2")[0]);
	var option_sub2 = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} W'
			},
			axisPointer: {
				snap: true
			}
		},
		visualMap: {
			show: false,
			dimension: 0,
			pieces: [{
				lte: 6,
				color: 'green'
			}, {
				gt: 6,
				lte: 8,
				color: 'red'
			}, {
				gt: 8,
				lte: 14,
				color: 'green'
			}, {
				gt: 14,
				lte: 17,
				color: 'red'
			}, {
				gt: 17,
				color: 'green'
			}]
		},
		series: [{
			name: '用电量',
			type: 'line',
			smooth: true,
			data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
			markArea: {
				data: [
					[{
						name: '早高峰',
						xAxis: '07:30'
					}, {
						xAxis: '10:00'
					}],
					[{
						name: '晚高峰',
						xAxis: '17:30'
					}, {
						xAxis: '21:15'
					}]
				]
			}
		}]
	};
	myChart_sub2.setOption(option_sub2);
	var myChart_sub3 = echarts.init($("#behavior-analysis-sub3")[0]);
	var option_sub3 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
		},
		series: [{
				name: '访问来源',
				type: 'pie',
				selectedMode: 'single',
				radius: [0, '30%'],

				label: {
					normal: {
						position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [{
						value: 335,
						name: '直达',
						selected: true
					},
					{
						value: 679,
						name: '营销广告'
					},
					{
						value: 1548,
						name: '搜索引擎'
					}
				]
			},
			{
				name: '访问来源',
				type: 'pie',
				radius: ['40%', '55%'],

				data: [{
						value: 335,
						name: '直达'
					},
					{
						value: 310,
						name: '邮件营销'
					},
					{
						value: 234,
						name: '联盟广告'
					},
					{
						value: 135,
						name: '视频广告'
					},
					{
						value: 1048,
						name: '百度'
					},
					{
						value: 251,
						name: '谷歌'
					},
					{
						value: 147,
						name: '必应'
					},
					{
						value: 102,
						name: '其他'
					}
				]
			}
		]
	};
	myChart_sub3.setOption(option_sub3);

	var myChart_sub4 = echarts.init($("#behavior-analysis-sub4")[0]);
	var option_sub4 = {

		tooltip: {
			trigger: 'axis'
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
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			name: '邮件营销',
			type: 'line',
			stack: '总量',
			data: [120, 132, 101, 134, 90, 230, 210]
		}]
	};
	myChart_sub4.setOption(option_sub4);
});