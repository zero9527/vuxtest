// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import aac from './Components/aac'
import aab from './Components/aab'
import { LoadingPlugin, XButton } from 'vux'

Vue.component('x-button', XButton)

Vue.use(VueRouter)
Vue.use(LoadingPlugin)

const routes = [{
  path: '/',
  name: 'home',
  component: Home
},{
	path: '/aac',
	name: 'aac',
	component: aac
},{
	path: '/aab',
	name: 'aab',
	component: aab
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
