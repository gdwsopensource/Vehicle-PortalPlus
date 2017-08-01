$(function(){
	var myChart_alert_type_analysis=echarts.init($("#alert-type-analysis")[0]);
	var option_alert_type_analysis = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['重点关注','未年检','没年检','其他','违章','多次违章']
		    },
		    series: [
		        {
		            name:'访问来源',
		            type:'pie',
//		            selectedMode: 'single',
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
		            data:[
		                {value:335, name:'没年检'},
		                {value:679, name:'其他'},
		                {value:1548, name:'多次违章'}
		            ]
		        },
		        {
		            name:'访问来源',
		            type:'pie',
		            radius: ['40%', '55%'],

		            data:[
		                {value:335, name:'重点关注'},
		                {value:310, name:'没年检'},
		                {value:234, name:'违章'},
		                {value:135, name:'其他'},
		                {value:1048, name:'未年检'}
//		                {value:251, name:'谷歌'},
//		                {value:147, name:'必应'},
//		                {value:102, name:'其他'}
		            ]
		        }
		    ]
		};
	myChart_alert_type_analysis.setOption(option_alert_type_analysis,true);
	
	var myChart_high_frequency_bayonet=echarts.init($("#high-frequency-bayonet-analysis")[0]);
	var option_high_frequency_bayonet= {
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10	%',
		        top:'3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        boundaryGap: [0, 0.01],
		        axisLabel:{  
                    interval:0,  
                    rotate:30,//倾斜度 -90 至 90 默认为0  
                    margin:2,  
                    textStyle:{  
                        fontWeight:"normal",  
                        color:"#000000"  
                    }  
                },  
		    },
		    yAxis: {
		        type: 'category',
		        data: ['天河北路388号路段','广园快速农科院路段','科韵路中山立交路段','广州大道中天河北路路段','禺东西路省军区路段','花城大道广州大道路段'],
		        
		    },
		    series: [
		        {
		            name: '2011年',
		            type: 'bar',
		            data: [18203, 23489, 29034, 104970, 131744, 630230]
		        },
		        {
		            name: '2012年',
		            type: 'bar',
		            data: [19325, 23438, 31000, 121594, 134141, 681807]
		        }
		    ]
		};
	
	myChart_high_frequency_bayonet.setOption(option_high_frequency_bayonet,true);
	
	var myChart_serious_illegal=echarts.init($("#serious-illegal-analysis")[0]);
	function getVirtulData(year) {
	    year = year || '2017';
	    var date = +echarts.number.parseDate(year + '-01-01');
	    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
	    var dayTime = 3600 * 24 * 1000;
	    var data = [];
	    for (var time = date; time < end; time += dayTime) {
	        data.push([
	            echarts.format.formatTime('yyyy-MM-dd', time),
	            Math.floor(Math.random() * 1000)
	        ]);
	    }
	    console.log(data[data.length - 1]);
	    return data;
	}



	var graphData = [
	    [
	        1485878400000,
	        260
	    ],
	    [
	        1486137600000,
	        200
	    ],
	    [
	        1486569600000,
	        279
	    ],
	    [
	        1486915200000,
	        847
	    ],
	    [
	        1487347200000,
	        241
	    ],
	    [
	        1487779200000,
	        411
	    ],
	    [
	        1488124800000,
	        985
	    ]
	];

	var links = graphData.map(function (item, idx) {
		 return {
		        source: idx,
		        target: idx + 1,
		        lineStyle:{
		            normal:{
		                color:'red'
		            },
		            emphasis:{
		                color:'red'    
		            }
		        }
		    };
	});
	links.pop();

	var option_serious_illegal = {
	    tooltip: {
	        position: 'top'
	    },

	    visualMap: [ {
	        min: 0,
	        max: 1000,
	        inRange: {
	            color: ['#5290fe'],
	            opacity: [0, 1]
	        },
	        calculable: true,
	        seriesIndex: [1],
	        orient: 'vertical',
	        right: '1%',
	        bottom: 20
	    }],
	    gird:{left:'3%'},
	    calendar: [
	    {
	    	left: 30,
	        orient: 'vertical',
	        yearLabel: {show: false},
	       monthLabel: {
	            nameMap: 'cn',
//	            margin: 20
	        },
	        dayLabel: {
	            firstDay: 1,
	            nameMap: 'cn'
	        },
	        cellSize: 30,
	        range: '2017-02'
	    }],

	    series: [{
	        type: 'graph',
	        edgeSymbol: ['none', 'arrow'],
	        coordinateSystem: 'calendar',
	        links: links,
	        symbolSize: 10,
	        calendarIndex: 0,
	        data: graphData
	    }, {
	        type: 'heatmap',
	        coordinateSystem: 'calendar',
	        data: getVirtulData(2017)
	    }]
	};
		myChart_serious_illegal.setOption(option_serious_illegal,true);
})