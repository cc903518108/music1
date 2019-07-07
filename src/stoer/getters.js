// 做计算
const getters = {
  // 根据当前歌曲的索引，播放当前音乐 ,在将他绑定在播放列表身上
  currentSong: function (state) {
    return state.playList[state.currentIndex]
  }
}
export default getters
