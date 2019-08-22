import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'

export default {
  install (Vue) {
    Vue.component('el-aside', layoutAside)
    Vue.component('el-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
