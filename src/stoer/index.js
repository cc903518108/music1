import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
// 播放模式

const playMode = {
  sequence: 0, // 顺序播放
  loop: 1, // 循环播放
  random: 2 // 随机播放
}

const state = {
  playing: false, // 是否播放
  fullScreen: false, // 播放器是否全屏
  playList: [], // 播放列表
  ReplayList: [], // 播放列表-备份
  mode: playMode.sequence, // 默认顺序播放
  currentIndex: -1// 当前播放歌曲的索引
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
