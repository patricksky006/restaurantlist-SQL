// 總路由器

const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const searchRouter = require('./search')
const usersRouter = require('./users')
const authHandler = require('../middlewares/auth-handler')
const passport = require('passport')

router.use('/restaurants', authHandler, restaurants)
router.use('/search', searchRouter)
router.use('/users', usersRouter)

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { // 第一個參數式Strategy名稱(local), 第二個是自訂的選項
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true // passport有整合flash-session功能，開啟後可使用flash
}))

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] })) // 登入facebook的路由，取得資料授權

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', { // Facebook重新導向程式的登入頁
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true // passport有整合flash-session功能，開啟後可使用flash
})
)

router.post('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    req.flash('success', '登出成功')
    return res.redirect('/login')
  })
})

module.exports = router
