import Vue from 'vue'
import App from './App.vue'

import store from './vuex/store'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
  store: store
})
