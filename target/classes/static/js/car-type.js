$(function() {
	var car_type = $("#car-type")[0];
	var myChart = echarts.init(car_type);
	var easingFuncs = {

		"早出晚归": function(k) {
			if((k *= 2) < 1) {
				return -0.5 * (Math.sqrt(1 - k * k) - 1);
			}
			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
		},
		"昼伏夜出": function(k) {
			var s;
			var a = 0.1;
			var p = 0.4;
			if(k === 0) {
				return 0;
			}
			if(k === 1) {
				return 1;
			}
			if(!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}
			return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		},
		"全时活跃": function(k) {
			var s;
			var a = 0.1;
			var p = 0.4;
			if(k === 0) {
				return 0;
			}
			if(k === 1) {
				return 1;
			}
			if(!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}
			return(a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
		},

		backInOut: function(k) {
			var s = 1.70158 * 1.525;
			if((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}
			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
		},

		// 创建弹跳效果
		bounceIn: function(k) {
			return 1 - easingFuncs.bounceOut(1 - k);
		},
		bounceOut: function(k) {
			if(k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if(k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if(k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}
		}
	};

	var N_POINT = 30;

	var grids = [];
	var xAxes = [];
	var yAxes = [];
	var series = [];
	var titles = [];
	var count = 0;
	echarts.util.each(easingFuncs, function(easingFunc, name) {
		var data = [];
		for(var i = 0; i <= N_POINT; i++) {
			var x = i / N_POINT;
			var y = easingFunc(x);
			data.push([x, y]);
		}
		grids.push({
			show: true,
			borderWidth: 0,
			backgroundColor: '#fff',
			shadowColor: 'rgba(0, 0, 0, 0.3)',
			shadowBlur: 2
		});
		xAxes.push({
			type: 'value',
			show: false,
			min: 0,
			max: 1,
			gridIndex: count
		});
		yAxes.push({
			type: 'value',
			show: false,
			min: -0.4,
			max: 1.4,
			gridIndex: count
		});
		series.push({
			name: name,
			type: 'line',
			xAxisIndex: count,
			yAxisIndex: count,
			data: data,
			showSymbol: false,
			animationEasing: name,
			animationDuration: 1000
		});
		titles.push({
			textAlign: 'center',
			text: name,
			textStyle: {
				fontSize: 12,
				fontWeight: 'normal'
			}
		});
		count++;
	});

	var rowNumber = Math.ceil(Math.sqrt(count));
	echarts.util.each(grids, function(grid, idx) {
		grid.left = ((idx % rowNumber) / rowNumber * 100 + 0.5) + '%';
		grid.top = 1.5*(Math.floor(idx / rowNumber) / rowNumber * 100 + 0.5) + '%';
		grid.width = (1 / rowNumber * 100 - 1) + '%';
		grid.height = (1.5 / rowNumber * 100 - 1) + '%';
		titles[idx].left = parseFloat(grid.left) + parseFloat(grid.width) / 2 + '%';
		titles[idx].top = parseFloat(grid.top) + '%';
	});

	option = {
		title: titles.concat([{
		
		}]),
		grid: grids,
		xAxis: xAxes,
		yAxis: yAxes,
		series: series
	};
	myChart.setOption(option);
})