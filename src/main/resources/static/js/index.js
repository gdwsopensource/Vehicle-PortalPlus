$('#map-tab').find('.tab-title').on('click','a',function() {
	var index = $(this).index();
	$(this).addClass('active').removeClass('disabled').siblings()
			.removeClass('active').addClass('disabled');
	$('#map-tab').find('.tab-content').eq(index).show().siblings(
			'.tab-content').hide();
	return false;
});
$.get('data/guangzhou.json', function (GuangZhouJson) {
    echarts.registerMap('guangzhou', GuangZhouJson);
    var chart = echarts.init(document.getElementById('map'));
    //113.325828,23.099192
    chart.setOption({
        tooltip: {
            trigger: 'item'
        },
        series: [{
            type: 'map',
            name: '过车频次',
            map: 'guangzhou',
            roam: true,
            selectedMode: true,
            data: [
                {name: "天河区", value: 203},
                {name: "番禺区", value: 240},
                {name: "黄埔区", value: 250},
                {name: "荔湾区", value: 250},
                {name: "海珠区", value: 250},
                {name: "从化区", value: 250},
                {name: "增城区", value: 250},
                {name: "白云区", value: 250},
                {name: "花都区", value: 250},
                {name: "越秀区", value: 250},
                {name: "南沙区", value: 250}
            ],
            markPoint: {
                symbol: 'image://../image/map-pin.png',
                symbolSize: [26, 38],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
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
                    /*从化区*/
                    {
                        name: "卡口1",
                        value: '24',
                        coord: [113.562891, 23.402281]
                    }, {
                        name: "卡口1",
                        value: '25',
                        coord: [113.562891, 23.472281]
                    }, {
                        name: "卡口1",
                        value: '42',
                        coord: [113.662891, 23.592281]
                    }, {
                        name: "卡口1",
                        value: '43',
                        coord: [113.452891, 23.502281]
                    }, {
                        name: "卡口1",
                        value: '44',
                        coord: [113.502891, 23.452281]
                    }, {
                        name: "卡口1",
                        value: '45',
                        coord: [113.562891, 23.592281]
                    },
                    /*番禺区*/
                    {
                        name: "卡口1",
                        value: 23,
                        coord: [113.391728, 22.942663]
                    },
                    /* 荔湾区*/
                    {
                        name: "卡口2",
                        value: '13',
                        coord: [113.202891, 23.072281]
                    }, {
                        name: "卡口3",
                        value: '14',
                        coord: [113.242891, 23.072281]
                    }, {
                        name: "卡口4",
                        value: '15',
                        coord: [113.222891, 23.102281]
                    }, {
                        name: "卡口5",
                        value: '20',
                        coord: [113.222891, 23.122281]
                    },
                    //南沙区
                    {
                        name: "卡口6",
                        value: '29',
                        coord: [113.442891, 22.802281]
                    }, {
                        name: "卡口7",
                        value: '30',
                        coord: [113.662891, 22.702281]
                    }, {
                        name: "卡口8",
                        value: '49',
                        coord: [113.462891, 22.882281]
                    }, {
                        name: "卡口9",
                        value: '50',
                        coord: [113.402891, 22.872281]
                    }
                ]
            }
        }]
    });
    chart.on('click', function (params) {
        console.log(params);
    });
});

// 基于准备好的dom，初始化echarts实例
var pieECharts_loop = echarts.init(document.getElementById('pieECharts_loop'));
var pieECharts_loop_option = {
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b}: {c} ({d}%)"
	},
	legend : {
		orient : 'horizontal',
		data : [ '卡口1', '卡口2', '卡口3', '卡口4', '卡口5' ],
	},
	series : [ {
		name : '过车频次',
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
		data : [ {
			value : 335,
			name : '卡口1'
		}, {
			value : 310,
			name : '卡口2'
		}, {
			value : 234,
			name : '卡口3'
		}, {
			value : 135,
			name : '卡口4'
		}, {
			value : 1548,
			name : '卡口5'
		} ]
	} ]
};
pieECharts_loop.setOption(pieECharts_loop_option);
// 基于准备好的dom，初始化echarts实例
var pieECharts = echarts.init(document.getElementById('pieECharts'));
var pieECharts_option = {
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	legend : {
		orient : 'horizontal',
		data : [ '卡口1', '卡口2', '卡口3', '卡口4', '卡口5' ],
	},
	series : [ {
		name : '过车频次',
		type : 'pie',
		radius : '55%',
		center : [ '50%', '60%' ],
		data : [ {
			value : 335,
			name : '卡口1'
		}, {
			value : 310,
			name : '卡口2'
		}, {
			value : 234,
			name : '卡口3'
		}, {
			value : 135,
			name : '卡口4'
		}, {
			value : 1548,
			name : '卡口5 '
		} ],
		itemStyle : {
			emphasis : {
				shadowBlur : 10,
				shadowOffsetX : 0,
				shadowColor : 'rgba(0, 0, 0, 0.5)'
			}
		}
	} ]
};
pieECharts.setOption(pieECharts_option);

// 基于准备好的dom，初始化echarts实例
var barECharts = echarts.init(document.getElementById('barECharts'));
var barECharts_option = {
	color : [ '#3c8dbc' ],
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
		data : [ '卡口1', '卡口2', '卡口3', '卡口4', '卡口5', '卡口6', '卡口7' ],
		axisTick : {
			alignWithLabel : true
		}
	} ],
	yAxis : [ {
		type : 'value'
	} ],
	series : [ {
		name : '过车频次',
		type : 'bar',
		barWidth : '60%',
		data : [ 10, 52, 200, 334, 390, 330, 220 ]
	} ]
};
barECharts.setOption(barECharts_option);

// 基于准备好的dom，初始化echarts实例
var lineECharts = echarts.init(document.getElementById('lineECharts'));
var lineECharts_option = {
	tooltip : {
		trigger : 'axis'
	},
	legend : {
		data : [ '卡口1' ]
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : {
		type : 'category',
		boundaryGap : false,
		data : [ '01:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00',
				'14:00', '16:00', '18:00', '20:00', '22:00', '24:00' ]
	},
	yAxis : {
		type : 'value'
	},
	series : [ {
		name : '卡口1',
		type : 'line',
		data : [ 5, 3, 4, 3, 4, 5, 1, 8, 9, 10, 11, 12, 13 ]
	} ]
};
lineECharts.setOption(lineECharts_option);
$(window).on("resize", function() {
	lineECharts.resize();
	barECharts.resize();
	pieECharts.resize();
	pieECharts_loop.resize();
});