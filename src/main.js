import Vue from 'vue'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock/mock' //引入mock
import './filters' //加载过滤器
// import Split from './components/Split/Split.vue'

Vue.component(Button.name, Button)

// Vue.component('Split-Comp', Split)

Vue.config.productionTip = false

Vue.use(VueLazyload, { //内部自定义一个指令lazy，后面用的时候就是v-lazy
  loading
  })

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
