import router from './router'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('userInfo')
    if (result) {
      let userinfo = JSON.parse(result)
      if (userinfo && userinfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
