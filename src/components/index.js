import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import coverImage from './publish/cover-image'
import selectImg from './publish/select-images'

export default {
  install (Vue) {
    Vue.component('el-aside', layoutAside)
    Vue.component('el-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('cover-image', coverImage)
    Vue.component('select-images', selectImg)
  }
}
