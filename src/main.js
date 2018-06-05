// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vux from './components/HelloFromVux'
import aac from './Components/aac'
import cc from './Components/cc'
import bbb from './Components/bbb'
import list_state from './Components/list_state'
import list_detail from './Components/list_detail'
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
		path: '/bbb',
		name: 'bbb',
		component: bbb
	},
	{
		path: '/aac',
		name: 'aac',
		component: aac,
		children: [
			{
				path: 'cc',
				name: 'cc',
				component: cc
			}
		]
	},
	{	// 假装是aac的儿子
		path: '/aac/list_state',
		component: list_state,
	},
	{
		path: '/list_state/list_detail',
		component: list_detail
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
