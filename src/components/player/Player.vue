<template>
  <div class="player" v-if="playList.length>0">
    <transition
      mode="out-in"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="backfround">
          11111
          <img :src="currentSong.songPic" width="100%" height="100%" />
        </div>
        <div class="top">
          <div class="back" @click="playerback">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-text="currentSong.songInfo.name"></h1>
          <h2 class="subtitle" v-text="currentSong.songInfo.singer[0].name"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd play">
                <img :src="currentSong.songPic" />
              </div>
            </div>
            <div class="lyric-wrapper">
              <div class="lyric">11111</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">0:10</span>
            <div class="progress-bar-wrapper">
              <mt-range v-model="rangeValue"></mt-range>
            </div>
            <span class="time time-r">4:10</span>
          </div>
          <div class="btns">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i @click.stop="togglePlaying" class="icon-play"></i>
            </div>
            <div class="icon i-right" >
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition
      mode="out-in"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="mini-player" v-show="!fullScreen">
        <div class="mini-cd">
          <img @click="btnChangeFull" class='play' :src="currentSong.songPic" width="40px" height="40px"/>
        </div>
        <div class="text">
          <h2 class="name" v-text="currentSong.songInfo.name"></h2>
          <p class="singer" v-text="currentSong.songInfo.singer[0].name"></p>
        </div>
        <div class="control">
          <i class="icon-play-mini"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.songMui"></audio>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { FULLSCREEN } from '../../stoer/mutations-types' // 引入定义的常量名 1
export default {
  data () {
    return {
      rangeValue: 0
    }
  },
  computed: {
    ...mapState(['fullScreen', 'playList']), // 2
    ...mapGetters(['currentSong'])
  },
  // 挂载完成之后操作 mounted 为函数
  mounted () {
    if (this.currentSong.songMui) {
      this.$refs.audio.play()
    }
  },
  methods: {
    playerback () {
      this.$store.commit(FULLSCREEN) // 将定义的方法名 提交  不需要传入参数  然后去mutations定义这个方法
    },
    btnChangeFull () {
      this.$store.commit(FULLSCREEN)
    },
    togglePlaying () {

    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.player
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background $c-hig-bg
    .backfround
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index -1
      opacity .8
      filter blur(10px)
    .top
      position relative
      .back
        position absolute
        top 0
        left .2rem
        z-index 50
        .icon-back
          display block
          padding .18rem
          font-size $font-size-xll
          color $c-theme
          transform rotate(-90deg)
      .title
        /*width 70%*/
        margin 0 auto
        text-align center
        line-height .8rem
        font-size $font-size-xl
      .subtitle
        text-align center
        line-height .6rem
        font-size $font-size-l
        color $c-theme
    .middle
      position fixed
      width 100%
      top 1.6rem
      bottom 3.4rem
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-bottom 80%
        .cd-wrapper
          position absolute
          width 80%
          left 10%
          top 0
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border .2rem solid rgba(255,255,255,.1)
            border-radius 50%
            position relative
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            img
              position absolute
              left 0
              top 0
              width 100%
              height 100%
              border-radius 50%
        .lyric-wrapper
          width 80%
          text-align center
          margin 0 10%
          position absolute
          bottom -1rem
          .lyric
            height .4rem
            line-height .4rem
            font-size $font-size-medium
            color $color-text-l
    .bottom
      position absolute
      bottom 1rem
      width 100%
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin 0 auto
        padding .1rem 0
        .time
          color $color-text
          font-size $font-size-small
          flex 0 0 .6rem
          line-height .6rem
          width .6rem
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1
      .btns
        display flex
        align-items center
        margin-top .4rem
        .icon
          flex 1
          color $c-theme
          font-size 26px
        .i-left
          text-align right
        .i-right
          text-align left
        .i-center
          text-align center
          padding 0 .4rem
          font-size 45px
          &.disable
            color $c-theme
  .mini-player
    position fixed
    bottom 0
    left 0
    width 100%
    z-index 200
    height 1.6rem
    background $c-dia-bg
    display flex
    align-items center
    .mini-cd
      flex 0 0 .8rem
      width .8rem
      padding 0 .2rem 0 .4rem
      img
        border-radius 50%
        &.play
          animation rotate 10s linear infinite
        &.pause
          animation-play-state paused
    .text
      display flex
      flex-direction column
      flex 1
      line-height .4rem
      overflow hidden
      .name
        font-size $font-size-x
        margin-bottom .04rem
      .singer
        font-size $font-size-x
        color $c-theme
    .control
      flex 0 0 .6rem
      width .6rem
      font-size 30px
      color $c-theme
      padding 0 .2rem
      position relative
      .mini_progress
        position absolute
        top .01rem
        left .18rem
        z-index -1
@keyframes rotate
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
</style>
