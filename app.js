const express = require('express') //引入express模組
const { engine } = require('express-handlebars') //引入express-handlebars的VIEW樣板引擎
const app = express() // 建立了一個Express應用程式的實例，儲存在app常數中

const port = 3000

const db = require('./models') //取得資料庫的model資料夾
const restaurant = db.restaurant //取得model資料夾中restaurant檔案資料



app.engine('.hbs', engine({extname: '.hbs'})) //告訴express使用express-handlebars樣版引擎，並指定附檔名為.hbs
app.set('view engine', '.hbs') // 告訴express使用express-handlebars樣版引擎來處理render畫面
app.set('views', './views') //視覺文件儲存在'./view'的目錄中
app.use(express.static('public')) //載入靜態檔案，包含Bootstrap的CSS和JS
app.use(express.urlencoded({ extended: true })) //使用此行來請求網址中獲取表單資料,否則就會回傳undefined的表單資料。

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  return restaurant.findAll({ //使用findAll在model資料夾中的restaurant.js中撈資料，此功能為非同步函式，後接.then語法
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], //從資料庫中撈出要的表格欄位
    raw: true //因在sequelize中的find功能會將結果轉換成model instances，而不是JavaScripts objects，所以sequelize有提供此參數藉以停用轉換。
  }) 
    .then((restaurants) => res.render('index', { restaurants })) //將找到的資料存入restaurants中，丟到後面的函式後處理傳到網頁畫面
    .catch((err) => res.status(422).json(err))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new') //新增餐廳的頁面
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`第${id}個restaurants`) //第${ID}個餐廳的檢視頁面
})

app.get('/restaurants/:id/edit', (req,res) => {
  const id = req.params.id
  res.send(`第${id}個restaurants的編輯頁`) //第${ID}個餐廳的編輯頁面
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
  const description = req.body. description
  return restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/restaurants'))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`modified ${id} restaurant`) //更新餐廳
})

app.delete('/restaurants:id', (req, res) => {
  const id = req.params.id
  res.send(`delete ${id} restaurant`) //刪除餐廳
})

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`)
})