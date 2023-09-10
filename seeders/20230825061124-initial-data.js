'use strict'

/** @type {import('sequelize-cli').Migration} */

const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      // 为了避免處理資料失誤，使用 transaction
      transaction = await queryInterface.sequelize.transaction()

      // 新增使用者種子資料
      const hash = await bcrypt.hash('12345678', 10)
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: 'user1',
          email: 'user1@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'user2',
          email: 'user2@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction })
      // 新增資料庫種子資料
      const jsonFilePath = path.resolve(__dirname, '../public/jsons/restaurant.json') // 找到 JSON 檔案位置
      const jsonData = fs.readFileSync(jsonFilePath, 'utf8') // 同步讀取文件內容
      const restaurants = JSON.parse(jsonData).results // 將文件內容中 results 下的內容取出來
      const restaurantUserMapping = {
        1: [1, 2, 3, 7],
        2: [4, 5, 6, 8]
      }
      const dataWithTimestamps = restaurants.map((restaurant, index) => ({
        ...restaurant,
        userId: restaurantUserMapping[1].includes(index + 1) ? 1 : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
      await queryInterface.bulkInsert('Restaurants', dataWithTimestamps, { transaction })
      await transaction.commit()
    } catch (error) {
      if (transaction) transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
    await queryInterface.bulkDelete('Restaurants', null)
  }
}
