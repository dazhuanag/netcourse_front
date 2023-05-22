<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>EAlys</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item label="用户角色">
						<el-radio class="radio" v-model="loginForm.role" label="1">管理员</el-radio>
  						<el-radio class="radio" v-model="loginForm.role" label="2">教师</el-radio>
  						<el-radio class="radio" v-model="loginForm.role" label="3">学生</el-radio>
					</el-form-item>
					<el-form-item>
                        <el-row>
				    	<el-button type="primary" @click="submitForm('loginForm')" size="medium" class="submit_btn">登录</el-button>
				    	<el-button @click="toReg()" size="medium" class="submit_btn">学生注册</el-button>
                        </el-row>
				  	</el-form-item>
				</el-form>
				<!-- <p class="tip">温馨提示：</p> -->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {setStore, getStore} from '@/config/mUtils'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
					role: '1',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			if (getStore('uid') != null) {
				console.log("已登录，跳转主页")
				if(getStore('role') == '1'){
					this.$router.push('/manageAdmin');
				} else {
					this.$router.push('/manage');
				}
    		} else {
				console.log("未登录")
			}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
            toReg(){
                this.$router.push('register')
            },
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await login({username: this.loginForm.username, password: this.loginForm.password, role:this.loginForm.role})
						if (res.code == 200) {
							// 存储
							console.log("登录成功")
							this.adminInfo = res.data
							console.log(res)
							setStore('uid', res.data.uid)
							setStore('role', res.data.role)
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							if(res.data.role == '1') {
								this.$router.push('manageAdmin')
							} else if(res.data.role == '2') {
                                this.$router.push('manageTea')
							} else if(res.data.role == '3') {
                                this.$router.push('manage')
							} else {
								this.$router.push('manage')
							}
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.uid) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 45%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
