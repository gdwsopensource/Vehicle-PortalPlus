		$('#map-tab').find('.tab-title').on('click', 'a', function () {
			var index = $(this).index();
			$(this).addClass('active').removeClass('disabled').siblings().removeClass('active').addClass('disabled');
			$('#map-tab').find('.tab-content').eq(index).show().siblings('.tab-content').hide();
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
						symbol: 'image://img/map-pin.png',
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
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'horizontal',
				data: ['面包车', '货运车', '大巴车', '私家车', '其他'],
			},
			series: [
				{
					name: '过车频次',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [
						{value: 335, name: '面包车'},
						{value: 310, name: '货运车'},
						{value: 234, name: '大巴车'},
						{value: 135, name: '私家车'},
						{value: 1548, name: '其他'}
					]
				}
			]
		};
		pieECharts_loop.setOption(pieECharts_loop_option);
		// 基于准备好的dom，初始化echarts实例
		var pieECharts = echarts.init(document.getElementById('pieECharts'));
		var pieECharts_option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'horizontal',
				data: ['卡口1', '卡口2', '卡口3', '卡口4', '卡口5'],
			},
			series: [
				{
					name: '过车频次',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						{value: 335, name: '卡口1'},
						{value: 310, name: '卡口2'},
						{value: 234, name: '卡口3'},
						{value: 135, name: '卡口4'},
						{value: 1548, name: '卡口5'}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		pieECharts.setOption(pieECharts_option);

		// 基于准备好的dom，初始化echarts实例
		var barECharts = echarts.init(document.getElementById('barECharts'));
		var barECharts_option = {
			color: ['#3c8dbc'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['卡口1', '卡口2', '卡口3', '卡口4', '卡口5', '卡口6', '卡口7'],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '过车频次',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220]
				}
			]
		};
		barECharts.setOption(barECharts_option);

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
				data: ['00:00', '06:00', '08:00', '18:00', '20:00', '24:00']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '卡口1',
					type: 'line',
					data: [4, 3, 4, 5, 1, 8]
				}
			]
		};
		lineECharts.setOption(lineECharts_option);
		$(window).on("resize", function () {
			lineECharts.resize();
			barECharts.resize();
			pieECharts.resize();
			pieECharts_loop.resize();
		});

		$('#police_table').slimScroll({
			height: '500px',
			size: '5px',
			color: '#d2d6de'
		});

		// 基于准备好的dom，初始化echarts实例
		var gaugeECharts = echarts.init(document.getElementById('gaugeECharts'));
		var gaugeECharts_option = {
			tooltip: {
				formatter: "{b} : {c}"
			},
			series: [
				{
					name: '',
					type: 'gauge',
					z: 2,
					radius: '100%',
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							width: 0,
							opacity: 0
						}
					},
					axisTick: { // 坐标轴小标记
						length: 3, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: '#aecceb'
						}
					},
					splitLine: { // 分隔线
						length: 5, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: '#aecceb'
						}
					},
					axisLabel: {
						textStyle: {
							fontSize: 8,
							color: '#aecceb'
						}
					},
					pointer: {
						show: false
					},
					title: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 12,
							color: '#86b0d6'
						},
						offsetCenter: [0, '-20%']
					},
					detail: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 12,
							color: '#86b0d6'
						},
						offsetCenter: [0, '50%'],
						formatter: function (value) {
							return '分';
						}
					},
					data: [{
						value: 40,
						name: '适合抓捕'
					}]
				},
				{
					type: 'gauge',
					z: 1,
					min: 0,
					max: 100,
					radius: '60%',
					pointer: {
						show: true,
						width: 5
					},
					axisLabel: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					title: {
						show: false
					},
					axisLine: {
						lineStyle: {
							width: 5,
							color: [[0.2, '#3a8cbb'], [0.8, '#3a8cbb'], [1, '#3a8cbb']]
						}
					},
					detail: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 14,
							color: '#3a8cbb',
							fontWeight: 600
						}
					},
					data: [{
						value: 90,
						name: '适合抓捕'
					}]
				},
				{
					name: '',
					type: 'gauge',
					z: 4,
					min: 0,
					center: ['79%', '50%'], // 默认全局居中
					max: 100,
					splitNumber: 10,
					radius: '100%',
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							width: 0,
							opacity: 0
						}
					},
					axisTick: { // 坐标轴小标记
						length: 3, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: '#f6c16b'
						}
					},
					splitLine: { // 分隔线
						length: 5, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: '#ffb32e'
						}
					},
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					},
					title: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 12,
							color: '#ffb32e'
						},
						offsetCenter: [0, '-10%']
					},
					detail: {
						show: false
					},
					data: [{
						value: 256,
						name: '违规次数'
					}]
				},
				{
					name: '',
					type: 'gauge',
					z: 5,
					center: ['79%', '50%'], // 默认全局居中
					splitNumber: 10,
					radius: '60%',
					axisLine: {
						lineStyle: {
							width: 5,
							color: [[0.2, '#ffb32e'], [0.8, '#ffb32e'], [1, '#ffb32e']]
						}
					},
					axisTick: { // 坐标轴小标记
						show: false
					},
					splitLine: { // 分隔线
						show: false
					},
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					},
					title: {
						show: false
					},
					detail: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 14,
							color: '#f29503',
							fontWeight: 600
						}
					},
					data: [{
						value: 256,
						name: '违规次数'
					}]
				},
				{
					name: '',
					type: 'gauge',
					z: 6,
					min: 0,
					center: ['21%', '50%'], // 默认全局居中
					max: 100,
					splitNumber: 10,
					radius: '100%',
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							width: 0,
							opacity: 0
						}
					},
					axisTick: { // 坐标轴小标记
						length: 3, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: '#f6c16b'
						}
					},
					splitLine: { // 分隔线
						length: 5, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							color: '#ffb32e'
						}
					},
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					},
					title: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 12,
							color: '#ffb32e'
						},
						offsetCenter: [0, '-10%']
					},
					detail: {
						show: false
					},
					data: [{
						value: 256,
						name: '违规车辆'
					}]
				},
				{
					name: '',
					type: 'gauge',
					z: 7,
					center: ['21%', '50%'], // 默认全局居中
					splitNumber: 10,
					radius: '60%',
					axisLine: {
						lineStyle: {
							width: 5,
							color: [[0.2, '#ffb32e'], [0.8, '#ffb32e'], [1, '#ffb32e']]
						}
					},
					axisTick: { // 坐标轴小标记
						show: false
					},
					splitLine: { // 分隔线
						show: false
					},
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					},
					title: {
						show: false
					},
					detail: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontSize: 14,
							color: '#f29503',
							fontWeight: 600
						}
					},
					data: [{
						value: 5
					}]
				}
			]
		};
		gaugeECharts.setOption(gaugeECharts_option);