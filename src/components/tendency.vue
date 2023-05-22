<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line1'));
            this.initData();
        },
        props: ['xData', 'yData' ,'y1Data'],
        methods: {
            initData(){
                // const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color : ['#5793f3','#24c4c4'],
                    xAxis: {
                        name: '课程',// 给X轴加单位
                        type: 'category',
                        data: this.xData
                    },
                    yAxis: {
                        name: '点击量',// 给Y轴加单位
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.yData,
                            type: 'bar',
                            stack: 'x',
                            barGap:'50%',//柱图间距
                            // color: '#1d4312',
                            //显示数值
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'left', //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: 'black',
                                            fontSize: 12,
                                        },
                                    },
                                },
                            },
                        }
                        ,{
                            data: this.y1Data,
                            type: 'bar',
                            stack: 'x',
                            barGap:'50%',//柱图间距
                            // color: '#43122e',
                            //显示数值
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'left', //在上方显示
                                        textStyle: {
                                            //数值样式
                                            color: 'black',
                                            fontSize: 12,
                                        },
                                    },
                                },
                            },
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            xData: function (){
                this.initData()
            },
            yData: function (){
                this.initData()
            },
            y1Data: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
