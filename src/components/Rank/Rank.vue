<template>
    <div class="wrapper">
      <ul>
        <li class="listitem" v-for="item in swiperList" :key="item.id">
          <div class="img">
            <img :src="item.picUrl" width="90" height="90"/>
          </div>
          <div class="imglis">
            <h1 class="imglisup">{{item.topTitle}}</h1>
            <p class="fontcolor">1 {{item.songList[0].songname}}-{{item.songList[0].singername}}</p>
            <p class="fontcolor">2 {{item.songList[1].songname}}-{{item.songList[1].singername}}</p>
            <p class="fontcolor">3 {{item.songList[2].songname}}-{{item.songList[2].singername}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      swiperList: []
    }
  },
  created () {
    axios.get('api/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1560242213524&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1')
      .then(res => {
        // console.log(res)
        this.swiperList = res.data.data.topList
        // console.log(this.swiperList)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.listitem
  display flex
  align-items center
  box-sizing border-box
  padding 0 .4rem .4rem .4rem
  .imglis
    margin-left .4rem
    line-height .4rem
    overflow hidden
    font-size $font-size-s
    .fontcolor
      font-size $c-text-d
</style>
