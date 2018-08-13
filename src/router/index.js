import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import App from '../App'
import Vux from '../components/HelloFromVux'
// 事件总线
import Bus from '../eventbus'
import vuex1 from '../components/vuex1'
Vue.use(Router)
 
const routes = [
	{
	  path: '/',
	  name: 'Vux',
	  component: Vux
	},
	{
		path: '/vuex1',
		name: 'vuex1',
		component: vuex1
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

export default new Router({
  routes
})
