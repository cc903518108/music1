<template>
    <div>
      <mt-index-list>
        <mt-index-section :index="val.src" v-for="val in singerList " :key="val.index">
          <mt-cell v-for="item in val.singerlist" :key="item.singer_mid">
            <router-link :to="{name:'Singerdetall',params:{
                singer_mid:item.singer_mid,
                singer_pic:item.singer_pic,
                singer_name:item.singer_name
                 }}">
              <img class="img" v-lazy="item.singer_pic"/>
              {{item.singer_name}}
            </router-link>
          </mt-cell>
        </mt-index-section>
      </mt-index-list>
      <transition name="siltd">
        <router-view/>
      </transition>
    </div>
</template>

<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      singerList: [],
      indexList: [],
      List: []
    }
  },
  created () {
    Indicator.open('Loading...')
    axios.get('/apitow/cgi-bin/musicu.fcg', {
      params: {
        '-': 'getUCGI3300445450170797',
        g_tk: 1761175039,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {'comm': {'ct': 24, 'cv': 0}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}}}
      }
    })
      .then(res => {
        this.indexList = res.data.singerList.data.tags.index
        // console.log(this.indexList)
        for (let i = 0; i < this.indexList.length; i++) {
          axios.get('/apitow/cgi-bin/musicu.fcg', {
            params: {
              '-': 'getUCGI3300445450170797',
              g_tk: 1761175039,
              loginUin: 0,
              hostUin: 0,
              format: 'json',
              inCharset: 'utf8',
              outCharset: 'utf-8',
              notice: 0,
              platform: 'yqq.json',
              needNewCode: 0,
              data: {'comm': {'ct': 24, 'cv': 0}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': this.indexList[i].id, 'sin': 0, 'cur_page': 1}}}
            }
          })
            .then(res => {
              // console.log(res)
              // this.indexList = res.data.singerList.data
              // console.log(res.data.singerList.data.index)
              // 判断 hot -a-z-#长度
              if (res.data.singerList.data.index === -100) {
                // 处理热门歌曲
                this.List.push({
                  index: res.data.singerList.data.index, // 1234序号 榜单key
                  src: 'Hot', // 绑定右侧名称
                  singerlist: res.data.singerList.data.singerlist.slice(0, 7)
                })
              } else if (res.data.singerList.data.index === 27) {
                // 处理#号
                this.List.push({
                  index: res.data.singerList.data.index,
                  src: '#',
                  singerlist: res.data.singerList.data.singerlist.slice(0, 7)
                })
              } else {
                // 正常情况a-z 通过转换奥斯科玛
                this.List.push({
                  index: res.data.singerList.data.index,
                  src: String.fromCharCode(res.data.singerList.data.index + 64),
                  singerlist: res.data.singerList.data.singerlist.slice(0, 7)
                })
              }
              // console.log(this.singerList)
              // 排序
              if (i === this.indexList.length - 1) {
                this.singerList = this.List.sort((a, b) => a.index - b.index)
                Indicator.close()
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>

<style lang="stylus" scoped>
@import '../../assets/style/variable.styl'
.siltd-enter-active,.siltd-leave-active
  transition all .3s
.siltd-enter,.siltd-leave-to
  transform translate3d(100%,0,0)
.img
  border-radius 50%
  width 1rem
  height 1rem
  margin-right .4rem
</style>
