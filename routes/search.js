// search.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const restaurant = db.restaurant;

router.get('/', (req, res, next) => {
  const keyword = req.query.search?.trim();

  if (!keyword) {
    return res.redirect('/restaurants');
  }

  restaurant
    .findAll({
      attributes: [
        'id',
        'name',
        'name_en',
        'category',
        'image',
        'location',
        'phone',
        'google_map',
        'rating',
        'description',
      ],
      raw: true,
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
      res.render('index', {
        restaurants: matchedRestaurants ,
        keyword,
      });
    })
    .catch((error) => {
      error.errorMessage = '搜索失败 :(';
      next(error);
    });
});

module.exports = router;
