$(function() {
	
	var myChart = echarts.init($("#data-summary-bar")[0]);
	option = {

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},

		grid: {
			top: '3%',
			left: '3%',
			right: '4%',
			bottom: '5%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLabel : {
				interval : 0,
				rotate : 30,// 倾斜度 -90 至 90 默认为0
				margin : 5,
				textStyle : {
					fontWeight : "normal",
					color : "#000000"
				}
			}
		},
		yAxis: {
			type: 'category',
			data: ['运营', '旅行', '通勤','运营1', '旅行2', '通勤2']
		},
		series: [{
			name: '车辆性质排名',
			type: 'bar',
			data: [18203, 23489, 29034, 104970, 131744, 630230]
		}]
	};
	myChart.setOption(option);
	 $(window).on("resize", function () {
		 myChart.resize();
	    });
})