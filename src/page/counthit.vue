<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp</p>

        <el-form :inline="true" style="margin-left: 15px">
            <el-form-item label="分类">
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                        v-for="item in dirOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="clearQuery">重置</el-button>
                <el-button type="primary" @click="getTableData">查询</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="24">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>课程点击量</span>
                    </div>
                    <tendency :xData='xData' :yData='yData' :y1-data="y1Data"></tendency>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import tendency from '../components/tendency'
import { counthit} from "@/api/getData";
import { getStore } from "@/config/mUtils";

export default {
    data() {
        return {
            dirOptions:[{
                value: '',
                label: '全部'
            },{
                value: '1',
                label: 'Java'
            },{
                value: '2',
                label: '前端'
            },{
                value: '3',
                label: '数据分析'
            }],
            uid: "",
            xData: [],
            yData: [],
            y1Data: [],
            type: ''
        };
    },
    components: {
        headTop,
        tendency
    },
    created() {},
    mounted() {
        this.uid = getStore("uid");
        this.getTableData();
    },
    methods: {
        async getTableData() {
            this.xData = [];
            this.yData = [];
            this.y1Data = [];
            const params = {
                courseType: this.type
            };
            const res1 = await counthit(params);
            this.xData = res1.data.x;
            this.yData = res1.data.y;
            this.y1Data = res1.data.z;
        },
        clearQuery(){
            this.type = ''
        },
    },
};
</script>

<style lang="less">
</style>
