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
            /*
			 * pieces: [ {min: 15}, // 不指定 max，表示 max 为无限大（Infinity）。 {min: 12,
			 * max: 15}, {min: 9, max: 12}, {min: 6, max: 9}, {min: 3, max: 6},
			 * {max: 3} // 不指定 min，表示 min 为无限大（-Infinity）。 ],
			 */
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
        // 获取echart中使用的bmap实例
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
    
})(jQuery);