(function($) {
	var dataBJ = [ [ 1, 55, 9, 56, 6, "良" ],
			[ 2, 25, 11, 21,  9, "优" ],
			[ 3, 56, 7, 63,  5, "良" ],
			[ 4, 33, 7, 29,  6, "优" ],
			[ 5, 42, 24, 44,  16, "优" ],
			[ 6, 82, 58, 90,  33, "良" ],
			[ 7, 74, 49, 77,  27, "良" ],
			[ 8, 78, 55, 80,  29, "良" ],
			[ 9, 267, 216, 280,  64, "重度污染" ],
			[ 10, 185, 127, 216,  27, "中度污染" ],
			[ 11, 39, 19, 38,  15, "优" ],
			[ 12, 41, 11, 40, 7, "优" ],
			[ 13, 64, 38, 74,  22, "良" ],
			[ 14, 108, 79, 120,  41, "轻度污染" ],
			[ 15, 108, 63, 116, 26, "轻度污染" ],
			[ 16, 33, 6, 29, 5, "优" ],
			[ 17, 94, 66, 110,  31, "良" ] ];

	var dataGZ = [ [ 1, 26, 37, 27, 13, "优" ],
			[ 2, 85, 62, 71,  8, "良" ],
			[ 3, 78, 38, 74,  7, "良" ],
			[ 4, 21, 21, 36, 9, "优" ],
			[ 5, 41, 42, 46,  13, "优" ],
			[ 6, 56, 52, 69,  16, "良" ],
			[ 7, 64, 30, 28,  2, "良" ],
			[ 8, 55, 48, 74,  26, "良" ],
			[ 9, 76, 85, 113,  27, "良" ],
			[ 10, 91, 81, 104,  40, "良" ],
			[ 11, 84, 39, 60,  11, "良" ],
			[ 12, 64, 51, 101,  23, "良" ],
			[ 13, 70, 69, 120,  36, "良" ],
			[ 14, 77, 105, 178,  16, "良" ],
			[ 15, 109, 68, 87,  29, "轻度污染" ],
			[ 16, 73, 68, 97,  34, "良" ],
			[ 17, 54, 27, 47,  12, "良" ] ];

	var dataSH = [ [ 1, 91, 45, 125, 23, "良" ],
			[ 2, 65, 27, 78,  29, "良" ],
			[ 3, 83, 60, 84,  27, "良" ],
			[ 4, 109, 81, 121,  51, "轻度污染" ],
			[ 5, 106, 77, 114,  51, "轻度污染" ],
			[ 6, 109, 81, 121,  51, "轻度污染" ],
			[ 7, 106, 77, 114,  51, "轻度污染" ],
			[ 8, 89, 65, 78,  26, "良" ],
			[ 9, 53, 33, 47,  17, "良" ],
			[ 10, 80, 55, 80,  24, "良" ],
			[ 11, 117, 81, 124,  24, "轻度污染" ],
			[ 12, 99, 71, 142,  42, "良" ],
			[ 13, 95, 69, 130,  50, "良" ],
			[ 14, 116, 87, 131,  40, "轻度污染" ],
			[ 15, 108, 80, 121,  37, "轻度污染" ],
			[ 16, 134, 83, 167,  43, "轻度污染" ],
			[ 17, 79, 43, 107,  37, "良" ] ];

	var schema = [ {
		name : 'date',
		index : 0,
		text : '未来四周'
	}, {
		name : '一氧化碳',
		index : 1,
		text : '一氧化碳'
	}, {
		name : '碳氢化合物',
		index : 2,
		text : '碳氢化合物'
	}, {
		name : '氮氧化物',
		index : 3,
		text : '氮氧化物'
	},{
		name : '氢氧化物',
		index : 4,
		text : '氢氧化物'
	}, {
		name : '果粒物',
		index : 5,
		text : '果粒物'
	} ];

	var lineStyle = {
		normal : {
			width : 1,
			opacity : 0.5
		}
	};

	var parallel_nutrients = echarts.init(document
			.getElementById('parallel_nutrients'));

	var parallel_nutrients_option = {
	    color:colorRgba(),
		legend : {
			bottom : 5,
			data : [ '天河区', '番禺区', '海珠区', '南沙区', '黄埔区', '白云区' ],
			itemGap : 20,
			textStyle : {
				color : '#333',
				fontSize : 14
			},
			width : '90%'
		},
		tooltip : {},
		parallelAxis : [ {
			dim : 0,
			name : schema[0].text
		}, {
			dim : 1,
			name : schema[1].text
		}, {
			dim : 2,
			name : schema[2].text
		}, {
			dim : 3,
			name : schema[3].text
		}, {
			dim : 4,
			name : schema[4].text
		},{
			dim : 5,
			name : schema[5].text,
			type : 'category',
			data : [ '优', '良', '轻度污染', '中度污染', '重度污染', '严重污染' ]
		} ],
		parallel : {
			bottom : 100,
			left : '10%',
			layout : 'horizontal',
			parallelAxisDefault : {}
		},
		series : [ {
			name : '天河区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataBJ
		}, {
			name : '番禺区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataSH
		}, {
			name : '海珠区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataGZ
		}, {
			name : '南沙区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataBJ
		}, {
			name : '黄埔区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataGZ
		}, {
			name : '白云区',
			type : 'parallel',
			lineStyle : lineStyle,
			data : dataSH
		} ]
	};

	parallel_nutrients.setOption(parallel_nutrients_option);

	var pieECharts = echarts.init(document.getElementById('pieECharts'));
	var pieECharts_option = {
	    color:colorRgba(),
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},

		series : [ {
			name : '排放标准',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '50%' ],
			data : [ 
			{
				value : 235,
				name : '国I前'
			},
			{
				value : 225,
				name : '国I'
			}, {
				value : 210,
				name : '国II'
			}, {
				value : 304,
				name : '国III'
			}, {
				value : 505,
				name : '国IV及以后'
			}],
			roseType : 'radius',
			label : {
				normal : {
					textStyle : {
						color : '#333'
					}
				}
			},
			labelLine : {
				normal : {
					lineStyle : {
						color : '#333'
					},
					smooth : 0.2,
					length : 10,
					length2 : 20
				}
			},
			animationType : 'scale',
			animationEasing : 'elasticOut',
			animationDelay : function(idx) {
				return Math.random() * 200;
			}
		} ]
	}
	pieECharts.setOption(pieECharts_option);
	
	$("#table_air_quality").slimScroll({
		height: '450px',
		size: '5px',
		color: '#d2d6de'
	});
	
	

})(jQuery);