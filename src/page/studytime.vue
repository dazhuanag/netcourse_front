<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
        <el-form :inline="true"  style="margin-left: 15px">
            <el-form-item label="学生姓名">
                <el-input v-model="studentId" placeholder="学生姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="clearQuery">重置</el-button>
                <el-button type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card class="box-card">
<!--                    <div slot="header" class="clearfix">-->
<!--                        <span>学习时长图</span>-->
<!--                    </div>-->
                    <p v-if="showGraph">请输入学生姓名查看该学生的学习时长</p>
                </el-card>
                <el-card>
                        <div id="line1" class="chart-box" ></div>
<!--                    <tendency v-if="showGraph" :data='data' :name='name' ></tendency>-->
<!--                    <div id="line1" class="" style="width: 90%;height:450px;"></div>-->

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import tendency from '../components/pietendency'
import { studytime} from "@/api/getData";
import { getStore } from "@/config/mUtils";
import echarts from "echarts/lib/echarts";

export default {
    data() {
        return {
            uid: "",
            data: [],
            name: "学习时长图（时长单位：min）",
            studentId: "",
            showGraph: true,
            ChartPie: null,
        };
    },
    components: {
        headTop,
        tendency
    },
    created() {
        this.initData()
    },
    mounted() {
        // this.uid = getStore("uid");
        this.getTableData();
        this.initData();
    },
    methods: {
        clearQuery(){
            this.studentId  =null
        },
        async getTableData() {
            const params = {
                username: this.studentId
            };
            const res1 = await studytime(params);
            if (res1.code != 200){
                // this.showGraph = false;
                this.$message({
                    message: res1.message,
                    type: 'error'
                });
                return;
            }
            this.data = res1.data;
            // this.showGraph = true;
            this.initData()
        },
        initData() {
            const colors = ['#5793f3', '#675bba', '#d14a61'];
            const option = {
                legend: {
                    // show: true,
                    orient: 'vertical',
                    // x: 'left',
                    x:'left',
                },
                tooltip: {
                    trigger: 'item'
                },
                title: {
                    // 设置饼图标题，位置设为顶部居中
                    text: this.name,
                    top: '0%',
                    left: "right"
                },
                series: [
                    {
                        avoidLabelOverlap: true,
                        label: {
                            show: true,
                            position: 'outside',
                            formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
                        },
                        labelLine: {
                            show: true
                        },
                        // name: this.name,
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
            var legend = {
                data: this.data
            }
            option.legend = legend
            this.ChartPie = echarts.init(document.getElementById('line1'))
            this.ChartPie.setOption(option);
            window.addEventListener('resize', () => {
                this.ChartPie.resize()
            })
        },

    },
    activated() {
        // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
        if (this.ChartPie) {
            this.ChartPie.resize()
        }
    },
};
</script>

<style lang="less">
.chart-box {
    min-height: 400px;
}
</style>
