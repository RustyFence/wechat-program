// 开发环境下使用 mock
if (process.env.NODE_ENV === 'development') {
  import('./mock/goods.js')
  import('./mock/message.js')
  import('./mock/auth.js')
  import('./mock/publish.js')
  import('./mock/user.js')
}

// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif