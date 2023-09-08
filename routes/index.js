//總路由器

const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const searchRouter = require('./search');

const db = require('../models');
const User = db.user

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

router.post('/users', (req, res) => {
  res.send('POST/users, 新增使用者')
})

router.post('/login', (req, res) => {
  res.send('POST/login, 登入使用者')
})

router.post('/logout', (req, res) => {
  res.send('POST/logout, 登出使用者')
})

module.exports = router