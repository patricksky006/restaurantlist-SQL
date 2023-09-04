//總路由器

const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const searchRouter = require('./search');

router.use('/restaurants', restaurants)
router.use('/search', searchRouter);

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})


module.exports = router