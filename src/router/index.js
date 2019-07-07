import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import Singer from '../components/Singer/Singer'
import Seach from '../components/Seach/Seach'
import Rank from '../components/Rank/Rank'
import Singerdetall from '../components/Singerdetall/Singerdetall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children: [
        {
          path: 'detail',
          name: 'Singerdetall',
          component: Singerdetall
        }
      ]
    },
    {
      path: '/seach',
      name: 'Seach',
      component: Seach
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]
})
