<template>
    <div class="fillcontain">
        <head-top></head-top>
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
  </el-form-item>
</el-form>

    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {updateUser,getUserDetail,logAdd} from '@/api/getData'
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
                uid:'',
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        },
        mounted(){
            this.uid = getStore('uid');
            this.refreshData();
        },
        methods: {
            async refreshData(){
                const params = {uid: this.uid};
                const res = await getUserDetail(params);
                this.form.role = '' + res.data.role;
                this.form.direction = '' + res.data.direction;
                this.form.username = res.data.username;
                this.form.password = res.data.password;
                this.form.sex = '' + res.data.sex;
                this.form.tel = res.data.tel;
            },
            onSubmit(){
                this.submit();
            },
            async submit(){
                const params = this.form;
                params.uid = this.uid;
                const res = await updateUser(params);
                if (res.code == 200){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    await logAdd({uid: this.uid, content:'修改个人信息'})
                    this.refreshData();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>

<style lang="less">

</style>
