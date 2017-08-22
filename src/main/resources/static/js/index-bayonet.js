(function($){
	$('#police_scroll').slimScroll({
        height: '231px',
        size: '5px',
        color: '#d2d6de'
    });
	
	$('#car_result').slimScroll({
        height: '400px',
        size: '5px',
        color: '#d2d6de'
    });
	$('#car_result').find('table').find('tbody').find('tr').not('.thead').on('click',function(){
		window.location.href='/index-car';
	});
	
    function data() {
        var d = [];
        for (var i = 0; i < 24; i++) {
            d.push({name: i + '~' + (i + 1), value: Math.random() * 100});
        }
        return d;
    }

    console.log(data());

    // 基于准备好的dom，初始化echarts实例
    var gaugeECharts_1 = echarts.init(document.getElementById('gaugeECharts_1'));
    var gaugeECharts_1_option = {
        legend: {
            right: 10,
            orient: 'vertical',
            data: [
                {
                    name: '实时车流量',
                    icon: 'circle'
                },
                {
                    name: '时刻表',
                    icon: 'circle',
                    color: '#fd6a6a'
                }
            ]
        },
        tooltip: {
            trigger: 'item',
            position: ['48.5%', '49.2%'],
            backgroundColor: 'rgba(50,50,50,0)',
            textStyle: {
                color: 'yellow',
                fontWeight: 'bold'
            },
            formatter: "{d}%"
        },
        series: [
            {
                name: '实时车流量',
                type: 'pie',
                radius: ['5%', '70%'],
                roseType: 'area',
                color: ['#3fa7dc'],
                data: data(),
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: '时刻表',
                type: 'gauge',
                min: 0,
                max: 24,
                startAngle: 90,
                endAngle: 449.9,
                radius: '85%',
                splitNumber: 24,
                clockwise: false,
                animation: false,
                detail: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#63869e'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: [
                            [0.25, '#63869e'],
                            [0.75, '#ffffff'],
                            [1, '#63869e']
                        ],
                        width: '40%',
                        shadowColor: '#0d4b81', //默认透明
                        shadowBlur: 30,
                        opacity: 1
                    }
                },
                splitLine: {
                    length: 5,
                    lineStyle: {
                        color: '#ffffff',
                        width: 2
                    }
                },
                axisLabel: {
                    formatter: function (v) {
                        return v ? v : '';
                    },
                    textStyle: {
                        color: "red",
                        fontWeight: 700,
                        fontSize: 12
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fd6a6a',
                        width: 2
                    }
                }
            },
            {
                name: '',
                type: 'gauge',
                min: 0,
                max: 24,
                startAngle: 90,
                endAngle: 449.9,
                radius: '72%',
                splitNumber: 24,
                clockwise: false,
                animation: false,
                detail: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#63869e'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: [
                            [1, '#E8E8E8']
                        ],
                        width: '10%',
                        opacity: 0.8
                    }
                },
                splitLine: {
                    show: true,
                    length: '92%',
                    lineStyle: {
                        color: 'grey',
                        width: '1'
                    }
                },
                axisLabel: {
                    show: false,
                    formatter: function (v) {
                        return v ? v : '';
                    },
                    textStyle: {
                        color: "#fb5310",
                        fontWeight: 700
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'green',
                        width: 2,
                        borderWidth: 3,
                    }
                }
            }
        ]
    };
    gaugeECharts_1.setOption(gaugeECharts_1_option);

    // 基于准备好的dom，初始化echarts实例
    var lineECharts = echarts.init(document.getElementById('lineECharts'));
    var lineECharts_option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['卡口1']
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
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '卡口1',
                type: 'line',
                data: [40, 30, 40, 52, 15, 85, 81],
                itemStyle: {
                    normal: {
                        color: '#f39402'
                    }
                }
            }
        ]
    }
    lineECharts.setOption(lineECharts_option);

    var barECharts = echarts.init(document.getElementById('barECharts'));
    var barECharts_option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
        },
        xAxis: {
            data: ["酒驾", "醉驾", "误闯", "抢行", "事故", "其他"]
        },
        yAxis: {
            name: '次数',
            type: 'value'
        },
        series: [
            {
                name: '违法闯红灯',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 22],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#5bb4d9', '#4fc3b9', '#f47564', '#f39c12', '#63869e', '#3b5e75'];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }
        ]
    };
    barECharts.setOption(barECharts_option);

    var pieECharts = echarts.init(document.getElementById('pieECharts'));
    var pieECharts_option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [{
            name: '违法闯红灯',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                {
                    value: 5,
                    name: '酒驾'
                },
                {
                    value: 20,
                    name: '醉驾'
                },
                {
                    value: 36,
                    name: '误闯'
                },
                {
                    value: 10,
                    name: '抢行'
                },
                {
                    value: 10,
                    name: '事故'
                },
                {
                    value: 20,
                    name: '其他'
                }
            ],
            itemStyle: {
                normal: {
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    color: function (params) {
                        var colorList = ['#5bb4d9', '#4fc3b9', '#f47564', '#f39c12', '#63869e', '#3b5e75'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        }]
    };
    pieECharts.setOption(pieECharts_option);

    var graphECharts = echarts.init(document.getElementById('graphECharts'));
    var graphECharts_option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: '相连卡口',
                layout: 'force',
                type: 'graph',
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                symbolSize: function (value, params) {
                    return value;
                },
                force: {
                    repulsion: 1000
                },
                focusNodeAdjacency: true,
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 1
                    }
                },
                data: [
                    {
                        name: '卡口1',
                        value: 100,
                    },
                    {
                        name: '卡口2',
                        value: 55
                    },
                    {
                        name: '卡口3',
                        value: 55
                    },
                    {
                        name: '卡口4',
                        value: 55
                    },
                    {
                        name: '卡口5',
                        value: 55
                    }
                ],
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        color: function (params) {
                            var colorList = ['#3a8cbb', '#f47564', '#63869e', '#f39c12', '#4fc3b9'];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                links: [
                    {
                        source: '卡口3',
                        target: '卡口1'
                    },
                    {
                        source: '卡口4',
                        target: '卡口1'
                    },
                    {
                        source: '卡口2',
                        target: '卡口1'
                    },
                    {
                        source: '卡口4',
                        target: '卡口1'
                    },
                    {
                        source: '卡口5',
                        target: '卡口1'
                    }
                ]
            }
        ]
    };
    graphECharts.setOption(graphECharts_option);
})(jQuery);