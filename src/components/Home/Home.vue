<template>
  <div class="wrapper">
    <div>
      <mt-loadmore ref='loadmore' :top-method="loadTop" @top-status-change="handleTopChange">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swiperList" :key="item.id">
          <img :src="item.picUrl" />
        </mt-swipe-item>
      </mt-swipe>
      <div>
        <h1 class="text">热门歌单推荐</h1>
        <ul>
          <li class="listitem" v-for="item in HotList" :key="item.id">
            <div>
              <img :src="item.picUrl" width='60' height="60"/>
            </div>
            <div class="imglis">
              <h2>{{item.songListAuthor}}</h2>
              <p class="textcolor">{{item.songListDesc}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      swiperList: [],
      HotList: [],
      topStatus: ''
    }
  },
  created () {
    this.loadMsg()
  },
  mounted () {
    /* eslint-disable no-new */
    new BScroll('.wrapper')
  },
  methods: {
    loadTop () {
      // 调用axios刷新数据
      this.loadMsg()
      this.$refs.loadmore.onTopLoaded()
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadMsg () {
      axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
        params: {
          '_': 1560153871369,
          g_tk: 5381,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1
        }
      })
        .then(res => {
          // 获取数据绑定到定义的数组中
          // console.log(res)
          this.swiperList = res.data.data.slider
          this.HotList = res.data.data.songList
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.wrapper
  overflow hidden
  position absolute
  top 1.8rem
  left 0
  bottom 0
  right 0
  .mint-swipe
      overflow hidden
      padding-bottom 40%
      width 100%
      height 0
      .mint-swipe-items-wrap
        .mint-swipe-item
          img
            width 100%
            height 100%
    .text
      text-align center
      color $c-theme
      font-size $font-size-x
      padding 0.6rem 0
    .listitem
      display flex
      align-items center
      box-sizing border-box
      padding 0 .4rem .4rem .4rem
      .imglis
        margin-left .4rem
        line-height .6rem
        overflow hidden
        font-size font-size $font-size-x
        .textcolor
          color $c-text-d

</style>
