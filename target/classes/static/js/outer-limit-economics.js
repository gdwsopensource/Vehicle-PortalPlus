(function($){
    $.get('data/guangzhou.json', function (GuangZhouJson) {
        echarts.registerMap('guangzhou', GuangZhouJson);
        var chart = echarts.init(document.getElementById('regionECharts'));
        //113.325828,23.099192
        chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (params.data.index > 0) {
                        var index = '<i class="fa fa-long-arrow-up" aria-hidden="true"></i>&nbsp;' + (Math.abs(params.data.index) * 100) + '%';
                    } else {
                        var index = '<i class="fa fa-long-arrow-down" aria-hidden="true"></i>&nbsp;' + (Math.abs(params.data.index) * 100) + '%';
                    }
                    return params.name + '</br>' + '经济总量：' + params.value + '&nbsp;/亿' + '<br/>' + index;
                }
            },
            label:{
            	normal:{
            		show:true
            	}
            },
            series: [{
                type: 'map',
                name: '过车频次',
                map: 'guangzhou',
                roam: false,
                selectedMode: 'single',
                data: [
                    {name: "天河区", value: 203, index: 0.15},
                    {name: "番禺区", value: 240, index: 0.15},
                    {name: "黄埔区", value: 250, index: 0.15},
                    {name: "荔湾区", value: 250, index: -0.15},
                    {name: "海珠区", value: 250, index: 0.15},
                    {name: "从化区", value: 250, index: -0.15},
                    {name: "增城区", value: 250, index: -0.15},
                    {name: "白云区", value: 250, index: -0.15},
                    {name: "花都区", value: 250, index: -0.15},
                    {name: "越秀区", value: 250, index: -0.15},
                    {name: "南沙区", value: 250, index: 0.15}
                ],
                /*itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },*/
                markPoint: {
					symbol: 'image://../image/map-pin.png',
					symbolSize: [36, 48],
					itemStyle: {
						normal: {
							label: {
								show: true,
								formatter: function (params) {
									console.log(params);
									if (params.data.index > 0) {
				                        var index ='+'+(Math.abs(params.data.index) * 100) + '%';
				                    } else {
				                        var index ='-'+(Math.abs(params.data.index) * 100) + '%';
				                    }
				                    return index;
								}
							}
						}
					},
					label: {
						normal: {
							textStyle: {
								color: '#a4ca49',
								fontSize: 10
							},
							offset: [0, -5]
						}
					},
					data: [
						{
							name: "天河区",
							index: '0.15',
							value: 203,
							coord: [113.384483,23.17578]
						},
						{
							name: "番禺区",
							index: '-0.15',
							value: 203,
							coord: [113.355737,22.977358]
						},
						{
							name: "黄埔区",
							index: '-0.15',
							value: 203,
							coord: [113.479631,23.190663]
						},
						{
							name: "海珠区",
							index: '0.25',
							value: 203,
							coord: [113.285597,23.108785]
						},
						{
							name: "荔湾区",
							index: '0.35',
							value: 203,
							coord: [113.2202,23.112774]
						},
						{
							name: "南沙区",
							index: '0.35',
							value: 203,
							coord: [113.473594,22.851129]
						},
						{
							name: "白云区",
							index: '0.25',
							value: 203,
							coord: [113.266337,23.224409]
						},
						{
							name: "花都区",
							index: '-0.15',
							value: 203,
							coord: [113.139856,23.428297]
						},
						{
							name: "从化区",
							index: '-0.05',
							value: 203,
							coord: [113.531373,23.555035]
						},
						{
							name: "增城区",
							index: '-0.05',
							value: 203,
							coord: [113.832629,23.288158]
						}
					]
                }
            }]
        });
        chart.on('click', function (params) {
            console.log(params);
        });
    });

    var dataBJ = [
        [1, 55, 9, 56, 0.46, 18, 6, "良"],
        [2, 25, 11, 21, 0.65, 34, 9, "优"],
        [3, 56, 7, 63, 0.3, 14, 5, "良"],
        [4, 33, 7, 29, 0.33, 16, 6, "优"],
        [5, 42, 24, 44, 0.76, 40, 16, "优"],
        [6, 82, 58, 90, 1.77, 68, 33, "良"],
        [7, 74, 49, 77, 1.46, 48, 27, "良"],
        [8, 78, 55, 80, 1.29, 59, 29, "良"],
        [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
        [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
        [11, 39, 19, 38, 0.57, 31, 15, "优"],
        [12, 41, 11, 40, 0.43, 21, 7, "优"],
        [13, 64, 38, 74, 1.04, 46, 22, "良"],
        [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
        [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
        [16, 33, 6, 29, 0.34, 13, 5, "优"],
        [17, 94, 66, 110, 1.54, 62, 31, "良"]
    ];

    var dataGZ = [
        [1, 26, 37, 27, 1.163, 27, 13, "优"],
        [2, 85, 62, 71, 1.195, 60, 8, "良"],
        [3, 78, 38, 74, 1.363, 37, 7, "良"],
        [4, 21, 21, 36, 0.634, 40, 9, "优"],
        [5, 41, 42, 46, 0.915, 81, 13, "优"],
        [6, 56, 52, 69, 1.067, 92, 16, "良"],
        [7, 64, 30, 28, 0.924, 51, 2, "良"],
        [8, 55, 48, 74, 1.236, 75, 26, "良"],
        [9, 76, 85, 113, 1.237, 114, 27, "良"],
        [10, 91, 81, 104, 1.041, 56, 40, "良"],
        [11, 84, 39, 60, 0.964, 25, 11, "良"],
        [12, 64, 51, 101, 0.862, 58, 23, "良"],
        [13, 70, 69, 120, 1.198, 65, 36, "良"],
        [14, 77, 105, 178, 2.549, 64, 16, "良"],
        [15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
        [16, 73, 68, 97, 0.905, 51, 34, "良"],
        [17, 54, 27, 47, 0.592, 53, 12, "良"]
    ];

    var dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, "良"],
        [2, 65, 27, 78, 0.86, 45, 29, "良"],
        [3, 83, 60, 84, 1.09, 73, 27, "良"],
        [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [8, 89, 65, 78, 0.86, 51, 26, "良"],
        [9, 53, 33, 47, 0.64, 50, 17, "良"],
        [10, 80, 55, 80, 1.01, 75, 24, "良"],
        [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
        [12, 99, 71, 142, 1.1, 62, 42, "良"],
        [13, 95, 69, 130, 1.28, 74, 50, "良"],
        [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
        [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
        [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
        [17, 79, 43, 107, 1.05, 59, 37, "良"]
    ];

    var schema = [
        {name: 'date', index: 0, text: '年份'},
        {name: 'AQIindex', index: 1, text: 'AQI'},
        {name: 'PM25', index: 2, text: 'PM2.5'},
        {name: 'PM10', index: 3, text: 'PM10'},
        {name: 'CO', index: 4, text: ' CO'},
        {name: 'NO2', index: 5, text: 'NO2'},
        {name: 'SO2', index: 6, text: 'SO2'},
        {name: '等级', index: 7, text: '等级'}
    ];

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    var parallel_nutrients = echarts.init(document.getElementById('parallel_nutrients'));

    var parallel_nutrients_option = {
        color: [
            '#5bb4d9', '#f47564', '#4fc3b9', '#f39c12', '#1da02b', '#63869e'
        ],
        legend: {
            bottom: 5,
            data: ['工业产值', '建筑业产值', '农业产值', '运输业产值', '商业产值', '消费水平'],
            itemGap: 20,
            textStyle: {
                color: '#333',
                fontSize: 14
            },
            width: '90%'
        },
        tooltip: {},
        parallelAxis: [
            {dim: 0, name: schema[0].text},
            {dim: 1, name: schema[1].text},
            {dim: 2, name: schema[2].text},
            {dim: 3, name: schema[3].text},
            {dim: 4, name: schema[4].text},
            {dim: 5, name: schema[5].text},
            {dim: 6, name: schema[6].text},
            {
                dim: 7, name: schema[7].text,
                type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']
            }
        ],
        parallel: {
            bottom: 100,
            left: '10%',
            layout: 'vertical',
            parallelAxisDefault: {}
        },
        series: [
            {
                name: '工业产值',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataBJ
            },
            {
                name: '建筑业产值',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataSH
            },
            {
                name: '农业产值',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataGZ
            },
            {
                name: '运输业产值',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataBJ
            },
            {
                name: '商业产值',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataGZ
            },
            {
                name: '消费水平',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataSH
            }
        ]
    };

    parallel_nutrients.setOption(parallel_nutrients_option);
})(jQuery);