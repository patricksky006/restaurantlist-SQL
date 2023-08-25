const express = require('express') //引入express模組
const { engine } = require('express-handlebars')
const app = express() // 建立了一個Express應用程式的實例，儲存在app常數中

const port = 3000

const db = require('./models') //取得資料庫的model資料夾
const restaurant = db.restaurant //取得model資料夾中restaurant檔案資料

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/restaurants', (req, res) => {
  return restaurant.findAll() //使用findAll在restaurant中撈資料，此功能為非同步函式
    .then((restaurants) => res.send({ restaurants })) //將找到的資料存入restaurants中，丟到後面的函式後處理傳到網頁畫面
})

app.get('/restaurants/new', (req, res) => {
  res.send('Add a new restaurant') //新增餐廳的頁面
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
  res.send('Add a new restaurant') //新增餐廳
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