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

            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  property="courseId"
                  label="课程ID"
                  width="200">
                </el-table-column>
                <el-table-column
                  property="courseName"
                  label="课程名称">
                </el-table-column>
                <el-table-column
                  property="courseTypeDesc"
                  label="课程分类">
                </el-table-column>
                <el-table-column  label="封面" >
                    <template slot-scope="scope">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.coursePic"
                            fit="contain"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                  <template slot-scope="scope">
                      <el-button
                          type="success"
                          size="mini"
                          @click="play(scope.$index, scope.row)">播放</el-button>
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
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

            <el-dialog title="修改信息" :visible.sync="dialogVisible">
                <el-form :model="selectTable">
                    <el-form-item label="课程名称">
                        <el-input v-model="updateCourseName"></el-input>
                    </el-form-item>
                    <el-form-item label="课程分类">
                        <el-select v-model="updateCourseType" placeholder="请选择">
                            <el-option
                                v-for="item in dirOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <el-input v-model="updateCourseIntro"></el-input>
                    </el-form-item>
                    <el-form-item label="上传封面">
                        <el-upload
                            ref="uploadPic"
                            action="http://localhost:8081/upload/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :file-list="fileList"
                            :limit = '1'
                            :on-exceed = "handleExceed"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传视频">
                        <el-upload
                            ref="uploadVideo"
                            action="http://localhost:8081/upload/"
                            :on-preview="handlePreviewVideo"
                            :on-remove="handleRemoveVideo"
                            :on-success="handleSuccessVideo"
                            :file-list="fileList"
                            :limit = '1'
                            :on-exceed = "handleExceedVideo"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadVideo">上传视频到服务器</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="播放视频" :visible.sync="playDialogVisible">
                      <vue-core-video-player :src="playUrl"></vue-core-video-player>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelPlay">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {courseList,updateCourse,deleteCourse,logAdd } from '@/api/getData'
    import {getStore} from '@/config/mUtils'

    export default {
        data(){
            return {
                selectTable:[],
                dirOptions:[{
                    value: '1',
                    label: 'Java'
                },{
                    value: '2',
                    label: '前端'
                },{
                    value: '3',
                    label: '数据分析'
                }],
                tableData: [],
                currentRow: null,
                count: 0,
                pageSize: 10,
                currentPage: 1,
                playUrl: '',
                uid: '',
                updateCourseId: '',
                updateCourseName: '',
                updateCourseType: '1',
                updateCourseIntro: '',
                updateCoursePic: '',
                updateCourseVideo: '',
                dialogVisible: false,
                playDialogVisible: false,
                queryData: {
                    courseName: ''
                },
                fileList: []
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
          },
          play(index, row) {
              this.playUrl = row.courseVideo;
              this.playDialogVisible = true;
          },
            cancelPlay(){
                this.playUrl = '';
                this.playDialogVisible = false;
            },
          handleEdit(index, row) {
            this.updateCourseId = row.courseId;
            this.updateCourseName = row.courseName;
            this.updateCourseType = '' + row.courseType;
            this.updateCourseIntro = row.courseIntro;
            this.dialogVisible = true;
          },
          async update() {
            // 更新
            const params = {
                courseId: this.updateCourseId,
                courseName: this.updateCourseName,
                courseType: this.updateCourseType,
                courseIntro: this.updateCourseIntro,
              };
            if(this.updateCoursePic != ''){
                params.coursePic = this.updateCoursePic
            }
            if(this.updateCourseVideo != ''){
                params.courseVideo = this.updateCourseVideo
            }
            await updateCourse(params);
              await logAdd({uid: this.uid, content:'修改课程信息'})
            this.dialogVisible = false;
            this.getTableData();
          },
          async handleDelete(index, row) {
            // 删除
            const params = {courseId: row.courseId};
            await deleteCourse(params);
              await logAdd({uid: this.uid, content:'删除课程'})
            this.getTableData();
          },
          clearQuery() {
            this.queryData.courseName = '';
          },
            submitUpload() {
                this.$refs.uploadPic.submit();
            },
            handleSuccess(response, file, fileList){
                console.log(response)
                this.updateCoursePic = response.data;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleExceed(file, fileList){
                this.$message({
                    message: '只能选择一个文件上传',
                    type: 'warning'
                });
            },
            handlePreview(file) {
                console.log(file);
            },
            submitUploadVideo() {
                this.$refs.uploadVideo.submit();
            },
            handleSuccessVideo(response, file, fileList){
                console.log(response)
                this.updateCourseVideo = response.data;
            },
            handleRemoveVideo(file, fileList) {
                console.log(file, fileList);
            },
            handleExceedVideo(file, fileList){
                this.$message({
                    message: '只能选择一个文件上传',
                    type: 'warning'
                });
            },
            handlePreviewVideo(file) {
                console.log(file);
            }
        }

    }
</script>

<style lang="less">

</style>
