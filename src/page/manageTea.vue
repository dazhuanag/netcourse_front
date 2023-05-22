<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manageTea"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-plus"></i>视频管理</template>
						<el-menu-item index="teaAddVideo">添加视频</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-plus"></i>课程图表</template>
						<el-menu-item index="counthit">课程点击量</el-menu-item>
						<el-menu-item index="studytime">学习时长饼图</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import {checkLogin} from '@/config/mUtils'

    export default {
		created(){
			checkLogin(this);
		},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
