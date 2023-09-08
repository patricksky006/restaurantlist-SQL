const express = require('express') // 引入express模組
const flash = require('connect-flash')
const session = require('express-session')
const { engine } = require('express-handlebars') // 引入express-handlebars的VIEW樣板引擎
const methodOverride = require('method-override') 
const passport = require('passport') 

const app = express() // 建立了一個Express應用程式的實例，儲存在app常數中

if (process.env.NODE_ENV === 'development'){
		require('dotenv').config()
}

const router = require('./routes/index')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' })) // 告訴express使用express-handlebars樣版引擎，並指定附檔名為.hbs
app.set('view engine', '.hbs') // 告訴express使用express-handlebars樣版引擎來處理render畫面
app.set('views', './views') // 視覺文件儲存在'./view'的目錄中
app.use(express.static('public')) // 載入靜態檔案，包含Bootstrap的CSS和JS
app.use(express.urlencoded({ extended: true })) // 使用此行來請求網址中獲取表單資料,否則就會回傳undefined的表單資料。
app.use(methodOverride('_method')) // 指定'_method'為query識別方法

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(messageHandler)
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
