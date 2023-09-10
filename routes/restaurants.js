// 餐廳CRUD路由模組

const express = require('express')
const router = express.Router()

const db = require('../models')
const restaurant = db.restaurant

router.get('/', (req, res, next) => {
  const page = parseInt(req.query.page) || 1
  const limit = 6
  const sort = req.query.sort
  const userId = req.user.id // 此id是由passport套件提供

  const sortOptions = {
    name_asc: [['name', 'ASC']],
    name_desc: [['name', 'DESC']],
    category: [['category', 'ASC']],
    location: [['location', 'ASC']]
  }

  restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    where: { userId },
    offset: (page - 1) * limit,
    limit,
    order: sortOptions[sort],
    raw: true
  })
    .then((restaurants) => {
      res.render('index', {
        restaurants,
        prev: page > 1 ? page - 1 : page,
			  next: page + 1,
			  page,
        sort
      })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.get('/new', (req, res, next) => {
  return res.render('new')
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id // 此id是由passport套件提供
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '資料不存在')
        return res.redirect('/restaurants')
      }

      if (userId !== restaurant.userId) {
        req.flash('error', '您沒有操作的權限')
        return res.redirect('/restaurants')
      }

      res.render('detail', { restaurant })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id // 此id是由passport套件提供
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '資料不存在')
        return res.redirect('/restaurants')
      }

      if (userId !== restaurant.userId) {
        req.flash('error', '您沒有操作的權限')
        return res.redirect('/restaurants')
      }

      res.render('edit', { restaurant })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.post('/', (req, res, next) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user.id // 此id是由passport套件提供

  return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => {
      req.flash('success', '餐廳已新增') // 進行新增動作時，透過flash存入ket-value值，並在/restaurants取出使用
      return res.redirect('/restaurants')
    })
    .catch((error) => {
      error.errorMessage = '新增失敗'
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user.id // 此id是由passport套件提供

  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId']
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '資料不存在')
        return res.redirect('/restaurants')
      }

      if (userId !== restaurant.userId) {
        req.flash('error', '您沒有操作的權限')
        return res.redirect('/restaurants')
      }

      return restaurant.update({ name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => {
          req.flash('success', '內容已更新')
          res.redirect(`/restaurants/${id}`)
        })
    })
    .catch((error) => {
      error.errorMessage = '更新失敗'
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id // 此id是由passport套件提供

  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description', 'userId'],
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '資料不存在')
        return res.redirect('/restaurants')
      }

      if (userId !== restaurant.userId) {
        req.flash('error', '您沒有操作的權限')
        return res.redirect('/restaurants')
      }
    })
    .then(() => {
      return restaurant.destroy({ where: { id } })
        .then(() => {
          req.flash('success', '餐廳已刪除')
          res.redirect('/restaurants')
        })
    })
    .catch((error) => {
      error.errorMessage = '刪除失敗'
      next(error)
    })
})

module.exports = router
