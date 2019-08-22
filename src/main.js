import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

import components from './components'
import router from './permission'
import axios from './utils/axios.config'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(components)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
