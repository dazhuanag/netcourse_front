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
        props: ['sevenDate', 'sevenDay', 'xline'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color: colors,
                    title: {
                        // text: '走势图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.sevenDay
                    },
                    toolbox: {
                        show: false,
                        // feature: {
                        //     dataZoom: {
                        //         yAxisIndex: 'none'
                        //     },
                        //     dataView: {readOnly: false},
                        //     magicType: {type: ['bar', 'line']},
                        //     restore: {},
                        // }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xline
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: 'Y',
                          min: 0,
                          max: 10,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: 'Y',
                        //   min: 0,
                        //   max: 10,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        // {
                        //     name:'X',
                        //     type:'line',
                        //     data:this.sevenDate,
                        //     barWidth: '25%',
                        //     // yAxisIndex: 1,
                        //     // markPoint: {
                        //     //     data: [
                        //     //         {type: 'max', name: '最大值'},
                        //     //         {type: 'min', name: '最小值'}
                        //     //     ]
                        //     // },
                        // },
                        // {
                        //     name:'新增订单',
                        //     type:'line',
                        //     data:this.sevenDate[1],
                        //     yAxisIndex: 1,
                        //     markPoint: {
                        //         data: [
                        //             {type: 'max', name: '最大值'},
                        //             {type: 'min', name: '最小值'}
                        //         ]
                        //     },
                        // },
                        // {
                        //     name:'新增管理员',
                        //     type:'line',
                        //     data:this.sevenDate[2],
                        //     yAxisIndex: 1,
                        //     markPoint: {
                        //         data: [
                        //             {type: 'max', name: '最大值'},
                        //             {type: 'min', name: '最小值'}
                        //         ]
                        //     },
                        // }
                    ]
              };
              for (let i = 0; i< this.sevenDay.length; i++){
                const seriesTemp = {
                            name: this.sevenDay[i],
                            type:'line',
                            data: this.sevenDate[i],
                            barWidth: '25%',
                            // yAxisIndex: 1,
                            // markPoint: {
                            //     data: [
                            //         {type: 'max', name: '最大值'},
                            //         {type: 'min', name: '最小值'}
                            //     ]
                            // },
                        };
                option.series.push(seriesTemp);
              }
              
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function (){
                this.initData()
            },
            sevenDay: function (){
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
