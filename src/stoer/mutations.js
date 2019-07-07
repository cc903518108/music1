import * as Types from './mutations-types'
const mutations = {
  [Types.ADD_PLAYLIST] (state, item) {
    // 查看当前添加的歌曲是佛存在
    let music = state.playList.find(val => val.songInfo.mid === item.songInfo.mid)
    if (music) {
      state.fullScreen = true // 判断是佛全屏还是小屏 true 为全屏
      // 歌曲存在，找当前歌曲的索引
      // console.log(state.playList.indexOf(music)) 当前播放列表歌曲的索引
      state.currentIndex = state.playList.indexOf(music) // 当前用户点击的索引设置为当前柏昂的索引
    } else {
      // 向播放列表中添加歌曲
      state.playList = [...state.playList, item]
      state.fullScreen = true
      // console.log(state.playList.length-1) 当前播放列表歌曲的索引
      state.currentIndex = state.playList.length - 1
    }
    console.log(state.playList)
  },
  // 修改当前播放器显示的状态
  [Types.FULLSCREEN] (state) {
    state.fullScreen = !state.fullScreen
  }
}
export default mutations
