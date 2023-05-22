import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
// import './style/theme/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
// 视频组件
import VueCoreVideoPlayer from 'vue-core-video-player'



Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueCoreVideoPlayer)

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
