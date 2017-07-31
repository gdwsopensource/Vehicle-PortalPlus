(function($) {
	// 第一次初始
	resizeInit();

	// 数据
	var pieData = [ {
		value : 335,
		name : '琶洲卡口001'
	}, {
		value : 310,
		name : '越秀公园卡口001'
	}, {
		value : 234,
		name : '增城卡口001'
	}, {
		value : 135,
		name : '白云卡口001'
	}, {
		value : 1548,
		name : '其它'
	} ];
	var lineSeries = [ {
		name : 'O',
		type : 'line',
		data : [ 20, 50, 50, 40, 30, 40, 20 ],
		markPoint : {
			data : [ {
				type : 'max',
				name : '最大值'
			} ]
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	}, {
		name : 'D',
		type : 'line',
		data : [ 15, 66, 25, 55, 35, 24, 60 ],
		markPoint : {
			data : [ {
				type : 'max',
				name : '最大值'
			} ]
		},
		markLine : {
			data : [ {
				type : 'average',
				name : '平均值'
			} ]
		}
	} ];
	var barData = [ 1000, 520, 200, 134, 50 ];
	var pieDoughnutData = [ {
		value : 335,
		name : '天河区'
	}, {
		value : 310,
		name : '海珠区'
	}, {
		value : 234,
		name : '白云区'
	}, {
		value : 135,
		name : '荔湾区'
	}, {
		value : 1548,
		name : '越秀区'
	} ];
	var areaMapData = [ {
		"count" : 12050,
		"crossMonth" : "2016/01",
		"originCrossName" : "天河区",
		"origin_lng" : "113.370",
		"origin_lat" : "23.131",
		"destCrossName" : "白云区",
		"dest_lng" : "113.278",
		"dest_lat" : "23.165"
	}, {
		"count" : 12050,
		"crossMonth" : "2016/01",
		"originCrossName" : "天河区",
		"origin_lng" : "113.370",
		"origin_lat" : "23.131",
		"destCrossName" : "越秀区",
		"dest_lng" : "113.273",
		"dest_lat" : "23.134"
	} ];
	var pieNestSeries = [ {
		type : 'pie',
		selectedMode : 'single',
		radius : [ 0, '30%' ],
		label : {
			normal : {
				position : 'inner'
			}
		},
		labelLine : {
			normal : {
				show : false
			}
		},
		data : [ {
			value : 10000,
			name : '广州市'
		}, {
			value : 1000,
			name : '广东省其他市'
		}, {
			value : 1000,
			name : '其他省'
		} ]
	}, {
		name : '',
		type : 'pie',
		radius : [ '40%', '55%' ],

		data : [ {
			value : 10000,
			name : '广州市'
		}, {
			value : 500,
			name : '深圳市'
		}, {
			value : 200,
			name : '佛山市'
		}, {
			value : 300,
			name : '其他市'
		}, {
			value : 500,
			name : '香港自治区'
		}, {
			value : 200,
			name : '广西省'
		}, {
			value : 300,
			name : '其他省'
		} ]
	} ];
	var mapData = [ {
		"count" : 12050,
		"origin_lat" : "23.159597614567",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.32599262099",
		"crossMonth" : "2016/01",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 8050,
		"origin_lat" : "23.159597614567",
		"dest_lat" : "23.159597614567",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "禺东西路省军区路段",
		"origin_lng" : "113.32599262099",
		"crossMonth" : "2016/02",
		"dest_lng" : "113.32599262099"
	}, {
		"count" : 7850,
		"origin_lat" : "23.143146894933",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "广州大道中天河北路路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.32177960171",
		"crossMonth" : "2016/03",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 7050,
		"origin_lat" : "23.156474829269",
		"dest_lat" : "23.147301775747",
		"originCrossName" : "广园快速369号路段",
		"destCrossName" : "天河北路388号路段",
		"origin_lng" : "113.33545410964",
		"crossMonth" : "2016/04",
		"dest_lng" : "113.33674730643"
	}, {
		"count" : 6650,
		"origin_lat" : "23.150707056714",
		"dest_lat" : "23.147295333327",
		"originCrossName" : "广园快速农科院路段",
		"destCrossName" : "天河北路388号路段",
		"origin_lng" : "113.3621068926",
		"crossMonth" : "2016/05",
		"dest_lng" : "113.33673942181"
	}, {
		"count" : 5550,
		"origin_lat" : "23.156474805414",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "广园快速369号路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.33545655592",
		"crossMonth" : "2016/06",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 4050,
		"origin_lat" : "23.159594574813",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.32599615585",
		"crossMonth" : "2016/07",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 2050,
		"origin_lat" : "23.147295333327",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "天河北路388号路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.33673942181",
		"crossMonth" : "2016/08",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 1050,
		"origin_lat" : "23.159597614567",
		"dest_lat" : "23.159597614567",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "禺东西路省军区路段",
		"origin_lng" : "113.32599262099",
		"crossMonth" : "2016/09",
		"dest_lng" : "113.32599262099"
	}, {
		"count" : 850,
		"origin_lat" : "23.156474829269",
		"dest_lat" : "23.156474805414",
		"originCrossName" : "广园快速369号路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.33545410964",
		"crossMonth" : "2016/10",
		"dest_lng" : "113.33545655592"
	}, {
		"count" : 50,
		"origin_lat" : "23.156474805414",
		"dest_lat" : "23.150707056714",
		"originCrossName" : "广园快速369号路段",
		"destCrossName" : "广园快速农科院路段",
		"origin_lng" : "113.33545655592",
		"crossMonth" : "2016/11",
		"dest_lng" : "113.3621068926"
	}, {
		"count" : 750,
		"origin_lat" : "23.159594574813",
		"dest_lat" : "23.150707056714",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "广园快速农科院路段",
		"origin_lng" : "113.32599615585",
		"crossMonth" : "2016/12",
		"dest_lng" : "113.3621068926"
	}, {
		"count" : 650,
		"origin_lat" : "23.147295333327",
		"dest_lat" : "23.156474829269",
		"originCrossName" : "天河北路388号路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.33673942181",
		"crossMonth" : "2017/01",
		"dest_lng" : "113.33545410964"
	}, {
		"count" : 550,
		"origin_lat" : "23.159597614567",
		"dest_lat" : "23.147295333327",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "天河北路388号路段",
		"origin_lng" : "113.32599262099",
		"crossMonth" : "2017/02",
		"dest_lng" : "113.33673942181"
	}, {
		"count" : 450,
		"origin_lat" : "23.159594574813",
		"dest_lat" : "23.150707056714",
		"originCrossName" : "禺东西路省军区路段",
		"destCrossName" : "广园快速农科院路段",
		"origin_lng" : "113.32599615585",
		"crossMonth" : "2017/03",
		"dest_lng" : "113.3621068926"
	}, {
		"count" : 350,
		"origin_lat" : "23.150704266303",
		"dest_lat" : "23.156474805414",
		"originCrossName" : "广园快速农科院路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.36210093854",
		"crossMonth" : "2017/04",
		"dest_lng" : "113.33545655592"
	}, {
		"count" : 250,
		"origin_lat" : "23.150707056714",
		"dest_lat" : "23.156474805414",
		"originCrossName" : "广园快速农科院路段",
		"destCrossName" : "广园快速369号路段",
		"origin_lng" : "113.3621068926",
		"crossMonth" : "2017/05",
		"dest_lng" : "113.33545655592"
	}, {
		"count" : 250,
		"origin_lat" : "23.156474829269",
		"dest_lat" : "23.133498664979",
		"originCrossName" : "广园快速369号路段",
		"destCrossName" : "科韵路中山立交路段",
		"origin_lng" : "113.33545410964",
		"crossMonth" : "2017/06",
		"dest_lng" : "113.38182755552"
	} ];

	// 执行函数
	totalPieDoughnut("draw-chart1", "区域图起始", pieDoughnutData);
	totalLine("draw-chart2", "时段", lineSeries);
	totalBar("draw-chart3", "卡口", barData);
	totalPieNest("draw-chart4", "归属地", pieNestSeries);
	totalLine("behaviour-analysis-line", "通过卡口变化", lineSeries);
	totalPie("behaviour-analysis-pie", "通过卡口百分比", pieData);
	totalBar("behaviour-analysis-bar", "通过卡口总数", barData);
	totalMap("draw-chart0", "汽车OD流向流量图", dataToSreies(mapData));

	// 绑定事件
	$(window).on("resize", function() {
		resizeInit();
	});
	// 类型列表点击事件
	$("#type-choose>.tab-pane>.control-sidebar-menu>li")
			.on(
					'click',
					function() {
						var choose = $(this).find(".control-sidebar-heading")
								.html();
						var type = $(this).parent().parent().find(
								".control-sidebar-heading").html();
						$("#total-left")
								.html(
										'<div class="nav-tabs-custom">'
												+ '<ul class="nav nav-tabs">'
												+ '<li class="active"><a href="#tabs-to" data-toggle="tab" aria-expanded="true">周</a>'
												+ '</li>'
												+ '<li class=""><a href="#tabs-to" data-toggle="tab" aria-expanded="false">月</a></li>'
												+ '<li class=""><a href="#tabs-to" data-toggle="tab" aria-expanded="false">年</a></li>'
												+ '</ul>'
												+ '<div class="tab-content" id="tabs-to total-left">'
												+ '<div class="tab-pane active" id="draw-chart0">'
												+ '</div>' + '</div>'
												+ '</div>');
						$("#draw-chart0").css("height",
								parseInt($("#draw-chart0").width()) - 34);
						if (type == "概览") {
							totalMap("draw-chart0", choose,
									dataToSreies(mapData));
							$("#simple-right")
									.html(
											'<div class="row">'
													+ '<div class="col-sm-6 col-xs-6">'
													+ '<div class="box box-primary zw-bg-white" >'
													+ '<div class="nav-tabs-custom">'
													+ '<ul class="nav nav-tabs">'
													+ '<li class="active" id="draw-chart1-o"><a href="#draw-chart1"'
													+ 'data-toggle="tab" aria-expanded="true">起始</a></li>'
													+ '<li class="" id="draw-chart1-d"><a href="#draw-chart1" data-toggle="tab"'
													+ 'aria-expanded="false">终到</a></li>'
													+ '</ul>'
													+ '<div class="tab-content">'
													+ '<div class="tab-pane active" id="draw-chart1"></div>'
													+ '</div>'
													+ '</div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="col-sm-6 col-xs-6">'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart2"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="row">'
													+ '<div class="col-sm-6 col-xs-6">'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart3"></div>'
													+ '</div>'
													+ '<div class="col-sm-6 col-xs-6">'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart4"></div>'
													+ '</div>' + '</div>');
							var simpleLeftH = parseInt($("#draw-chart2")
									.width());
							$("#simple-right>.row>div>div").css("height",
									simpleLeftH);
							$("#draw-chart1").css("height",
									parseInt($("#draw-chart1").width()) - 48);
							totalPieDoughnut("draw-chart1", "区域图起始",
									pieDoughnutData);
							totalLine("draw-chart2", "时段", lineSeries);
							totalBar("draw-chart3", "卡口", barData);
							totalPieNest("draw-chart4", "归属地", pieNestSeries);
							$("#draw-chart1-o").on('click', function() {
								totalPieDoughnut("draw-chart1", "区域图起始", pieDoughnutData);
							});
							$("#draw-chart1-d").on('click', function() {
								totalPieDoughnut("draw-chart1", "区域图终到", pieDoughnutData);
							});
						} else if (type == "区域") {
							drawArea("draw-chart0", choose + "流向图",
									dataToSreies(areaMapData));
							$("#simple-right")
									.html(
											'<div class="box box-primary zw-bg-white" id="draw-chart5">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart5-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart6">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart6-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart7">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart7-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-d"></div>'
													+ '</div>' + '</div>');
							var simpleLeftH = parseInt((parseInt($(
									"#draw-chart0").width()) - 34) / 3 + 5);
							$("#simple-right>div>.row>div").css("height",
									simpleLeftH);
							$("#draw-chart5-msg")
									.html(
											'<p class="text-center">时段高峰</p><p class="text-center">起始：06:00-09:00</p><p class="text-center">终到：09:00-12:00</p>');
							totalLine("draw-chart5-o", "起始", lineSeries);
							totalLine("draw-chart5-d", "终到", lineSeries);
							$("#draw-chart6-msg")
									.html(
											'<p class="text-center">卡口高峰</p><p class="text-center">起始：琶洲卡口</p><p class="text-center">终到：新港东卡口</p>');
							totalBar("draw-chart6-o", "起始", barData);
							totalBar("draw-chart6-d", "终到", barData);
							$("#draw-chart7-msg")
									.html(
											'<p class="text-center">归属高峰</p><p class="text-center">起始：广州市</p><p class="text-center">终到：广州市</p>');
							totalPieNest("draw-chart7-o", "起始", pieNestSeries);
							totalPieNest("draw-chart7-d", "终到", pieNestSeries);
						} else if (type == "时段") {
							totalLine("draw-chart0", choose, lineSeries);
							$("#simple-right")
									.html(
											'<div class="box box-primary zw-bg-white" id="draw-chart5">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart5-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart6">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart6-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart7">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart7-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-d"></div>'
													+ '</div>' + '</div>');
							var simpleLeftH = parseInt((parseInt($(
									"#draw-chart0").width()) - 34) / 3 + 5);
							$("#simple-right>div>.row>div").css("height",
									simpleLeftH);
							$("#draw-chart5-msg")
									.html(
											'<p class="text-center">区域高峰</p><p class="text-center">起始：天河区</p><p class="text-center">终到：天河区</p>');
							totalPieDoughnut("draw-chart5-o", "起始",
									pieDoughnutData);
							totalPieDoughnut("draw-chart5-d", "终到",
									pieDoughnutData);
							$("#draw-chart6-msg")
									.html(
											'<p class="text-center">卡口高峰</p><p class="text-center">起始：琶洲卡口</p><p class="text-center">终到：新港东卡口</p>');
							totalBar("draw-chart6-o", "起始", barData);
							totalBar("draw-chart6-d", "终到", barData);
							$("#draw-chart7-msg")
									.html(
											'<p class="text-center">归属高峰</p><p class="text-center">起始：广州市</p><p class="text-center">终到：广州市</p>');
							totalPieNest("draw-chart7-o", "起始", pieNestSeries);
							totalPieNest("draw-chart7-d", "终到", pieNestSeries);
						} else if (type == "卡口") {
							totalBar("draw-chart0", choose, barData);
							$("#simple-right")
									.html(
											'<div class="box box-primary zw-bg-white" id="draw-chart5">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart5-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart6">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart6-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart7">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart7-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-d"></div>'
													+ '</div>' + '</div>');
							var simpleLeftH = parseInt((parseInt($(
									"#draw-chart0").width()) - 34) / 3 + 5);
							$("#simple-right>div>.row>div").css("height",
									simpleLeftH);
							$("#draw-chart5-msg")
									.html(
											'<p class="text-center">区域高峰</p><p class="text-center">起始：天河区</p><p class="text-center">终到：天河区</p>');
							totalPieDoughnut("draw-chart5-o", "起始",
									pieDoughnutData);
							totalPieDoughnut("draw-chart5-d", "终到",
									pieDoughnutData);
							$("#draw-chart6-msg")
									.html(
											'<p class="text-center">时段高峰</p><p class="text-center">起始：06:00-09:00</p><p class="text-center">终到：09:00-12:00</p>');
							totalLine("draw-chart6-o", "起始", lineSeries);
							totalLine("draw-chart6-d", "终到", lineSeries);
							$("#draw-chart7-msg")
									.html(
											'<p class="text-center">归属高峰</p><p class="text-center">起始：广州市</p><p class="text-center">终到：广州市</p>');
							totalPieNest("draw-chart7-o", "起始", pieNestSeries);
							totalPieNest("draw-chart7-d", "终到", pieNestSeries);
						} else if (type == "归属") {
							totalPieDoughnut("draw-chart0", choose,
									pieDoughnutData);
							$("#simple-right")
									.html(
											'<div class="box box-primary zw-bg-white" id="draw-chart5">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart5-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart5-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart6">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart6-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart6-d"></div>'
													+ '</div>'
													+ '</div>'
													+ '<div class="box box-primary zw-bg-white" id="draw-chart7">'
													+ '<div class="row">'
													+ '<div class="col-xs-4" id="draw-chart7-msg"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-o"></div>'
													+ '<div class="col-xs-4" id="draw-chart7-d"></div>'
													+ '</div>' + '</div>');
							var simpleLeftH = parseInt((parseInt($(
									"#draw-chart0").width()) - 34) / 3 + 5);
							$("#simple-right>div>.row>div").css("height",
									simpleLeftH);
							$("#draw-chart5-msg")
									.html(
											'<p class="text-center">区域高峰</p><p class="text-center">起始：天河区</p><p class="text-center">终到：天河区</p>');
							totalPieDoughnut("draw-chart5-o", "起始",
									pieDoughnutData);
							totalPieDoughnut("draw-chart5-d", "终到",
									pieDoughnutData);
							$("#draw-chart6-msg")
									.html(
											'<p class="text-center">时段高峰</p><p class="text-center">起始：06:00-09:00</p><p class="text-center">终到：09:00-12:00</p>');
							totalLine("draw-chart6-o", "起始", lineSeries);
							totalLine("draw-chart6-d", "终到", lineSeries);
							$("#draw-chart7-msg")
									.html(
											'<p class="text-center">卡口高峰</p><p class="text-center">起始：琶洲卡口</p><p class="text-center">终到：新港东卡口</p>');
							totalBar("draw-chart7-o", "起始", barData);
							totalBar("draw-chart7-d", "终到", barData);
						}

					});
	// tab切换事件
	$("#draw-chart1-o").on('click', function() {
		totalPieDoughnut("draw-chart1", "区域图起始", pieDoughnutData);
	});
	$("#draw-chart1-d").on('click', function() {
		totalPieDoughnut("draw-chart1", "区域图终到", pieDoughnutData);
	});

	// 自定义函数
	function resizeInit() {
		$("#draw-chart0").css("height",
				parseInt($("#draw-chart0").width()) - 34);
		$("#draw-chart1").css("height",
				parseInt($("#draw-chart1").width()) - 48);
		$("#draw-chart2").css("height", $("#draw-chart2").width());
		$("#draw-chart3").css("height", $("#draw-chart3").width());
		$("#draw-chart4").css("height", $("#draw-chart4").width());
		$("#behaviour-analysis-line").css("height",
				parseInt($("#behaviour-analysis-line").width()) / 2);
		$("#behaviour-analysis-pie").css("height",
				$("#behaviour-analysis-pie").width());
		$("#behaviour-analysis-bar").css("height",
				$("#behaviour-analysis-bar").width());
	}
	function simplePie(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title,
				textStyle : {
					color : '#000000',
					fontSize : '14',
					fontWeight : 'normal'
				},
				x : 'left'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}<br/>{d}% ({c})"
			},
			series : [ {
				type : 'pie',
				radius : '70%',
				center : [ '50%', '50%' ],
				data : data,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						show : false
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				}
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'pie') {
				console.log(params.name);

			}
		});

		$(window).on("resize", function() {
			chart.resize();
		});
	}

	function totalMap(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			bmap : {
				center : [ 113.32599615585, 23.156474829269 ], // 后台返回后动态设置成第一个出现的地方或最高频率的地方
				zoom : 16,
				// roam: 'move'
				roam : true
			},
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				show : false,
				trigger : 'item',
				formatter : function(params) {
					return params.data.originCrossName + "->"
							+ params.data.destCrossName
				},
				position : function(params) {
					// ！待修复bug：位置跟随鼠标
					return;
				}

			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}

	function dataToLines(data) {
		// 线太多乱，只显示最近的条
		if (data.length < 5) {
			var showLineCount = data.length;
		} else {
			var showLineCount = 5;
		}
		var coordsArr = [];
		var len = data.length;
		for (var i = 0; i < showLineCount; i++) {
			var dataItem = data[len - i - 1];
			coordsArr[i] = {};
			coordsArr[i].coords = [
					[ dataItem.origin_lng, dataItem.origin_lat ],
					[ dataItem.dest_lng, dataItem.dest_lat ] ];
			coordsArr[i].originCrossName = dataItem.originCrossName;
			coordsArr[i].destCrossName = dataItem.destCrossName;
			coordsArr[i].crossMonth = dataItem.crossMonth;
			coordsArr[i].count = dataItem.count;
		}
		return coordsArr;
	}
	function dataToSreies(data) {
		var len = data.length;
		if (len > 10) {
			len = 10;
		}
		var resultArr = [];
		for (var i = 0; i < len; i++) {
			var level = Math.floor(parseInt(data[i].count) / 1000);
			level < 1 ? level = 1 : level = level;
			level > 10 ? level = 10 : level = level;
			resultArr[i] = {
				type : 'lines',
				z : 2,
				/*
				 * label: { normal: { show: true, position: 'middle', formatter:
				 * function (params) { return params.data.originCrossName + "->" +
				 * params.data.destCrossName }, textStyle: { color: 'purple',
				 * fontSize: 12 } } },
				 */
				symbol : [ 'none', 'arrow' ],
				symbolSize : 10,
				effect : {
					show : true,
					constantSpeed : 50,
					trailLength : 0,
					symbol : 'image://image/car_purple.png',
					symbolSize : 20 + 2 * level,
					loop : true
				},
				coordinateSystem : 'bmap',
				data : [ {
					coords : [ [ data[i].origin_lng, data[i].origin_lat ],
							[ data[i].dest_lng, data[i].dest_lat ] ],
					originCrossName : data[i].originCrossName,
					destCrossName : data[i].destCrossName,
					count : data[i].count
				} ],
				polyline : false,
				lineStyle : {
					normal : {
						color : 'purple',
						opacity : 0.5,
						width : level,
						type : 'solid',
						curveness : 0.3
					}
				}
			};
		}
		return resultArr;
	}

	// 例子简图
	function totalPieDoughnut(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}: {c} ({d}%)"
			},
			// legend: {
			// orient: 'vertical',
			// x: 'left',
			// data:['天河区','海珠区','白云区','荔湾区','越秀区']
			// },
			series : [ {
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
				data : data
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalLine(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
			},
			yAxis : {
				type : 'value',
				axisLabel : {
					formatter : '{value}'
				}
			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalBar(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			color : [ '#3398DB' ],
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
				data : [ '卡口1', '卡口2', '卡口3', '卡口4', '卡口5' ],
				axisTick : {
					alignWithLabel : true
				}
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				type : 'bar',
				barWidth : '60%',
				data : data
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	function totalPie(id, title, data) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b} : {c} ({d}%)"
			},
			legend : {
				orient : 'vertical',
				left : 'left',
				data : [ '区域1', '区域2', '区域3', '区域4', '区域5' ]
			},
			series : [ {
				type : 'pie',
				radius : '55%',
				center : [ '50%', '60%' ],
				data : data,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();

		});
	}
	function totalPieNest(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				trigger : 'item',
				formatter : "{b}<br />{c} ({d}%)"
			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);
			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}
	;
	function drawArea(id, title, series) {
		var obj = document.getElementById(id);
		var chart = echarts.init(obj);
		var option = null;
		option = {
			bmap : {
				center : [ 113.370, 23.131 ], // 后台返回后动态设置成第一个出现的地方或最高频率的地方
				zoom : 13,
				// roam: 'move'
				roam : 'move'
			},
			title : {
				text : title || "",
				x : 'center'
			},
			tooltip : {
				show : false,
				trigger : 'item',
				formatter : function(params) {
					return params.data.originCrossName + "->"
							+ params.data.destCrossName
				},
				position : function(params) {
					// ！待修复bug：位置跟随鼠标
					return;
				}

			},
			series : series
		};
		chart.setOption(option);
		chart.on("click", function(params) {
			if (params.seriesType == 'lines') {
				console.log(params);

			}
		});
		$(window).on("resize", function() {
			chart.resize();
		});
	}

	/*
	 * echarts templete var obj = document.getElementById(id); var chart =
	 * echarts.init(obj); var option = null; option={ };
	 * chart.setOption(option); chart.on("click", function (params) { if
	 * (params.seriesType == 'lines') { console.log(params); } });
	 * $(window).on("resize", function () { chart.resize(); });
	 */
})(jQuery);