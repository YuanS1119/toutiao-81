import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
import components from './components'
import axios from 'axios'
import router from './permission'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(components)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
