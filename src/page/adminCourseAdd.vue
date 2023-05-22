<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p>&nbsp;</p>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="课程名称">
    <el-input v-model="form.courseName"></el-input>
  </el-form-item>
    <el-form-item label="课程分类">
        <el-select v-model="form.courseType" placeholder="请选择">
            <el-option
                v-for="item in dirOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="课程介绍">
        <el-input v-model="form.courseIntro"></el-input>
    </el-form-item>
    <el-form-item label="课程排序">
        <el-input type="number" v-model="form.sort"></el-input>
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
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
<!--    <el-button>取消</el-button>-->
  </el-form-item>
</el-form>

    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {addCourse,logAdd} from '@/api/getData'
    import {getStore} from '@/config/mUtils'

    export default {
        data(){
            return {
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
                form:{
                    courseName: '',
                    courseType: '',
                    courseIntro: '',
                    coursePic: '',
                    courseVideo: '',
                },
                fileList: [],
                uid: ''
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        },
        mounted() {
            this.uid = getStore('uid');
        },
        methods: {
            onSubmit(){
                this.submit();
            },
            async submit(){
                const params = this.form;
                this.form.uploadUid = this.uid;
                const res = await addCourse(params);
                if (res.code == 200){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    await logAdd({uid: this.uid, content:'新增课程'})
                    this.clearInput();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            },
            clearInput(){
                this.form = {
                    courseName: '',
                    courseType: '',
                    courseIntro: '',
                    coursePic: '',
                    courseVideo: '',
                },
                    this.fileList = []
            },
            submitUpload() {
                this.$refs.uploadPic.submit();
            },
            handleSuccess(response, file, fileList){
                console.log(response)
                this.form.coursePic = response.data;
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
                this.form.courseVideo = response.data;
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
