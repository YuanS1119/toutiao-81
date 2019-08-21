import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'

export default {
  install (Vue) {
    Vue.component('el-aside', layoutAside)
    Vue.component('el-header', layoutHeader)
  }
}
