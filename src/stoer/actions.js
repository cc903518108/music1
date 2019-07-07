// 做异步请求
import * as Types from './mutations-types'
import axios from 'axios'

const actions = {
  // 加入播放列表
  addplaylist ({commit}, item) {
    // 拉取数据
    axios.get('/apitow/cgi-bin/musicu.fcg', {
      params: {
        '-': 'getUCGI8894917123819053',
        g_tk: 280534481,
        loginUin: 767867557,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {
          'comm': {'ct': 24, 'cv': 0},
          'songinfo': {
            'method': 'get_song_detail_yqq',
            'param': {'song_type': 0, 'song_mid': item.mid, 'song_id': 104913384},
            'module': 'music.pf_song_detail_svr'
          }
        }
      }
    })
      .then(res => {
        // console.log(res)
        let srcc = res.data.songinfo.data.track_info.album.mid
        let pic = '//y.gtimg.cn/music/photo_new/T002R300x300M000' + srcc + '.jpg?max_age=2592000'
        console.log(pic)
        // 封面图
        axios.get('/apitow/cgi-bin/musicu.fcg', {
          params: {
            '-': 'getplaysongvkey7898495334761106',
            g_tk: 1761175039,
            loginUin: 903518108,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            data: {
              'req': {
                'module': 'CDN.SrfCdnDispatchServer',
                'method': 'GetCdnDispatch',
                'param': {'guid': '3913969550', 'calltype': 0, 'userip': ''}
              },
              'req_0': {
                'module': 'vkey.GetVkeyServer',
                'method': 'CgiGetVkey',
                'param': {
                  'guid': '3913969550',
                  'songmid': [item.mid],
                  'songtype': [0],
                  'uin': '903518108',
                  'loginflag': 1,
                  'platform': '20'
                }
              },
              'comm': {'uin': 903518108, 'format': 'json', 'ct': 24, 'cv': 0}
            }
          }
        })
          .then(res => {
            // console.log(res)
            // console.log(res.data.req_0.data.sip[1])
            var sl = res.data.req_0.data.sip[1]
            var lj = res.data.req_0.data.midurlinfo[0].purl
            var playpath = sl + lj // 播放地址
            // console.log(res.data.req_0.data.midurlinfo[0].purl)
            console.log(playpath)
            var MySongIntu = {
              songInfo: item,
              songPic: pic,
              songMui: playpath
            }
            // 提交给mutations
            commit(Types.ADD_PLAYLIST, MySongIntu)
          })
      })
  }
}
export default actions
