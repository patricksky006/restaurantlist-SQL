// 使用者帳號密碼路由模組

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

router.post('/', (req, res, next) => {
  const { name, email, password, confirmedPassword } = req.body
  if (!email || !password) {
    req.flash('error', '信箱和密碼為必填欄位')
    return res.redirect('back')
  }

  if (password !== confirmedPassword) {
    req.flash('error', '輸入密碼與再次輸入密碼不相符')
    return res.redirect('back')
  }

  return User.count({ where: { email } })
    .then((countEmail) => {
      if (countEmail > 0) {
        req.flash('error', '此信箱已經註冊過了')
        return res.redirect('back')
      }

      return bcrypt.hash(password, 10)
        .then((hashPassword) => {
          return User.create({ name, email, password: hashPassword })
        })
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

module.exports = router
