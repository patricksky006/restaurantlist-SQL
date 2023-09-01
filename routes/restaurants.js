// restaurants 路由模組

const express = require('express')
const router = express.Router()

const db = require('../models') 
const restaurant = db.restaurant 

router.get('/', (req, res) => {
  const keyword = req.query.search?.trim();
  restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurants = keyword
        ? restaurants.filter((restaurant) =>
            Object.values(restaurant).some((property) => {
              if (typeof property === 'string') {
                return property.toLowerCase().includes(keyword.toLowerCase());
              }
            })
          )
        : restaurants;
      res.render('index', { restaurants: matchedRestaurants, keyword });
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
			next(error)
    });
});

router.get('/new', (req, res) => {
  return res.render('new') // 新增餐廳的頁面
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 從資料庫中撈出要的表格欄位
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
			next(error)
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 從資料庫中撈出要的表格欄位
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => res.render('edit', { restaurant}))
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
			next(error)
    })
})

router.post('/', (req, res, next) => {
    const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
      .then(() => {
        req.flash('success', '餐廳已新增') // 進行新增動作時，透過flash存入ket-value值，並在/restaurants取出使用
        return res.redirect('/restaurants')
  })
    .catch((error) => {
      error.errorMessage = '新增失敗'
      next(error)
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, name_en, category, image, location, phone, google_map, rating, description} = req.body

    return restaurant.update({name, name_en, category, image, location, phone, google_map, rating, description}, {
    where: { id }
  })
    .then(() => {
      req.flash('success', '內容已更新')
      res.redirect(`/restaurants/${id}`)
  })
    .catch((error) => {
      error.errorMessage = '更新失敗'
      next(error)
    })

})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return restaurant.destroy({ where: { id } })
      .then(() => {
        req.flash('success', '餐廳已刪除')
        res.redirect('/restaurants')
    })
      .catch((error) => {
      error.errorMessage = '刪除失敗'
      next(error)
    })
})

module.exports = router