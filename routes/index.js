//總路由器

const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')

const restaurants = require('./restaurants')
const searchRouter = require('./search')
const usersRouter = require('./users')
const authHandler = require('../middlewares/auth-handler');


router.use('/restaurants',authHandler, restaurants)
router.use('/search', searchRouter);
router.use('/users', usersRouter);

const db = require('../models');
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((foundUser)=> {
      if (!foundUser || foundUser.password !== password) {
        return done(null, false, { message: 'email或密碼錯誤'}) //驗證失敗，則呼叫callback函式進入錯誤處理，第三個參數可輸入有錯誤時的物件
      }
      return done(null, foundUser) // 驗證成功，則呼叫callback 函式, serializeUser 將驗證資料存入session
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.serializeUser((foundUser, done) => {  //指定要找到foundUser的id, name, email等資料存入session，之後在登入流程中呼叫一次
  const { id, name, email } = foundUser
  return done(null, { id, name, email })
})

passport.deserializeUser((foundUser, done) => { //第一個參數是取出登入時存入在session中的使用者，第二個參數callback會將使用者存入req.user中，提供給router使用
  done(null, { id: foundUser.id })
})



router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})



router.post('/login', passport.authenticate('local', {  //第一個參數式Strategy名稱(local), 第二個是自訂的選項
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true //passport有整合flash-session功能，開啟後可使用flash
}))

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }

    return res.redirect('/login')
  })
})

module.exports = router