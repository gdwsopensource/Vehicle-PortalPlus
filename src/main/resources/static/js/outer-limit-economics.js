(function($){
	var uploadedDataURL = "../data/data-1477626617822-SJMboHgel.txt";

    function convertData(sourceData) {
        return [].concat.apply([], $.map(sourceData, function (busLine, index) {
            var prevPoint = null;
            var points = [];
            var value = busLine.shift();
            for (var i = 0; i < busLine.length; i += 2) {
                var point = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                    point = [
                        prevPoint[0] + point[0],
                        prevPoint[1] + point[1]
                    ];
                }
                prevPoint = point;

                points.push([point[0] / 1e5, point[1] / 1e5]);
            }
            return {
                value: value,
                coords: points
            };
        }));
    }

    var option = {
        bmap: {
            roam: true
        },
        visualMap: {
            type: "piecewise",
            left: 'right',
            /*            pieces: [
                    {min: 15}, // 不指定 max，表示 max 为无限大（Infinity）。
                    {min: 12, max: 15},
                    {min: 9, max: 12},
                    {min: 6, max: 9},
                    {min: 3, max: 6},
                    {max: 3}     // 不指定 min，表示 min 为无限大（-Infinity）。
                ],*/
            min: 0,
            max: 15,
            splitNumber: 5,
            maxOpen: true,
            color: ['red', 'yellow', 'green']
        },
        tooltip: {
            formatter: function (params, ticket, callback) {
                return "拥堵指数:" + params.value;
            },
            trigger: 'item'
        },
        series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            lineStyle: {
                normal: {
                    opacity: 1,
                    width: 4
                },
                emphasis: {
                    width: 6
                }
            },
            effect: {
                show: true,
                symbolSize: 2,
                color: "white"
            }
        }]
    };

    $.getJSON(uploadedDataURL, function (rawData) {
        option.series[0].data = convertData(rawData);
        var mapECharts = echarts.init(document.getElementById('mapECharts'));
        mapECharts.setOption(option);
        // console.log(option);
        //获取echart中使用的bmap实例
        var map = mapECharts.getModel().getComponent('bmap').getBMap();
        map.disableDoubleClickZoom();
        map.centerAndZoom("嘉兴", 13);

    });

    var lineECharts = echarts.init(document.getElementById('lineECharts'));
    var lineECharts_option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['总量']
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
            data: ['私家车', '货运车', '面包车', '出租车', '客车', '其他']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '总量',
                type: 'line',
                data: [40, 30, 40, 52, 15, 85, 81],
                itemStyle: {
                    normal: {
                        color: '#4fc3b9'
                    }
                }
            }
        ]
    };
    lineECharts.setOption(lineECharts_option);

    var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'));
    var pieECharts_1_option = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c} KM/H"
        },
        series: [
            {
                name: '平均速度',
                type: 'gauge',
                detail: {
                    formatter: '{value} KM/H',
                    textStyle: {
                        fontSize: 15
                    }
                },
                data: [{value: 50, name: '速度'}]
            }
        ]
    };
    pieECharts_1.setOption(pieECharts_1_option);


    var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
    var pieECharts_2_option = {
        color: ['#1da02b', '#f4563c', '#14aae4', '#f29503', '#4f5c65'],// 调色盘颜色列表。
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '执法情况',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        formatter: function (param) {
                            return param.name;
                        }
                    }
                },
                data: [
                    {value: 1548, name: '闯红灯'},
                    {value: 335, name: '假套牌'},
                    {value: 310, name: '其他'},
                    {value: 234, name: '多次违章'},
                    {value: 135, name: '违反交通规则'}
                ]
            }
        ]
    };
    pieECharts_2.setOption(pieECharts_2_option);

    var lineECharts_2 = echarts.init(document.getElementById('lineECharts_2'));
    var lineECharts_2_option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['案件1', '案件2', '案件3', '案件4', '案件5']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        series: [
            {
                name: '案件1',
                type: 'line',
                data: [40, 30, 40, 52, 15, 85, 52],
                itemStyle: {
                    normal: {
                        color: '#1da02b'
                    }
                }
            },
            {
                name: '案件2',
                type: 'line',
                data: [50, 20, 60, 58, 56, 35, 30],
                itemStyle: {
                    normal: {
                        color: '#4fc3b9'
                    }
                }
            },
            {
                name: '案件3',
                type: 'line',
                data: [20, 40, 60, 72, 16, 85, 65],
                itemStyle: {
                    normal: {
                        color: '#f39402'
                    }
                }
            },
            {
                name: '案件4',
                type: 'line',
                data: [10, 60, 77, 22, 35, 55, 63],
                itemStyle: {
                    normal: {
                        color: '#f47564'
                    }
                }
            },
            {
                name: '案件5',
                type: 'line',
                data: [60, 20, 45, 36, 25, 45, 88],
                itemStyle: {
                    normal: {
                        color: '#5bb4d9'
                    }
                }
            }
        ]
    };
    lineECharts_2.setOption(lineECharts_2_option);


    var barECharts = echarts.init(document.getElementById('barECharts'));
    var barECharts_option = {
        tooltip: {
        	trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
            formatter: "{a} <br/>{b}: {c}件"
        },
        xAxis: {
            data: ["天河区", "黄埔区", "海珠区", "番禺区", "荔湾区", "南沙区", "从化区", "花都区", "增城区"]
        },
        yAxis: {
            name: '次数',
            type: 'value'
        },
        series: [
            {
                name: '案发量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 22, 23, 25, 63],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#5bb4d9', '#4fc3b9', '#f47564', '#f39c12', '#63869e', '#3b5e75', '#1da02b', '#f47564', '#f39c12'];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }
        ]
    }
    barECharts.setOption(barECharts_option);

    var radarECharts = echarts.init(document.getElementById('radarECharts'));
    var radarECharts_option = {
        tooltip: {
            trigger: 'item',
        },
        radar: [
            {
                indicator: [
                    {text: '预警1'},
                    {text: '预警2'},
                    {text: '预警3'},
                    {text: '预警4'},
                    {text: '预警5'},
                    {text: '预警6'}
                ],
                startAngle: 90,
                splitNumber: 4
            }
        ],
        series: [
            {
                name: '每日预警',
                type: 'radar',
                data: [
                    {
                        value: [120, 118, 130, 100, 99, 70],
                        name: '今天预警',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#5e9ea6'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#5e9ea6'
                            }
                        },
                    },
                    {
                        value: [90, 113, 140, 30, 70, 60],
                        name: '昨天预警',
                        areaStyle: {
                            normal: {
                                color: '#b4d0e1'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#d89982'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#d89982'
                            }
                        }
                    }
                ]
            }
        ]
    };
    radarECharts.setOption(radarECharts_option);

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
            series: [{
                type: 'map',
                name: '过车频次',
                map: 'guangzhou',
                roam: true,
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
                ]
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
            bottom: 10,
            data: ['工业产值', '建筑业产值', '农业产值', '运输业产值', '商业产值', '消费水平'],
            itemGap: 20,
            textStyle: {
                color: '#333',
                fontSize: 14
            },
            width: '60%'
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