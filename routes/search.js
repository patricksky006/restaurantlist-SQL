// 搜尋功能路由模組

const express = require('express')
const router = express.Router()

const db = require('../models')
const restaurant = db.restaurant

router.get('/', (req, res, next) => {
  const keyword = req.query.search?.trim()
  const userId = req.user.id // 此id是由passport套件提供

  if (!keyword) {
    req.flash('success', '請在搜尋欄輸入關鍵字')
    return res.redirect('/restaurants')
  }

  restaurant
    .findAll({
      attributes: [
        'id',
        'name',
        'name_en',
        'category',
        'image',
        'location',
        'phone',
        'google_map',
        'rating',
        'description',
        'userId'
      ],
      where: { userId },
      raw: true
    })
    .then((restaurants) => {
      const matchedRestaurants = keyword
        ? restaurants.filter((restaurant) =>
          Object.values(restaurant).some((property) => {
            if (typeof property === 'string') {
              return property.toLowerCase().includes(keyword.toLowerCase())
            }
          })
        )
        : restaurants
      if (matchedRestaurants.length === 0) {
        req.flash('success', '沒有找到符合的餐廳')
        return res.redirect('/restaurants')
      }

      res.render('index', {
        restaurants: matchedRestaurants,
        keyword
      })
    })
    .catch((error) => {
      error.errorMessage = '搜索失败 :('
      next(error)
    })
})

module.exports = router
