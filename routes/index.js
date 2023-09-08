//總路由器

const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')

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

const restaurants = require('./restaurants')
const searchRouter = require('./search');



router.use('/restaurants', restaurants)
router.use('/search', searchRouter);

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/users', (req, res, next) => {
  const { name, email, password, confirmedPassword } = req.body
  if (!email || !password) {
    req.flash('error', '信箱和密碼為必填欄位')
    return res.redirect('back')
  }

  if (password !== confirmedPassword) {
    req.flash('error', '輸入密碼與再次輸入密碼不相符')
    return res.redirect('back')
  }
  
  return User.count({ where: {email} })
    .then((countEmail) => {
      if (countEmail > 0) {
        req.flash('error', '此信箱已經註冊過了')
        return res.redirect('back')
      }

      return User.create({ name, email, password})
        .then((createdUser) => {
          if (!createdUser) {
            req.flash('error', '資料庫有異常，註冊失敗')
            return res.redirect('back')
          }
          req.flash('success', '註冊成功')
          return res.redirect('/login')
        })

        .catch((error) => {
          error.errorMessage = '不明原因，註冊失敗'
          next(error)
        })
    })
})

router.post('/login', passport.authenticate('local', {  //第一個參數式Strategy名稱(local), 第二個是自訂的選項
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true //passport有整合flash-session功能，開啟後可使用flash
}))

router.post('/logout', (req, res) => {
  res.send('POST/logout, 登出使用者')
})

module.exports = router