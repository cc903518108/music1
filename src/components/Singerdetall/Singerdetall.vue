<template>
    <div class='music'>
      <div class='back' @click='$router.back()'><i class='icon-back'></i></div>
      <h1 class='title' v-text="$route.params.singer_name"></h1>
      <div class='gb-images' ref='gbimages'>
        <div class='payl-warp'>
          <div class='play'>
            <i class='icon-play'></i>
            <span class='text'>随机播放全部</span>
          </div>
        </div>
        <div class='filter'></div>
      </div>

      <div class='songlist' ref="songlist">
        <div class='list'>
          <ul>
            <li class='item' @click="addplaylist(item)" v-for="item in sonlist" :key="item.id">
              <div class='content'>
                <h2 class='name' v-text="item.name"></h2>
                <p class='desc' v-text="item.singer[0].name">描述</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      sonlist: []
    }
  },
  methods: {
    // 歌曲的点击事件，加入列表
    ...mapActions(['addplaylist'])
  },
  mounted () {
    this.$refs.gbimages.style.backgroundImage = 'url(' + this.$route.params.singer_pic + ')'
    this.scroll = new BScroll(this.$refs.songlist)
  },
  created () {
    axios.get('apitow/cgi-bin/musicu.fcg', {
      params: {
        '-': 'getUCGI5169167587928551',
        g_tk: 1761175039,
        loginUin: 903518108,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {'comm': {'ct': 24, 'cv': 0}, 'singer': {'method': 'get_singer_detail_info', 'param': {'sort': 5, 'singermid': this.$route.params.singer_mid, 'sin': 0, 'num': 10}, 'module': 'music.web_singer_info_svr'}}}})
      .then(res => {
        this.sonlist = res.data.singer.data.songlist
        // console.log(this.sonlist)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/style/variable.styl'
.music
  position fixed
  z-index 100
  top 0
  left 0
  bottom 0
  right 0
  background $c-bg
  .back
    position absolute
    top 0
    left .12rem
    z-index 66
    .icon-back
      display block
      padding .2rem
      font-size $font-size-xll
      color $c-theme
  .title
    position absolute
    top 0
    width 100%
    text-align center
    line-height .8rem
    font-size $font-size-xl
    color $c-text
    z-index 60
  .gb-images
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background url('//y.gtimg.cn/music/photo_new/T001R300x300M000001fNHEf1SFEFN.jpg?max_age=2592000')
    background-size cover
    background-repeat no-repeat
    .payl-warp
      position absolute
      bottom .4rem
      z-index 22
      width 100%
      .play
        box-sizing border-box
        width 2.7rem
        padding .14rem 0
        margin 0 auto
        text-align center
        border  1px solid $c-theme
        border-radius 1rem
        .icon-play
          display inline-block
          vertical-align middle
          font-size $font-size-l
          margin-right .1rem
          color $c-theme
        .text
          display inline-block
          font-size $font-size-x
          color $c-theme
          vertical-align middle
    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7, 17, 27, .4)
  .songlist
    position absolute
    overflow hidden
    top 5.3rem
    left 0
    right 0
    bottom 0
    background $c-hig-bg
    .list
      .item
        display flex
        align-items center
        box-sizing border-box
        height 1.2rem
        font-size $font-size-l
        .content
          flex 1
          line-height .4rem
          overflow hidden
          padding 0 .4rem
          .name
            color $c-text
            font-size $font-size-l
          .desc
            color $c-dia-bg
            margin-top .08rem
            font-size $font-size-x

</style>
