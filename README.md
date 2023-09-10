# Restaurantlist-SQL 清單練習 
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/main/PrintScreen/index_page_final.png)


## 介紹

- 實踐收藏餐廳功能的練習專案，結合了網頁程式和SQL資料庫的應用。

## 動機
- 學習成為一個後端工程師
  
## 功能

註冊和登入:
* 使用者可以註冊新帳號密碼
* 使用者可以透過Facebook登入此網站
* 使用者可以登入登出

CRUD功能:
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳

其他功能:
* 使用者可以使用搜尋功能找到餐廳名稱和類別
* 使用者可以使用分類功能對目前所屬的餐廳進行分類

限制:
* 使用者必須登入後才能操作相關功能
* 使用者只能看到自己餐廳，無法看到別人的餐廳


## 啟動專案 
打開終端機

將專案複製到本地:
```
$ git clone https://github.com/patricksky006/restaurantlist-SQL.git
```
進入專案資料夾:
```
$ cd restaurantlist-SQL
```
安裝npm:
```
$ npm install
```
啟動環境設置:
將環境變數NODE_ENV設置為development，需要有.env檔啟用相關環境參數。  
.env檔環境參數如下  
SESSION_SECRET: 自行設定  
FACEBOOK_CLIENT_ID: 自行設定  
FACEBOOK_CLIENT_SECRET: 自行設定  
FACEBOOK_CALLBACK_URL: 自行設定  

資料庫請使用MySQL，需設置種子資料:
```
$ npx sequelize-cli db:seed:all
```
啟動專案:
```
$ npm run start
```
成功時，終端機會顯示以下訊息，請打開瀏覽器進入網址(http://localhost:3000):
```
express server is running on http://localhost:3000
```
內建試用帳號:
```
帳號: user1@example.com
密碼: 12345678
```
欲結束使用:
```
ctrl + c
```
## 開發工具
* Visual Studio Code v1.81.1
* Git v2.41.0.window.3
* npm 9.5.0
* nvm 1.1.11
* node v18.15.0
* nodemon v3.0.1
* bcryptjs: 2.4.3
* connect-flash: 0.1.1
* dotenv: 16.0.3
* express: 4.18.2
* express-handlebars: 7.1.2
* express-session: 1.17.3
* method-override: 3.0.0
* mysql2: 3.2.0
* passport: 0.6.0
* passport-facebook: 3.0.0
* passport-local: 1.0.0
* sequelize: 6.30.0
* sequelize-cli: 6.6.0

## 相關網頁截圖
***
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/main/PrintScreen/Login.png)
***
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/main/PrintScreen/register.png)
***
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/main/PrintScreen/index_page_final.png)
