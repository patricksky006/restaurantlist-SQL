# Restaurantlist-SQL 清單練習 

## 介紹

- 實踐CRUD功能和搜尋內容的練習專案，結合了網頁程式和SQL資料庫的應用。
- 其專案為一個可以新增(create)、瀏覽(Read)、更新(update)和刪除(delete) 餐廳清單的功能

## 動機
- 學習成為一個後端工程師
  
## 功能

* 新增(create) 餐廳
* 瀏覽(Read) 餐廳列表
* 更新(update) 餐廳內容資訊
* 刪除(delete) 餐廳


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
啟動專案:
```
$ npm run start
```
成功時，終端機會顯示以下訊息，請打開瀏覽器進入網址(http://localhost:3000):
```
express server is running on http://localhost:3000
```
欲結束使用:
```
ctrl + c
```
## 開發工具
* Git v2.41.0.window.3
* npm 9.5.0
* nvm 1.1.11
* node v18.15.0
* nodemon v3.0.1
* express v4.18.2
* express-handlebars v7.1.2
* method-override 3.0.0
* mysql2 3.2.0
* sequelize 6.30.0
* sequelize-cli 6.6.0

## User Flow
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/be56df05b98931b0316e067c4e9678189c9ea33b/PrintScreen/UserFlow.png)

## Design router
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/be56df05b98931b0316e067c4e9678189c9ea33b/PrintScreen/DesignRouter.png)

## 實際畫面
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/076a0e8613497f9d297095cf8a53fb9b0dba0a3f/PrintScreen/index_page.png)
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/076a0e8613497f9d297095cf8a53fb9b0dba0a3f/PrintScreen/create_page.png)
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/076a0e8613497f9d297095cf8a53fb9b0dba0a3f/PrintScreen/read_page.png)
![image](https://github.com/patricksky006/restaurantlist-SQL/blob/076a0e8613497f9d297095cf8a53fb9b0dba0a3f/PrintScreen/update_page.png)
