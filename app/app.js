'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const database = require('../database/connection.js')
const parser = require('fast-xml-parser')
const fetch = require('node-fetch')

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT} !`),
)

app.get('/', function (req, res) {})

app.get('/update', async function (req, res) {

  const fetchJSON = () => {
    return fetch('https://www.systembolaget.se/api/assortment/products/xml')
      .then(response => response.text())
      .then(data => {
        return parser.parse(data, {
          localeRange: 'åäö',
        })
      })
      .catch(err => console.error(err));
  }

  const data = await fetchJSON()

  data.artiklar.artikel.forEach(item => {

    database.updateOrCreate(item);
  })

  res.send('Succesful')
})