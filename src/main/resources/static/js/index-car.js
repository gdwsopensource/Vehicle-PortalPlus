(function($){
	// 百度地图API功能
    var map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

    var p1 = new BMap.Point(116.301934,39.977552);
    var p2 = new BMap.Point(116.508328,39.919141);

    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(p1, p2);
    var myIcon = new BMap.Icon("image/mapcar-icon.png", new BMap.Size(26, 70), {    //小车图片
        //offset: new BMap.Size(0, -2),    //相当于CSS精灵
        imageOffset: new BMap.Size(0, -0)    //图片的偏移量。为了是图片底部中心对准坐标点。
    });
    window.run = function (){
        var driving = new BMap.DrivingRoute(map);    //驾车实例
        driving.search(p1, p2);
        driving.setSearchCompleteCallback(function(){
            var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
            var paths = pts.length;    //获得有几个点

            var carMk = new BMap.Marker(pts[0],{icon:myIcon});
            map.addOverlay(carMk);
            i=0;
            function resetMkPoint(i){
                carMk.setPosition(pts[i]);
                if(i < paths){
                    setTimeout(function(){
                        i++;
                        resetMkPoint(i);
                    },100);
                }
            }
            setTimeout(function(){
                resetMkPoint(5);
            },100)

        });
    }
    setTimeout(function(){
        run();
    },1500);


    $('#search_result').slimScroll({
        height: '269px',
        size: '5px',
        color: '#d2d6de'
    });
    $('#calendar').fullCalendar({
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        buttonIcons: false,
        locale: 'zh-cn',
        dayClick: function (date, jsEvent, view) {
            console.log(date.format());
        },
        height: 'auto'
    });

    function renderItem(params, api) {
        var values = [api.value(0), api.value(1)];
        var coord = api.coord(values);
        var size = api.size([1, 1], values);
        return {
            type: 'sector',
            shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r0: coord[2] - size[0] / 2,
                r: coord[2] + size[0] / 2,
                startAngle: coord[3] - size[1] / 2,
                endAngle: coord[3] + size[1] / 2
            },
            style: api.style({
                fill: api.visual('color')
            })
        };
    }

    var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
    var days = ['周一', '周二', '周三',
        '周四', '周五', '周六', '周日'];

    var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
    var maxValue = echarts.util.reduce(data, function (max, item) {
        return Math.max(max, item[2]);
    }, -Infinity);

    // 基于准备好的dom，初始化echarts实例
    var custom_polar_heatmap_Echarts = echarts.init(document.getElementById('custom_polar_heatmap'));
    var custom_polar_heatmap_option = {
        legend: {
            data: ['Punch Card'],
            show: false
        },
        polar: {},
        tooltip: {},
        visualMap: {
            type: 'continuous',
            min: 0,
            max: maxValue,
            top: 'middle',
            dimension: 2,
            calculable: true
        },
        angleAxis: {
            type: 'category',
            data: hours,
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false
            }
        },
        radiusAxis: {
            type: 'category',
            data: days,
            z: 100
        },
        series: [{
            name: 'Punch Card',
            type: 'custom',
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: '#d14a61'
                }
            },
            renderItem: renderItem,
            data: data
        }]
    };
    custom_polar_heatmap_Echarts.setOption(custom_polar_heatmap_option);
})(jQuery);
