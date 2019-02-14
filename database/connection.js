'use strict';

const mongoose = require('mongoose')

//Models
const Product = require('./models/Product')
const ProductHelper = require('./models/helpers/ProductHelper')

//Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
})

module.exports = {

  updateOrCreate: (item) => {

    const query = {
      ProductNumber: item.nr
    }

    const config = {
      upsert: true,
      useFindAndModify: false
    }

    const data = ProductHelper.builder(item)

    Product.findOneAndUpdate(query, data, config, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
}