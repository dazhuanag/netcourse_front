<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
        <div class="table_container">
            <el-form :inline="true" :model="queryData" style="margin-left: 15px">
                <el-form-item label="课程名称">
                    <el-input v-model="queryData.courseName" placeholder="课程名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="clearQuery">重置</el-button>
                    <el-button type="primary" @click="getTableData">查询</el-button>
                </el-form-item>
            </el-form>

            <el-row >
                <el-col :span="5" v-for="(o, index) in tableData" :key="o.courseId" style="margin-left: 3.7%;margin-top: 10px;">
                    <el-card :body-style="{padding: '0px' }" >
                        <el-image
                            style="width: 100%; height: 220px"
                            :src="o.coursePic"
                            fit="contain"></el-image>
                        <!--                        <img :src="o.coursePic" class="image">-->
                        <div style="padding: 14px;">
                            <span>{{o.courseName}}</span>
                            <div class="bottom clearfix">
                                <span class="time">{{o.uploadUsername}}</span>
                                <span class="time"> · </span>
                                <span class="time">{{o.courseTypeDesc}}</span>
                                <el-button type="text" class="button" @click="jumpToPlayer(o.courseId, o.courseVideo)">观看课程</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { courseList } from '@/api/getData'
import {getStore,setStore} from '@/config/mUtils'

export default {
    data(){
        return {
            // 每行的数量
            lineNumPer: 3,
            lineNum: 0,
            tableData: [],
            currentRow: null,
            count: 0,
            pageSize: 10,
            currentPage: 1,
            uid: '',
            updateMid: '',
            updateContent: '',
            dialogVisible: false,
            queryData: {
                courseName: ''
            }
        }
    },
    components: {
        headTop,
    },
    created(){
    },
    mounted() {
        this.uid = getStore('uid');
        this.getTableData();
    },
    methods: {
        jumpToPlayer(id,url){
            // 课程id,课程链接
            setStore("courseId", id)
            setStore("courseVideo", url)
            setStore("timestamp", new Date().getTime())
            this.$router.push('teaplay')
        },
        handleSizeChange(val){},
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        async getTableData() {
            const params = {
                size: this.pageSize,
                page: this.currentPage,
                courseName: this.queryData.courseName
            }
            const res = await courseList(params);
            this.tableData = res.data.list;
            this.count = res.data.total;
            this.lineNum = res.data.total / this.lineNumPer;
        },
        clearQuery() {
            this.queryData.courseName = '';
        }
    }

}
</script>

<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
