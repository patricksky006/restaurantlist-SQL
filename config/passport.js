// passport 套件設定


const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const bcrypt = require('bcryptjs')



const db = require('../models');
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username },
    raw: true
  })
    .then((foundUser)=> {
      if (!foundUser) {
        return done(null, false, { message: 'email或密碼錯誤'}) //驗證失敗，則呼叫callback函式進入錯誤處理，第三個參數可輸入有錯誤時的物件
      }

      return bcrypt.compare(password, foundUser.password)
        .then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: 'email或密碼錯誤'}) //驗證失敗，則呼叫callback函式進入錯誤處理，第三個參數可輸入有錯誤時的物件
          }
          return done(null, foundUser) // 驗證成功，則呼叫callback 函式, serializeUser 將驗證資料存入session
        })
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:  process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email'] 
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const name = profile.displayName

    return User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email },
    raw: true
  })
    .then((foundUser)=> {
      if (foundUser) return done(null, foundUser)

      const randomPwd = Math.random().toString(36).slice(-8)

      return bcrypt.hash(randomPwd, 10)
        .then((hash) => {
          return User.create({ name, email, password: hash })
        })
        .then((user) => done(null, { id: user.id, name: user.name, email: user.email }))
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
  }
));


passport.serializeUser((foundUser, done) => {  //指定要找到foundUser的id, name, email等資料存入session，之後在登入流程中呼叫一次
  const { id, name, email } = foundUser
  return done(null, { id, name, email })
})

passport.deserializeUser((foundUser, done) => { //第一個參數是取出登入時存入在session中的使用者，第二個參數callback會將使用者存入req.user中，提供給router使用
  done(null, { id: foundUser.id })
})


module.exports = passport