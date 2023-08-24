const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/restaurants', (req, res) => {
  res.send('restaurantlist-home page') //首頁
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
  res.send('Add a new restaurant')
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.send(`modified ${id} restaurant`)
})

app.delete('/restaurants:id', (req, res) => {
  const id = req.params.id
  res.send(`delete ${id} restaurant`)
})

app.listen(3000, () => {
    console.log(`App is running at http://localhost:3000`)
})