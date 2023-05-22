import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

// const exportOne = r => require.ensure([], () => r(require('@/page/exportOne')), 'exportOne');
// const exportAll = r => require.ensure([], () => r(require('@/page/exportAll')), 'exportAll');
const updateSelfInfo = r => require.ensure([], () => r(require('@/page/updateSelfInfo')), 'updateSelfInfo');


const manageAdmin = r => require.ensure([], () => r(require('@/page/manageAdmin')), 'manageAdmin');
const manageTea = r => require.ensure([], () => r(require('@/page/manageTea')), 'manageTea');
const adminHome = r => require.ensure([], () => r(require('@/page/adminHome')), 'adminHome');
const teaHome = r => require.ensure([], () => r(require('@/page/teaHome')), 'teaHome');
const adminUserList = r => require.ensure([], () => r(require('@/page/adminUserList')), 'adminUserList');
const addUser = r => require.ensure([], () => r(require('@/page/addUser')), 'addUser');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');

const adminCourseList = r => require.ensure([], () => r(require('@/page/adminCourseList')), 'adminCourseList');
const adminCourseAdd = r => require.ensure([], () => r(require('@/page/adminCourseAdd')), 'adminCourseAdd');
const adminLogList = r => require.ensure([], () => r(require('@/page/adminLogList')), 'adminLogList');


const play = r => require.ensure([], () => r(require('@/page/play')), 'play');

const teaplay = r => require.ensure([], () => r(require('@/page/teaplay')), 'teaplay');

const teaAddVideo = r => require.ensure([], () => r(require('@/page/teaAddVideo')), 'teaAddVideo');
const counthit = r => require.ensure([], () => r(require('@/page/counthit')), 'counthit');
const studytime = r => require.ensure([], () => r(require('@/page/studytime')), 'studytime');



const routes = [
	{
		path: '/',
		component: login
	},{
		path: '/register',
		component: register
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/play',
			component: play,
			meta: ['视频播放', '视频播放'],
		},{
			path: '/updateSelfInfo',
			component: updateSelfInfo,
			meta: ['修改个人信息', '修改个人信息'],
		}]
	},
	{
		// 管理员菜单
		path: '/manageTea',
		component: manageTea,
		name: '',
		children: [{
			path: '',
			component: teaHome,
			meta: [],
		},{
			path: '/teaplay',
			component: teaplay,
			meta: ['播放', '播放'],
		},{
			path: '/teaAddVideo',
			component: teaAddVideo,
			meta: ['视频管理', '添加视频'],
		},{
			path: '/counthit',
			component: counthit,
			meta: ['课程图表', '课程点击量'],
		},{
			path: '/studytime',
			component: studytime,
			meta: ['课程图表', '学习时长饼图'],
		}]
	},
	{
		// 管理员菜单
		path: '/manageAdmin',
		component: manageAdmin,
		name: '',
		children: [{
			path: '',
			component: adminHome,
			meta: [],
		},{
			path: '/adminUserList',
			component: adminUserList,
			meta: ['成员管理', '成员列表'],
		},{
			path: '/addUser',
			component: addUser,
			meta: ['成员管理', '添加成员'],
		},{
			path: '/adminCourseList',
			component: adminCourseList,
			meta: ['课程管理', '课程列表'],
		},{
			path: '/adminCourseAdd',
			component: adminCourseAdd,
			meta: ['课程管理', '添加课程'],
		},{
			path: '/adminLogList',
			component: adminLogList,
			meta: ['日志管理', '查看日志'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
