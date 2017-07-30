$(function() {
	var myChart = echarts.init($("#data-summary-bar")[0]);
	option = {
//		title: {
//			text: '世界人口总量',
//			subtext: '数据来自网络'
//		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			// data: ['2011年', '2012年']
		},
		grid: {
			top: '3%',
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01]
		},
		yAxis: {
			type: 'category',
			data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
		},
		series: [{
			name: '2011年',
			type: 'bar',
			data: [18203, 23489, 29034, 104970, 131744, 630230]
		}]
	};
	myChart.setOption(option);
})