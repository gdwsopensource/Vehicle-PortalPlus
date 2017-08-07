$(function(){
	var myChart = echarts.init($("#geographical-distribution")[0]);
	option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['广州','佛山','东莞','清远']
    },
    series: [
        {
            name:'地区分布',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data:[
                {value:335, name:'广州'},
                {value:310, name:'佛山'},
                {value:234, name:'东莞'},
                {value:135, name:'清远'},
                {value:1548, name:'福州'}
            ]
        },{
            name:'地区分布',
            type:'pie',
            radius: ['0%', '45%'],
            avoidLabelOverlap: false,
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
                {value:1014, name:'省内'},
                {value:1548, name:'省外'}
            ]
        }
    ]
};
myChart.setOption(option);
})
