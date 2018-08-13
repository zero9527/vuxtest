// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
// 事件总线
import Bus from './eventbus'

import store from './assets/js/store'

import router from './router'

import axios from 'axios'
import { LoadingPlugin, XButton, Toast, XInput, Group } from 'vux'
Vue.prototype.$ajax = axios
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('group', Group)
Vue.component('toast', Toast)

// Vue.use(VueRouter)
Vue.use(LoadingPlugin)

FastClick.attach(document.body)

Vue.config.devtools = true; // 开启devtools
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
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
