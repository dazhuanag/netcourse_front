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
    mounted() {
        // this.myChart = echarts.init(document.getElementById('line1'));
        this.initData();
    },
    props: ['data', 'name'],
    methods: {
        initData() {
            const colors = ['#5793f3', '#675bba', '#d14a61'];
            const option = {
                legend: {
                    show: true,
                    orient: 'vertical',
                    x: 'left',
                },
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    // 设置饼图标题，位置设为顶部居中
                    text: "学习时长图(时长单位：min)",
                    top: '0%',
                    left: "center"
                },
                series: [
                    {
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
                        },
                        labelLine: {
                            show: true
                        },
                        name: this.name,
                        type: 'pie',
                        radius: '50%',
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        data: this.data,
                    }
                ]
            };
            // var option = {
            //     legend: {
            //         orient: 'vertical',
            //         x: 'left',
            //         // data: ['A', 'B', 'C', 'D', 'E']
            //     },
            //     title: {
            //         // 设置饼图标题，位置设为顶部居中
            //         text: "学习时长图(时长单位：min)",
            //         top: '0%',
            //         left: "center"
            //     },
            //     series: [
            //         {
            //             type: 'pie',
            //             radius: ['50%', '70%'],
            //             avoidLabelOverlap: false,
            //             label: {
            //                 show: true,
            //                 position: 'inside',
            //                 formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            //             },
            //             labelLine: {
            //                 show: true
            //             },
            //             emphasis: {
            //                 label: {
            //                     show: true,
            //                     fontSize: '30',
            //                     fontWeight: 'bold'
            //                 }
            //             },
            //             data: this.data
            //         }
            //     ]
            // };

            this.myChart = echarts.init(document.getElementById('line1'))
            this.myChart.setOption(option);
        }
    },
    watch: {
        data: function () {
            this.initData()
        },
        name: function () {
            this.initData()
        }
    }
}
</script>

<style lang="less">
@import '../style/mixin';

.line1 {
    display: flex;
    justify-content: center;
}
</style>
