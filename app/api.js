'use strict'

const mongoose = require('mongoose')

//Models
const Product = require('../database/models/Product')
const ProductHelper = require('../database/models/helpers/ProductHelper')

const parser = require('fast-xml-parser')
const fetch = require('node-fetch')

//Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
})


module.exports = {
  updateData: async () => {
    const fetchJSON = () => {
      return fetch('https://www.systembolaget.se/api/assortment/products/xml')
        .then(response => response.text())
        .then(data => {
          return parser.parse(data, {
            localeRange: 'åäö',
          })
        })
        .catch(err => console.error(err))
    }

    const data = await fetchJSON()

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
    Product.find(params)
    return data
  }
}