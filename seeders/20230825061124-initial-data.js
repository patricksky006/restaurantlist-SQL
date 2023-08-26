'use strict'

/** @type {import('sequelize-cli').Migration} */

const fs = require('fs')
const path = require('path')

module.exports = {
  async up (queryInterface, Sequelize) {
    const jsonFilePath = path.resolve(__dirname, '../public/jsons/restaurant.json') // 找到JSON檔案位置
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8') // 同步讀取文件內容
    const restaurants = JSON.parse(jsonData).results // 將文件內容中results下的內容取出來

    const now = new Date() // 因JSON文件中沒有createdAt和updatedAt兩個欄位，所以要用map方法加入這兩種屬性
    const dataWithTimestamps = restaurants.map((restaurant) => ({
      ...restaurant,
      createdAt: now,
      updatedAt: now
    }))

    await queryInterface.bulkInsert('Restaurants', dataWithTimestamps)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
}
