import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1,
  text: '',
  obj: {}
}

const actions = {}

const mutations = {
  add: function (state) {
    state.count++
  },
  reduce: function (state) {
    state.count--
  },
  setValue: function (state, val) {
    // 赋值修改
    state.text = val
  },
  setObj: function (state, obj) {
    state.obj = obj
  }
}

export default new Vuex.Store({
  state, mutations, actions
})
