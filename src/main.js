// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vux from './components/HelloFromVux'
// 事件总线
import Bus from './eventbus'

import axios from 'axios'
import { LoadingPlugin, XButton, Toast } from 'vux'
Vue.prototype.$ajax = axios
Vue.component('x-button', XButton)
Vue.component('toast', Toast)

Vue.use(VueRouter)
Vue.use(LoadingPlugin)

const routes = [
	{
	  path: '/',
	  name: 'Vux',
	  component: Vux
	},
	{
		path: '/es6',
		name: 'es6',
		component: resolve => require(['@/components/es6'],resolve)
	},
	{
		path: '/bbb',
		name: 'bbb',
		component: resolve => require(['@/components/bbb'], resolve)
	},
	{
		path: '/aac',
		name: 'aac',
		component: resolve => require(['@/components/aac'],resolve),
		children: [
			{
				path: 'cc',
				name: 'cc',
				component: resolve => require(['@/components/cc'],resolve)
			}
		]
	},
	{	// 假装是aac的儿子
		path: '/aac/list_state',
		component: resolve => require(['@/components/list_state'],resolve),
	},
	{
		path: '/list_state/list_detail',
		component: resolve => require(['@/components/list_detail'],resolve)
	}
]
const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.devtools = true; // 开启devtools
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  created () {
  	this.$vux.loading.show({
      text: '页面加载中...'
    })
  },
  mounted () {
  	setTimeout(() => {
  		this.$vux.loading.hide();
  	},1000)
  },
  render: h => h(App)
}).$mount('#app-box')
