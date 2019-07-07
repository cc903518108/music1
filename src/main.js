// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import Mint from 'mint-ui'
import store from './stoer/index'

import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/animate.css'
import 'mint-ui/lib/style.css'
import './assets/style/base.styl'
import './assets/style/icon.styl'
fastclick.attach(document.body)// 挂载
Vue.use(Mint)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
