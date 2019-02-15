'use strict'

const mongoose = require('mongoose')

//Models
const Product = require('../models/Product')
const ProductHelper = require('../models/helpers/ProductHelper')

const parser = require('fast-xml-parser')
const fetch = require('node-fetch')

//Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
})


module.exports = {
  updateData: async () => {

    const data = await fetch('https://www.systembolaget.se/api/assortment/products/xml')
      .then(response => response.text())
      .then(data => {
        return parser.parse(data, {
          localeRange: 'åäö',
        })
      })
      .catch(err => console.error(err))

    data.artiklar.artikel.forEach(item => {

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

    })

  },
  fetchData: (params) => {
    return Product.find(params)
  }
}