// import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from 'vuex'
import state from './state';

// Vue.use(Vuex)

// 准备actions对象——用于响应组件里的动作
// const actions = {}
// 准备mutations——用于操作数据（state）
// const mutations = {}


// 创建并暴露store
export default createStore({
//   actions,
//   mutations,
  state
})