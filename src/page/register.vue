<template>
    <div class="fillcontain">
<!--        <head-top></head-top>-->
        <p>&nbsp;</p>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
</el-form-item>
    <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="专业方向">
        <el-select v-model="form.direction" placeholder="请选择">
            <el-option
                v-for="item in dirOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择">
            <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="电话">
        <el-input v-model="form.tel"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="goBack">取消</el-button>
  </el-form-item>
</el-form>

    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {addUserAdmin,getAllGrade} from '@/api/getData'

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
                sexOptions:[{
                    value: '1',
                    label: '男'
                },{
                    value: '2',
                    label: '女'
                }],
                form:{
                    username: '',
                    password: '',
                    direction:'1',
                    tel: '',
                    role: '3',
                    sex: '1',
                },
                gradeList: []
            }
        },
    	components: {
    		headTop,
    	},
        mounted(){
        },
        created(){
        },
        methods: {
            goBack(){
                this.$router.push('/')
            },
            onSubmit(){
                this.submit();
            },
            async submit(){
                const params = this.form;
                const res = await addUserAdmin(params);
                if (res.code == 200){
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    this.clearInput();
                    this.goBack();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }

            },
            clearInput(){
                this.form = {
                    username: '',
                    password: '',
                    email: '',
                    remark: '',
                    role: '1',
                    sex: '1',
                    cid: ''
                }
            }
        }
    }
</script>

<style lang="less">

</style>
