const express = require('express') // 引入express模組
const { engine } = require('express-handlebars') // 引入express-handlebars的VIEW樣板引擎
const methodOverride = require('method-override') // 引入method-override的模組
const app = express() // 建立了一個Express應用程式的實例，儲存在app常數中

const port = 3000

const db = require('./models') // 取得資料庫的model資料夾
const restaurant = db.restaurant // 取得model資料夾中restaurant檔案資料

app.engine('.hbs', engine({ extname: '.hbs' })) // 告訴express使用express-handlebars樣版引擎，並指定附檔名為.hbs
app.set('view engine', '.hbs') // 告訴express使用express-handlebars樣版引擎來處理render畫面
app.set('views', './views') // 視覺文件儲存在'./view'的目錄中
app.use(express.static('public')) // 載入靜態檔案，包含Bootstrap的CSS和JS
app.use(express.urlencoded({ extended: true })) // 使用此行來請求網址中獲取表單資料,否則就會回傳undefined的表單資料。
app.use(methodOverride('_method')) // 指定'_method'為query識別方法

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
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
    .catch((err) => res.status(422).json(err));
});

app.get('/restaurants/new', (req, res) => {
  return res.render('new') // 新增餐廳的頁面
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 從資料庫中撈出要的表格欄位
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((err) => res.status(422).json(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 從資料庫中撈出要的表格欄位
    raw: true // 因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => res.status(422).json(err))
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/restaurants'))
    .catch((err) => res.status(422).json(err))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  return restaurant.update({
    name: body.name,
    name_en: body.name_en,
    category: body.category,
    image: body.image,
    location: body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description: body.description
  }, {
    where: { id }
  })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => res.status(422).json(err))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurant.destroy({ where: { id } })
    .then(() => res.redirect('/restaurants'))
    .catch((err) => res.status(422).json(err))
})

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
