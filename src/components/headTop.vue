<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<!-- <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item> -->
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<h2 style="margin-right: 20px;">选项</h2>
			<!-- <img :src="baseImgPath + adminInfo.avatar" class="avator"> -->
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
	import {removeStore, getStore} from '@/config/mUtils'

    export default {
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	created(){
    	},
    	computed: {
    	},
		methods: {
			async handleCommand(command) {
				if (command == 'home') {
					if(getStore('role') == '1'){
						this.$router.push('/manageAdmin');
					} else {
						this.$router.push('/manage');
					}
				}else if(command == 'signout'){
					console.log('退出登录')
					removeStore('uid')
					removeStore('role')
					this.$router.push('/')
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     this.$router.push('/');
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		// background-color: #EFF2F7;
		background-color: #E1E4EA;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
