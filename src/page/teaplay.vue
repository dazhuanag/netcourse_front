<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
        <div class="video_title">

        </div>

        <div class="video_area" v-if="show">
            <vue-core-video-player :src="courseVideo" @play="playFunc" @pause="pauseFunc"></vue-core-video-player>
        </div>
<!--        <el-dialog title="播放视频" :visible.sync="playDialogVisible">-->
<!--            <vue-core-video-player :src="playUrl"></vue-core-video-player>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="cancelPlay">取 消</el-button>-->
<!--            </div>-->
<!--        </el-dialog>-->
        <p>&nbsp;</p><p>&nbsp;</p>
        <el-button type="primary" @click="addComment">新增评论</el-button>
        <p>&nbsp;</p>
        <div class="comment_area">
            <el-table
                :show-header="false"
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                            :show-header="false"
                            :data="props.row.childCommentList"
                            style="width: 100%;margin-left: 6%;">
                            <el-table-column
                                label="评论者"
                                prop="username">
                            </el-table-column>
                            <el-table-column
                                label="评论内容"
                                prop="content">
                            </el-table-column>
                            <el-table-column
                                label="时间"
                                prop="timeDesc">
                            </el-table-column>
                            <el-table-column label="操作" >
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="scope.row.uid == uid"
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    label="评论者"
                    prop="username">
                </el-table-column>
                <el-table-column
                    label="评论内容"
                    prop="content">
                </el-table-column>
                <el-table-column
                    label="时间"
                    prop="timeDesc">
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">回复</el-button>
                        <el-button
                            v-if="scope.row.uid == uid"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="回复" :visible.sync="dialogVisible">
            <el-form :model="selectTable">
                <el-form-item label="内容">
                    <el-input v-model="updateContent"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getStore} from '@/config/mUtils'
    import {addRecord, commentList, deleteComment,addComment} from "@/api/getData";

    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                count: 0,
                pageSize: 10,
                currentPage: 1,
                uid: '',
                courseId: '',
                courseVideo: '',
                time: 0,
                show: false,
                timestamp: '',
                timeStart: '',
                timeEnd:'',
                updateCourseId:'',
                updateContent:'',
                updateParentId:0,
                dialogVisible: false,
                selectTable: null,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        },
        mounted() {
          this.uid = getStore('uid');
          this.reloadPage();
        },
        methods: {
            handleSizeChange(val){},
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
            },
            async getTableData() {
                const params = {
                    size: this.pageSize,
                    page: this.currentPage,
                    courseId: this.courseId
                }
                const res = await commentList(params);
                console.log(res);
                this.tableData = res.data.list;
                this.count = res.data.total;
            },
          async reloadPage() {
              this.courseId = getStore("courseId");
              this.courseVideo = getStore('courseVideo');
              this.show = false;
              this.show = true;
              await this.getTableData();
              console.log('刷新')
          },
            playFunc(){
              console.log('播放')
                this.timeStart = new Date()
            },
            async pauseFunc() {
                console.log('暂停')
                this.timeEnd = new Date()
                let second = Math.round(parseInt(this.timeEnd - this.timeStart) / 1000)
                console.log("播放秒数")
                console.log(second)
                this.timeStart = '';
                this.timeEnd = '';
                // 上传播放记录
                const params = {
                    courseId: this.courseId,
                    uid: this.uid,
                    time: second
                }
                await addRecord(params);
            },
            async handleDelete(index, row) {
                // 删除
                const params = {commentId: row.commentId};
                await deleteComment(params);
                this.getTableData();
            },
            async update() {
                const params = {
                    courseId: this.updateCourseId,
                    uid: this.uid,
                    content: this.updateContent,
                    parentId: this.updateParentId,
                }
                await addComment(params);
                this.getTableData();
                this.dialogVisible = false;
            },
            handleEdit(index, row) {
                this.updateCourseId = row.courseId;
                this.updateParentId = row.commentId;
                this.dialogVisible = true;
            },
            addComment(){
                this.updateCourseId = this.courseId;
                this.updateParentId = 0;
                this.dialogVisible = true;
            },
        },
        watch: {//动态监听路由变化
            '$route' (to, from) {
                const path = to.path;
                if (path.includes('play')){
                    this.reloadPage();
                }
            }
        }

    }
</script>

<style>
.video_area{
    width: 95%;
    margin-left: 2.5%;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
