(function($){
	/*
	 * 热力图
	 * */
	/*
	var mapECharts = echarts.init(document.getElementById('mapECharts'));
    var uploadedDataURL = "../data/data-1464248983149-HJ1jcQNX.json";
    $.getJSON(uploadedDataURL, function (data) {
        console.log(data);
        var points = [].concat.apply([], data.map(function (track) {
            return track.map(function (seg) {
                return seg.coord.concat([1]);
            });
        }));
        mapECharts.setOption({
            animation: false,
            bmap: {
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [{
                type: 'heatmap',
                coordinateSystem: 'bmap',
                data: points,
                pointSize: 5,
                blurSize: 6
            }]
        });

        var bmap = mapECharts.getModel().getComponent('bmap').getBMap();
        // bmap.addControl(new BMap.MapTypeControl());
    });
    */
    /*
	 * 热力图
	 * */
	/**
	 * 路网图
	 */
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
	
	
    
    
    
    $('#problem_result').slimScroll({
        height: '350px',
        size: '5px',
        color: '#d2d6de'
    });
    $('#monitor_result').slimScroll({
        height: '350px',
        size: '5px',
        color: '#d2d6de'
    });

    var radarECharts = echarts.init(document.getElementById('radarECharts'));
    var radarECharts_option = {
        radar: [
            {
                indicator: [
                    {text: '违章'},
                    {text: '车流压力'},
                    {text: '通行指数'},
                    {text: '其他'},
                    {text: '指标五'}
                ],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter: '【{value}】',
                    textStyle: {
                        color: '#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(114, 172, 209, 0.2)',
                            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            }
        ],
        series: [
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        // color: 各异,
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: [100, 8, 0.40, -80, 2000],
                        name: '图一',
                        symbol: 'rect',
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        value: [60, 5, 0.30, -100, 1500],
                        name: '图二',
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }
                    }
                ]
            }
        ]
    };
    radarECharts.setOption(radarECharts_option);

    var pieECharts_1 = echarts.init(document.getElementById('pieECharts_1'))
    var pieECharts_1_option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: ['#f47564', '#4fc3b9'],
        series: [
            {
                name: '外牌车和本地车占比',
                type: 'pie',
                radius: [0, '30%'],
                label: {
                    normal: {
                        position: 'inner',
                        formatter: '{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                selectedMode: 'single',
                selectedOffset: 2,
                data: [
                    {value: 310, name: '本地车', selected: true},
                    {value: 335, name: '外牌车'}
                ]
            },
            {
                name: '外牌车和本地车占比',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 5,
                radius: ['40%', '55%'],
                data: [
                    {value: 310, name: '本地车', selected: true},
                    {value: 335, name: '外牌车'}
                ]
            }
        ]
    };
    pieECharts_1.setOption(pieECharts_1_option);

    var pieECharts_2 = echarts.init(document.getElementById('pieECharts_2'));
    var pieECharts_2_option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '外牌车归属',
                type: 'pie',
                radius: [30, 110],
                roseType: 'area',
                data: [
                    {value: 10, name: '深圳'},
                    {value: 5, name: '佛山'},
                    {value: 15, name: '东莞'},
                    {value: 25, name: '清远'},
                    {value: 20, name: '肇庆'},
                    {value: 35, name: '珠海'},
                    {value: 30, name: '中山'},
                    {value: 40, name: '江门'}
                ]
            }
        ]
    };
    pieECharts_2.setOption(pieECharts_2_option);

    var barECharts = echarts.init(document.getElementById('barECharts'));
    var barECharts_option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00',
                '18:00', '21:00', '24:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            axisPointer: {
                snap: true
            }
        },
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                {
                    lte: 2,
                    color: '#8ab3d7'
                }, {
                    gt: 2,
                    lte: 3,
                    color: 'red'
                }, {
                    gt: 3,
                    lte: 6,
                    color: '#8ab3d7'
                }, {
                    gt: 6,
                    lte: 7,
                    color: 'red'
                }, {
                    gt: 7,
                    color: '#8ab3d7'
                }
            ]
        },
        series: [
            {
                name: '频次',
                type: 'line',
                smooth: true,
                data: [300, 280, 250, 260, 270, 300, 550, 500, 500],
                markArea: {
                    label: {
                        normal: {
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f29503'
                        }
                    },
                    data: [
                        [
                            {
                                name: '早高峰',
                                xAxis: '06:00'
                            },
                            {
                                xAxis: '09:00'
                            }
                        ],
                        [
                            {
                                name: '晚高峰',
                                xAxis: '18:00'
                            },
                            {
                                xAxis: '21:00'
                            }
                        ]
                    ]
                }
            }]
    };
    barECharts.setOption(barECharts_option);

    var map_pieECharts = echarts.init(document.getElementById('map_pieECharts'));
    var map_pieECharts_option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a}:{d}%"
        },
        color: ['#ffffff', '#abc3e2'],
        grid: {
            bottom: 30
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#fff',
                    fontSize: 18
                }
            },
            data: ['今日拥堵延迟指数', '今日外牌车占比'],
        }],
        yAxis: [{
            show: false
        }],
        series: [
            {
                name: "今日拥堵延迟指数",
                type: 'pie',
                radius: ['60%', '65%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: ['30%', '50%'],
                data: [
                    {
                        value: 25,
                        name: '',
                        label: {
                            normal: {
                                formatter: '{d} %',
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '26',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    {
                        value: 75,
                        name: '',
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
            },
            {
                name: "今日外牌车占比",
                type: 'pie',
                radius: ['60%', '65%'],
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                center: ['70%', '50%'],
                data: [
                    {
                        value: 50,
                        name: '',
                        label: {
                            normal: {
                                formatter: '{d} %',
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '26',
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    {
                        value: 50,
                        name: '',
                        tooltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
            }
        ]

    };
    map_pieECharts.setOption(map_pieECharts_option);
})(jQuery);