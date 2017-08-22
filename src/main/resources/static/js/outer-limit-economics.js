(function($){
    $.get('data/guangzhou.json', function (GuangZhouJson) {
        echarts.registerMap('guangzhou', GuangZhouJson);
        var chart = echarts.init(document.getElementById('regionECharts'));
        // 113.325828,23.099192
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
                /*
				 * itemStyle: { normal: { label: { show: true } }, emphasis: {
				 * label: { show: true } } },
				 */
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
        [4, 33, 7, 29, 0.33, 16, 6, "优"]
    ];

    var dataGZ = [
        [1, 26, 37, 27, 1.163, 27, 13, "优"],
        [2, 85, 62, 71, 1.195, 60, 8, "良"],
        [3, 78, 38, 74, 1.363, 37, 7, "良"],
        [4, 21, 21, 36, 0.634, 40, 9, "优"]
    ];

    var dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, "良"],
        [2, 65, 27, 78, 0.86, 45, 29, "良"],
        [3, 83, 60, 84, 1.09, 73, 27, "良"],
        [4, 109, 81, 121, 1.28, 68, 51, "一般"]
    ];

    var schema = [
        {name: '周期', index: 0, text: '未来四周'},
        {name: '工业产值', index: 1, text: '工业产值'},
        {name: '建筑业产值', index: 2, text: '建筑业产值'},
        {name: '农业产值', index: 3, text: '农业产值'},
        {name: '运输业产值', index: 4, text: '运输业产值'},
        {name: '商业产值', index: 5, text: '商业产值'},
        {name: '消费水平', index: 6, text: '消费水平'},
        {name: '经济状况', index: 7, text: '经济状况'}
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
            data: ['天河区', '海珠区', '黄埔区', '番禺区', '白云区', '荔湾区'],
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
                type: 'category', data: ['优', '良', '较良', '一般', '较差', '差']
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
                name: '天河区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataBJ
            },
            {
                name: '海珠区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataSH
            },
            {
                name: '黄埔区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataGZ
            },
            {
                name: '番禺区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataBJ
            },
            {
                name: '白云区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataGZ
            },
            {
                name: '荔湾区',
                type: 'parallel',
                lineStyle: lineStyle,
                data: dataSH
            }
        ]
    };

    parallel_nutrients.setOption(parallel_nutrients_option);
})(jQuery);